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

export const loginWithGoogle = async (tokenId) => {
    try {
        const response = await fetch('http://localhost:9000/auth/google/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': apiKey,
            },
            body: JSON.stringify({ tokenId })
        });

        if (!response.ok) throw new Error('Google login failed');

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Assuming you're using an API to check email availability
export const checkEmailAvailability = async (email) => {
    try {
        const response = await fetch(`${apiUrl}/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': apiKey,
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        return result.available; // Assumes the API response has an `available` field
    } catch (error) {
        console.error("Error checking email availability:", error);
        return false; // In case of error, assume the email is not available
    }
};

export const checkEmail = async (email) => {
    try {
        const response = await fetch(`${apiUrl}/check-email/ready`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': apiKey,
            },
            body: JSON.stringify({ email }),
        });

        // Tangkap error jika respons bukan 200 OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Kesalahan pada server");
        }

        const result = await response.json();
        return result.success; // true jika email terdaftar
    } catch (error) {
        console.error("Error checking email availability:", error);
        throw error; // Lempar error agar bisa ditangkap di handleForgot
    }
};


export const resetPassword = async (email, newPassword) => {
    try {
        const response = await fetch(`${apiUrl}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': apiKey,
            },
            body: JSON.stringify({ email, newPassword }),
        });

        // Tangkap error jika respons bukan 200 OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Kesalahan pada server");
        }

        const result = await response.json();
        return result.success; // true jika email terdaftar
    } catch (error) {
        console.error("Error checking email availability:", error);
        throw error; // Lempar error agar bisa ditangkap di handleForgot
    }
}




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

export const registerMitra = async ({ name, email, password, kota, alamat, brand, no_rek, an }) => {
    try {
        const response = await fetch(`${apiUrl}/register-mitra`, { // Assuming `/register-mitra` is the endpoint for mitra registration
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': apiKey,  // Ensure that your `apiKey` variable is correctly set
            },
            body: JSON.stringify({
                name,
                email,
                password,
                kota,
                alamat,
                brand,
                no_rek,
                an,
            }),
        });

        // Check if response is not ok (status code not in the 200 range)
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error during registration:', errorData); // Log the error response for debugging
            throw new Error(errorData.message || 'Network response was not ok');
        }

        // Parse the response JSON
        const responseData = await response.json();

        // Check if response contains the expected data
        if (!responseData.token || !responseData.user) {
            throw new Error('Invalid response from server. Token or user data missing.');
        }

        // Return token and user data
        return {
            token: responseData.token,
            user: responseData.user,
        };

    } catch (error) {
        console.error('Error during registration process:', error); // Log any other errors
        throw new Error('Registration failed. Please try again later.');
    }
};