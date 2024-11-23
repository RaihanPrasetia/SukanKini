export default class Trainer {
    constructor({
        id,
        name,
        age,
        image_path,
        phone_number,
        alamat,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id; // ID Bank
        this.name = name; // Nama pemilik rekening
        this.age = age; // Nama bank
        this.alamat = alamat; // Nama bank
        this.phone = phone_number; // Nama bank
        this.imagePath = image_path; // Nomor rekening
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)
    }
}
