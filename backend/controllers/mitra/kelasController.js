const { Class, User, Category, Trainer, ClassSchedule, Memberships } = require('../../associations');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');


const getUserClasses = async (req, res) => {
    try {
        const userId = req.userId;

        const classes = await Class.findAll({
            where: { createdBy: userId },
            include: [
                { model: User, as: 'owner', attributes: ['id', 'name'] },
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                {
                    model: Trainer, as: 'trainer', attributes: ['id', 'name', 'age', 'image_path', 'alamat', 'phone_number'],
                    where: {
                        [Op.or]: [
                            { deletedAt: null }, // Trainer aktif
                            { deletedAt: { [Op.ne]: null } } // Trainer telah dihapus
                        ]
                    },
                    paranoid: false,
                },
                {
                    model: ClassSchedule,
                    as: 'schedules',  // Use the alias defined in the association
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Memberships,
                    as: 'members', // Use alias defined in association
                    attributes: ['id', 'user_id', 'class_id'], // membership-related fields
                    include: [
                        {
                            model: User,
                            as: 'user', // Ensure you have set up the alias 'user' in your association
                            attributes: ['id', 'name', 'kota', 'alamat'] // User-specific attributes you want to include
                        }
                    ]
                }
            ],
            attributes: ['id', 'name', 'alamat', 'price', 'image_path', 'createdAt', 'updatedAt', 'createdBy']
        });

        if (classes.length === 0) {
            return res.status(404).json({ message: 'Kamu Belum Memiliki Kelas' });
        }

        res.status(200).json({ classes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getClassById = async (req, res) => {
    try {
        const classId = req.params.id;
        const userId = req.userId;

        const classData = await Class.findOne({
            where: { id: classId },
            include: [
                { model: User, as: 'owner', attributes: ['id', 'name'] },
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                {
                    model: Trainer, as: 'trainer', attributes: ['id', 'name', 'age', 'image_path', 'alamat', 'phone_number', 'deletedAt'],
                    where: {
                        [Op.or]: [
                            { deletedAt: null }, // Trainer aktif
                            { deletedAt: { [Op.ne]: null } } // Trainer telah dihapus
                        ]
                    },
                    paranoid: false,
                },
                {
                    model: ClassSchedule,
                    as: 'schedules',
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Memberships,
                    as: 'members',
                    attributes: ['id', 'user_id', 'class_id'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'kota', 'alamat', 'phone_number']
                        }
                    ]
                }
            ],
            attributes: ['id', 'name', 'alamat', 'price', 'image_path', 'createdBy', 'createdAt', 'updatedAt', 'createdBy']
        });

        if (!classData) {
            return res.status(404).json({ message: 'Class not found!' });
        }

        if (classData.createdBy !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to view this class!' });
        }

        res.status(200).json({ class: classData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createClass = async (req, res) => {
    try {

        const userId = req.userId; // User ID from JWT
        const { name, alamat, category_id, trainer_id, price } = req.body;
        const schedules = req.body.schedules ? JSON.parse(req.body.schedules) : []; // Parse schedules
        const imagePath = req.file ? `${req.file.filename}` : null;

        // Validate required fields
        if (!name || !alamat || !category_id || !trainer_id) {
            return res.status(400).json({ message: 'Name, Address, Category, and Trainer are required!' });
        }

        // Check user role (assuming role is stored in User model)
        const user = await User.findOne({ where: { id: userId } });
        if (!user || user.role !== 'mitra') {
            return res.status(403).json({ message: 'Forbidden: Only mitra users are allowed to create classes.' });
        }

        // Create the new class
        const newClass = await Class.create({
            name,
            alamat,
            category_id,
            trainer_id,
            price,
            image_path: imagePath,
            createdBy: userId // Ensure user is the creator
        });

        // Handle schedules creation (if any)
        if (schedules && schedules.length > 0) {
            await Promise.all(schedules.map(schedule => {
                return ClassSchedule.create({
                    class_id: newClass.id,
                    hari: schedule.hari,
                    jam: schedule.jam,
                    createdBy: userId,
                });
            }));
        }

        res.status(201).json({ message: 'Class created successfully!', class: newClass });
    } catch (error) {
        console.error(error); // Print error
        res.status(500).json({ message: error.message });
    }
};


const updateClass = async (req, res) => {
    try {
        const classId = req.params.id;  // Get classId from request parameters
        const userId = req.userId;  // Get the authenticated userId
        const { name, alamat, category_id, trainer_id, schedules, price, } = req.body;

        // Find the class by ID
        const classData = await Class.findOne({
            where: { id: classId }
        });

        if (!classData) {
            return res.status(404).json({ message: 'Class not found!' });
        }

        // Ensure that only the creator of the class or mitra user can update
        if (classData.createdBy !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to update this class!' });
        }

        // Check if the user has 'mitra' role
        const user = await User.findOne({ where: { id: userId } });
        if (!user || user.role !== 'mitra') {
            return res.status(403).json({ message: 'Forbidden: Only mitra users are allowed to update classes.' });
        }

        // Update class details
        classData.name = name || classData.name;
        classData.alamat = alamat || classData.alamat;
        classData.category_id = category_id || classData.category_id;
        classData.trainer_id = trainer_id || classData.trainer_id;
        classData.price = price || classData.price;

        // Update image if a new file is uploaded
        if (req.file) {
            // Delete the old image file if it exists
            if (classData.image_path) {
                const oldImagePath = path.join(__dirname, '../../../public/images/kelas', classData.image_path); // Corrected path
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);  // Delete old image
                } else {
                    console.log('File not found:', oldImagePath); // Log if file does not exist
                }
            }

            // Update the image path with the new file
            classData.image_path = `${req.file.filename}`;
        }

        // Save the updated class data
        await classData.save();

        // If there are schedules to update
        let schedulesArray = [];
        if (schedules) {
            try {
                // Parse schedules if it's in string format
                schedulesArray = typeof schedules === 'string' ? JSON.parse(schedules) : schedules;
            } catch (error) {
                return res.status(400).json({ message: 'Invalid schedules format.' });
            }
        }

        // Check if there are any schedules to update
        if (Array.isArray(schedulesArray) && schedulesArray.length > 0) {
            // First, delete the old schedules for this class_id (only if there are new schedules)
            ClassSchedule.destroy({
                where: { class_id: classId }
            });

            // Now, insert or update the new schedules
            await Promise.all(schedulesArray.map(async (schedule) => {
                // Ensure the user is authorized to create schedules
                const userExists = await User.findOne({ where: { id: userId, role: 'mitra' } });
                if (!userExists) {
                    return res.status(400).json({ message: 'User must have "mitra" role to create schedules.' });
                }

                // Upsert new schedules based on class_id
                return ClassSchedule.upsert({
                    class_id: classId,
                    hari: schedule.hari,
                    jam: schedule.jam,
                    createdBy: userId
                });
            }));
        }

        res.status(200).json({ message: 'Class updated successfully!', class: classData });
    } catch (error) {
        console.error(error);  // Print error details for debugging
        res.status(500).json({ message: error.message });
    }
};





const deleteClass = async (req, res) => {
    try {
        const classId = req.params.id;  // Retrieve classId from request parameters
        const userId = req.userId;  // Assuming `req.userId` is set from user authentication

        // Find the class by ID
        const classData = await Class.findOne({
            where: { id: classId }
        });

        if (!classData) {
            return res.status(404).json({ message: 'Class not found!' });
        }

        // Check if the current user is the one who created the class
        if (classData.createdBy !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this class!' });
        }

        // Delete associated schedules first (if any)
        await ClassSchedule.destroy({
            where: { class_id: classId }
        });

        // Delete the class
        await classData.destroy();

        res.status(200).json({ message: 'Class deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUserClasses, getClassById, createClass, updateClass, deleteClass };
