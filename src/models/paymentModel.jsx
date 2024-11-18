export default class Payment {
    constructor({
        id,
        user_id,
        bank_id,
        bukti,
        status_pembayaran,
        createdBy,
        class_id,
        total,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id;
        this.userId = user_id;
        this.bankId = bank_id;
        this.paymentProof = bukti;
        this.paymentStatus = status_pembayaran;
        this.createdBy = createdBy;
        this.classId = class_id;
        this.total = total;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
        this.deletedAt = deletedAt ? new Date(deletedAt) : null;
    }

    // Properti terhitung untuk mengecek apakah pembayaran diterima
    get isAccepted() {
        return this.paymentStatus === "Diterima";
    }
}
