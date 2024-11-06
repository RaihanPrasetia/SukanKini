const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


export const login = async (email, password) => {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api_key': apiKey,
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
    }

    const responseData = await response.json();
    return {
        token: responseData.token,
        user: responseData.user,
    };
};


export const checkEmailAvailability = async (email) => {
    try {
        const response = await fetch(`${apiUrl}/check-email`, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
                'api_key': apiKey, // Include your API key if necessary
            },
            body: JSON.stringify({ email }), // Send the email in the body as JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error checking email availability.');
        }

        const responseData = await response.json();
        return responseData.available; // Access the available field from the response
    } catch (error) {
        console.error("Error checking email availability:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};



// controllers/authController.js
export const register = async ({ name, email, password }) => {
    const response = await fetch(`${apiUrl}/register`, { // Adjust the URL to your API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api_key': apiKey,
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return {
        token: responseData.token,
        user: responseData.user,
    }; // Return the JSON response, which should include the token
};

