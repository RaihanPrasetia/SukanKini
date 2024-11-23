export default class Trainer {
    constructor({
        id,
        name,
        age,
        image_path,
        phone_number,
        alamat,
        class: classes = [], // Tambahkan daftar kelas yang dimiliki trainer
        owner = null, // Tambahkan informasi owner
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id; // ID Trainer
        this.name = name; // Nama Trainer
        this.age = age; // Usia Trainer
        this.alamat = alamat; // Alamat Trainer
        this.phone = phone_number; // Nomor Telepon Trainer
        this.imagePath = image_path; // Jalur Gambar Profil Trainer
        this.classes = classes.map((cls) => ({
            name: cls.name,
            alamat: cls.alamat,
        })); // Daftar kelas, jika ada
        this.owner = owner
            ? {
                name: owner.name,
                kota: owner.kota,
                alamat: owner.alamat,
                phone: owner.phone_number || "Tidak tersedia",
                email: owner.email,
            }
            : null; // Informasi pemilik, jika ada
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)
    }
}
