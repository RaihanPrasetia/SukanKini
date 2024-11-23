export default class Notification {
    constructor({
        id,
        title,
        message,
        type,
        isRead,
        from,
        to,
        createdAt,
        updatedAt,
        deletedAt,
    }) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null;

        // Map nested objects for "from" and "to"
        this.from = {
            name: from?.name || null,
            email: from?.email || null,
            phone_number: from?.phone_number || null,
        };

        this.to = {
            name: to?.name || null,
            email: to?.email || null,
            phone_number: to?.phone_number || null,
        };
    }

    // Method to format the notification message
    getFormattedMessage() {
        return `${this.title}: ${this.message}`;
    }

    // Method to mark the notification as read
    markAsRead() {
        this.isRead = true;
    }
}
