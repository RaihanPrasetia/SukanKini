// src/models/User.js
export default class User {
    constructor({
        id,
        name,
        email,
        phone_number = null,
        age = null,
        kota = null,
        alamat = null,
        height = null,
        weight = null,
        role,
        isBlocked = false,
        isVerified = false,
        image_path = null,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.age = age;
        this.kota = kota;
        this.alamat = alamat;
        this.height = height;
        this.weight = weight;
        this.role = role;
        this.isBlocked = isBlocked;
        this.isVerified = isVerified;
        this.image_path = image_path;
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
        this.deletedAt = deletedAt ? new Date(deletedAt) : null;
    }

    // Method to check if the user is blocked
    isUserBlocked() {
        return this.isBlocked;
    }

    // Method to check if the user is verified
    isUserVerified() {
        return this.isVerified;
    }

    // Method to check if the user is an admin
    isAdmin() {
        return this.role === 'admin';
    }

    // Method to check if the user is a regular user
    isUser() {
        return this.role === 'user';
    }

    // Method to check if the user is a mitra
    isMitra() {
        return this.role === 'mitra';
    }

    // Method to return a formatted name (capitalize first letter)
    getFormattedName() {
        return this.name ? this.name.charAt(0).toUpperCase() + this.name.slice(1) : 'No name available';
    }

    // Method to get phone number with fallback
    getPhoneNumber() {
        return this.phone_number || 'No phone number available';
    }

    // Method to get address with fallback
    getAddress() {
        return this.alamat || 'No address available';
    }

    // Method to get location (kota) with fallback
    getLocation() {
        return this.kota || 'No city available';
    }

    // Method to get formatted date of creation
    getFormattedCreatedAt() {
        return this.createdAt ? this.createdAt.toLocaleDateString() : 'No date available';
    }

    // Method to get formatted date of last update
    getFormattedUpdatedAt() {
        return this.updatedAt ? this.updatedAt.toLocaleDateString() : 'No date available';
    }

    // Method to get user image with fallback
    getProfileImage() {
        return this.image_path || 'https://via.placeholder.com/150';
    }
}
