export default class Membership {
    constructor({
        id,
        user_id,
        class_id,
        createdAt,
        updatedAt,
        user,
        class: classData,
    }) {
        this.id = id; // ID keanggotaan
        this.userId = user_id; // ID pengguna
        this.classId = class_id; // ID kelas
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal keanggotaan dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal keanggotaan diperbarui

        // Detail pengguna
        this.user = user ? {
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.kota,
            address: user.alamat,
        } : null;

        // Detail kelas
        this.class = classData ? {
            id: classData.id,
            name: classData.name,
            address: classData.alamat,
            imagePath: classData.image_path,
            deletedAt: classData.deletedAt ? new Date(classData.deletedAt) : null, // Perbaikan di sini
            schedules: classData.schedules ? classData.schedules.map(schedule => ({
                hari: schedule.hari, // Nama hari
                jam: schedule.jam, // Jam
            })) : [], // Memetakan jadwal kelas
        } : null;
    }

    // Method untuk mendapatkan deskripsi pengguna
    get userDescription() {
        return this.user ? `${this.user.name} (${this.user.email}) - ${this.user.city}` : "User data not available";
    }

    // Method untuk mendapatkan deskripsi kelas
    get classDescription() {
        return this.class ? `${this.class.name}, located at ${this.class.address}` : "Class data not available";
    }

    // Method untuk mendapatkan waktu keanggotaan dalam format yang lebih ramah pengguna
    get membershipDuration() {
        if (!this.createdAt) return "Unknown duration";
        const now = new Date();
        const duration = Math.floor((now - this.createdAt) / (1000 * 60 * 60 * 24)); // Durasi dalam hari
        return `${duration} days since registration`;
    }

    // Method untuk mendapatkan jadwal kelas
    get classSchedule() {
        if (!this.class || !this.class.schedules || this.class.schedules.length === 0) {
            return "No schedule available";
        }
        // Mengonversi jadwal menjadi format yang lebih mudah dibaca
        return this.class.schedules.map(schedule => `${schedule.day} at ${schedule.time}`).join(', ');
    }
}
