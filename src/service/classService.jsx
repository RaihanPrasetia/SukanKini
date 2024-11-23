import axios from 'axios';
import Class from '../constructors/classConstructor';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getClasses = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/class`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Periksa apakah data response sesuai dengan struktur yang diharapkan
        if (response.data && Array.isArray(response.data.classes)) {
            // Mapping setiap kelas ke instance Class jika diperlukan
            return response.data.classes.map((classData) => new Class(classData));
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        console.error("Error fetching classes:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch classes.");
    }
};

const createClass = async ({ name, category_id, alamat, schedules, trainer_id, image_path, price }) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category_id", category_id); // Perbaikan typo
        formData.append("alamat", alamat);
        formData.append("schedules", JSON.stringify(schedules)); // Pastikan schedules dalam bentuk string JSON
        formData.append("trainer_id", trainer_id);
        if (image_path) {
            formData.append("image_path", image_path); // Tambahkan hanya jika ada file
        }
        formData.append("price", price);

        const response = await axios.post(`${apiUrl}/mitra/class/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Periksa apakah data response sesuai dengan struktur yang diharapkan
        if (response.data && response.data.class) {
            return new Class(response.data.class); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Error creating class:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to create class.");
    }
};

const getClassById = async (classId) => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/class/detail/${classId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.class) {  // Assuming the response is a single class object
            return new Class(response.data.class); // Initialize a new class instance
        } else {
            throw new Error("Class data not found in the response.");
        }
    } catch (error) {
        console.error("Failed to fetch class info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch class info");
    }
};

const deleteClassById = async (classId) => {
    try {
        await axios.delete(`${apiUrl}/mitra/class/delete/${classId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });


    } catch (error) {
        console.error("Failed to fetch class info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch class info");
    }
};

const updateClass = async (classId, name, category_id, alamat, schedules, trainer_id, image_path, price) => {
    try {
        // Create FormData instance
        const formData = new FormData();

        // Append class details to the FormData object
        formData.append("name", name);
        formData.append("category_id", category_id); // Use the correct category id
        formData.append("alamat", alamat);
        formData.append("schedules", JSON.stringify(schedules)); // Convert schedules to JSON string
        formData.append("trainer_id", trainer_id); // Use the trainer id
        if (image_path) {
            formData.append("image_path", image_path); // Add image only if there is one
        }
        formData.append("price", price);
        formData.append("updatedAt", new Date().toISOString()); // Set the updatedAt as current date in ISO format

        console.log("ceking data di service: ", category_id);

        await axios.post(`${apiUrl}/mitra/class/update/${classId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
                api_key: apiKey,
            },
        });


    } catch (error) {
        console.error("Error updating class:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to update class.");
    }
};





// Ekspor object service
const classService = {
    getClasses,
    createClass,
    getClassById,
    updateClass,
    deleteClassById,
};

export default classService;
