import axios from 'axios';
import Class from '../../constructors/classConstructor';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getAllClasses = async () => {
    try {
        const response = await axios.get(`${apiUrl}/all/class`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Ensure that the data structure matches what's expected
        if (response.data && Array.isArray(response.data.classes)) {
            console.log("Data Class: ", response.data.classes)
            // Map response data to Membership instances
            return response.data.classes.map((classes) => new Class(classes));
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        // Handle specific error response if available
        console.error("Error fetching classes:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch classes.");
    }
};

const getClassById = async (classId) => {
    try {
        const response = await axios.get(`${apiUrl}/class/detail/${classId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });


        if (response.data && response.data.class) {
            const classData = response.data.class;

            const mappedClassData = {
                id: classData.id,
                name: classData.name,
                image_path: classData.image_path,
                description: classData.description || 'No description available',
                address: classData.alamat || 'No address available',  // Corrected from 'owner.alamat' to 'alamat'
                price: classData.price,
                schedules: classData.schedules || [],  // Default to empty if not available
                benefits: classData.benefits || [],  // Default to empty if not available
                ratings: classData.ratings || [],  // Default to empty if not available
                trainer: classData.trainer || { name: 'Unknown', image_path: '' },  // Default to 'Unknown' if no trainer
                category: classData.category || { name: 'Unknown' },  // Default to 'Unknown' if no category
                createdBy: classData.createdBy,
                owner: classData.owner || [],
                imagePath: classData.image_path, // Default to empty if owner is not available
            };

            // Also return related classes if available
            const relatedClasses = response.data.related || [];  // Default to an empty array if no related classes exist

            return {
                class: mappedClassData,
                relatedClasses: relatedClasses,  // Return the related classes as well
            };
        } else {
            throw new Error('Class data not found.');
        }

    } catch (error) {
        console.error('Error fetching class info:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch class info');
    }
};

const createMemberships = async (classId, bank_id, total, bukti) => {
    try {
        const formData = new FormData();

        formData.append("class_id", classId);
        formData.append("bank_id", bank_id);
        formData.append("total", total);
        if (bukti) {
            formData.append("bukti", bukti); // Add image only if there is one
        }

        const response = await axios.post(`${apiUrl}/payments/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.message) {
            // Return only the message from the response
            return { message: response.data.message };
        } else {
            throw new Error("Payment creation failed. No message in response.");
        }
    } catch (error) {
        console.error('Error fetching class info:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch class info');
    }
}


// Dashboard service exposes both methods
const classService = {
    getAllClasses,
    getClassById,
    createMemberships
};

export default classService;
