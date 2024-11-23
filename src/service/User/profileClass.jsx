import axios from 'axios';
import Membership from '../../constructors/memberships'; // Ensure this path is correct

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getAllClasses = async () => {
    try {
        const response = await axios.get(`${apiUrl}/class`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Ensure that the data structure matches what's expected
        if (response.data && Array.isArray(response.data.memberships)) {
            // Map response data to Membership instances
            return response.data.memberships.map((membership) => new Membership(membership));
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        // Handle specific error response if available
        console.error("Error fetching classes:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch classes.");
    }
};

const getClassesNow = async () => {
    try {
        const response = await axios.get(`${apiUrl}/class/now`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Ensure that the data structure matches what's expected
        if (response.data && Array.isArray(response.data.memberships)) {
            // Map response data to Membership instances
            return response.data.memberships.map((membership) => new Membership(membership));
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        // Handle specific error response if available
        console.error("Error fetching classes:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch classes.");
    }
};

// Dashboard service exposes both methods
const dashboardService = {
    getAllClasses,
    getClassesNow
};

export default dashboardService;
