export default class Payment {
    constructor({
        id,
        bukti,
        status_pembayaran,
        total,
        bank,
        class: classInfo = null,
        from,
    }) {
        this.id = id;
        this.paymentProof = bukti;
        this.paymentStatus = status_pembayaran;
        this.total = total;
        this.bank = {
            accountName: bank.an,
            accountNumber: bank.no_rek,
            bankBrand: bank.brand,
        };
        this.classInfo = classInfo; // Kelas terkait, jika ada
        this.from = {
            name: from.name,
            email: from.email,
            phoneNumber: from.phone_number,
        };
    }

    // Properti terhitung untuk mengecek apakah pembayaran diterima
    get isAccepted() {
        return this.paymentStatus === "Diterima";
    }

    // Properti terhitung untuk mengecek apakah pembayaran ditolak
    get isRejected() {
        return this.paymentStatus === "Ditolak";
    }

    // Properti terhitung untuk mengecek apakah pembayaran sedang diproses
    get isInProcess() {
        return this.paymentStatus === "Diproses";
    }
}
