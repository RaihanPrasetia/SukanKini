// src/models/User.js
export default class User {
    constructor({
        id,
        name,
        email,
        role,
        age = null,
        weight = null,
        height = null,
        isBlocked = false,
        createdAt,
        updatedAt,
        deletedAt = null,

    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.isBlocked = isBlocked;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
        this.deletedAt = deletedAt ? new Date(deletedAt) : null;
    }

    // Method to check if the user is blocked
    isUserBlocked() {
        return this.isBlocked;
    }

    // Method to check if the user is an admin
    isAdmin() {
        return this.role === 'admin';
    }

    isUser() {
        return this.role === 'user';
    }
    isMitra() {
        return this.role === 'mitra';
    }

    // Method to return a formatted name (example)
    getFormattedName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
}
