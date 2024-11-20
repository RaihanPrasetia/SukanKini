export default class Category {
    constructor({
        id,
        name,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)
    }
}
