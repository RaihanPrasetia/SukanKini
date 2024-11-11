export default class Bank {
    constructor({
        id,
        an,
        bank,
        no_rek,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id;
        this.an = an;
        this.bank = bank;
        this.no_rek = no_rek;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
        this.deletedAt = deletedAt ? new Date(deletedAt) : null;
    }
}