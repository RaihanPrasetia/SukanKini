const { Benefit } = require('../../associations');

const createBenefit = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, description, class_id } = req.body;


        if (!name || !description) {
            return res.status(400).json({ message: 'Missing required fields: an, no_rek' });
        }

        const nameSave = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        const newBenefit = await Benefit.create({
            name: nameSave,
            description,
            class_id: class_id,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Benefit created successfully', benefit: newBenefit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create benefit', error: error.message });
    }
};

const getBenefit = async (req, res) => {
    try {
        const userId = req.userId;

        const benefit = await Benefit.findOne({
            where: { createdBy: userId },
        });

        if (!benefit) {
            return res.status(404).json({ message: 'Benefit not found or you are not authorized to view this benefit' });
        }

        res.status(200).json({ benefit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve benefit', error: error.message });
    }
};

const getBenefitById = async (req, res) => {
    try {
        const benefitId = req.params.id; // ID Benefit dari URL params

        const benefit = await Benefit.findOne({
            where: { id: benefitId },
        });

        if (!benefit) {
            return res.status(404).json({ message: 'Benefit not found or you are not authorized to view this benefit' });
        }

        res.status(200).json({ benefit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve benefit', error: error.message });
    }
};

const updateBenefitById = async (req, res) => {
    try {
        const benefitId = req.params.id; // ID Benefit dari URL params

        const benefit = await Benefit.findOne({
            where: { id: benefitId },
        });

        if (!benefit) {
            return res.status(404).json({ message: 'Benefit not found or you are not authorized to view this benefit' });
        }

        res.status(200).json({ benefit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve benefit', error: error.message });
    }
};


const deleteBenefit = async (req, res) => {
    try {
        const userId = req.userId;
        const benefitId = req.params.id;

        if (!benefitId) {
            return res.status(400).json({ message: 'Missing required field: benefitId' });
        }

        const benefit = await Benefit.findOne({ where: { id: benefitId, createdBy: userId } });

        if (!benefit) {
            return res.status(404).json({ message: 'Benefit not found or you are not authorized to delete this benefit' });
        }

        await benefit.destroy();

        res.status(200).json({ message: 'Benefit deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete benefit', error: error.message });
    }
};


module.exports = { createBenefit, updateBenefitById, deleteBenefit, getBenefitById, getBenefit };

