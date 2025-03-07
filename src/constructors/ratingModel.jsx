export default class Rating {
    constructor({
        id,
        value,
        message,
        class_id,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id; // ID Bank
        this.value = value; // Nama pemilik rekening
        this.message = message; // Nama bank
        this.class_id = class_id
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)
    }
}
