export default class Bank {
    constructor({
        id,
        an,
        brand,
        no_rek,
        createdBy,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id; // ID Bank
        this.an = an; // Nama pemilik rekening
        this.brand = brand; // Nama bank
        this.no_rek = no_rek; // Nomor rekening
        this.createdBy = createdBy; // ID pembuat data
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)
    }
}
