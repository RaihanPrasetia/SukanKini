import axios from "axios";
import User from "../../constructors/UserModel"; // Assuming this is a constructor function for Payment

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getAdminDataMitra = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/user/mitra`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.users) {
            return response.data.users.map(user => new User(user));
        } else {
            throw new Error("No User data found.");
        }
    } catch (error) {
        console.error("Error fetching User:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};
const getAdminDataUser = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/user/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.users) {
            return response.data.users.map(user => new User(user));
        } else {
            throw new Error("No User data found.");
        }
    } catch (error) {
        console.error("Error fetching User:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};




const adminUserService = {

    getAdminDataUser,
    getAdminDataMitra,
};

export default adminUserService;
