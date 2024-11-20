export default class Payment {
    constructor({
        id,
        bukti = null,
        status_pembayaran = "Proses",
        total = 0,
        bank = {},
        class: classInfo = null,
        from = {},
    }) {
        this.id = id;
        this.paymentProof = bukti || ""; // Default ke string kosong jika tidak ada bukti
        this.paymentStatus = status_pembayaran;
        this.total = total;

        // Bank object dengan nilai default untuk menghindari error jika data tidak lengkap
        this.bank = {
            accountName: bank.an || "Tidak tersedia",
            accountNumber: bank.no_rek || "Tidak tersedia",
            bankBrand: bank.brand || "Tidak tersedia",
        };

        // Class information, jika tidak ada data kelas maka gunakan nilai default
        this.classInfo = classInfo
            ? {
                name: classInfo.name || "Tidak ada nama kelas",
                categoryId: classInfo.category_id || null,
            }
            : null;

        // Informasi pengirim
        this.from = {
            name: from.name || "Tidak ada nama",
            email: from.email || "Tidak ada email",
            phoneNumber: from.phone_number || "Tidak ada nomor telepon",
        };

        // Jadwal dari kelas
        this.schedules = classInfo?.schedules || [];
    }

    /**
     * Properti terhitung untuk mengecek apakah pembayaran diterima
     * @returns {boolean}
     */
    get isAccepted() {
        return this.paymentStatus === "Diterima";
    }

    /**
     * Properti terhitung untuk mengecek apakah pembayaran ditolak
     * @returns {boolean}
     */
    get isRejected() {
        return this.paymentStatus === "Ditolak";
    }

    /**
     * Properti terhitung untuk mengecek apakah pembayaran sedang diproses
     * @returns {boolean}
     */
    get isInProcess() {
        return this.paymentStatus === "Diproses";
    }

    /**
     * Mengembalikan jadwal dalam format terstruktur
     * @returns {Array<{ hari: string, jam: string }> | null}
     */
    get formattedSchedules() {
        if (!this.schedules.length) return null; // Jika tidak ada jadwal, kembalikan `null`
        return this.schedules.map((schedule) => ({
            hari: schedule.hari || "Tidak ada hari",
            jam: schedule.jam || "Tidak ada jam",
        }));
    }

    /**
     * Properti terhitung untuk memeriksa apakah ada jadwal terkait
     * @returns {boolean}
     */
    get hasSchedules() {
        return this.schedules.length > 0;
    }
}
