const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// Passport Google OAuth configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,  // Ensure GOOGLE_CLIENT_ID is set in .env
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Ensure GOOGLE_CLIENT_SECRET is set in .env
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:9000/auth/google/callback", // Ensure this is correct
}, async (token, tokenSecret, profile, done) => {
    try {
        // Check if the user exists in the database
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (!user) {
            // If user doesn't exist, create a new user
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'user',  // Default role is 'user'
                isVerified: true,  // Google users are typically verified
                isBlocked: false,  // Default blocked status is false
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Return the user and token via the done callback
        return done(null, { user, token: jwtToken });
    } catch (error) {
        console.error('Google login error:', error);
        return done(error, null);
    }
}));

// Serialize and deserialize user (passport session handling)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
