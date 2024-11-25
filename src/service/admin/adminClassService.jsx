import axios from 'axios';
import Class from '../../constructors/classConstructor';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getAdminClasses = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/class`, {
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






// Ekspor object service
const classService = {
    getAdminClasses,

};

export default classService;
