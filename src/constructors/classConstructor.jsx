export default class Class {
    constructor({
        id,
        name,
        alamat,
        price,
        image_path,
        owner = null, // Default ke null jika tidak ada
        category = {},
        trainer = {},
        schedules = [],
        members = [],
        createdBy,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id;
        this.name = name;
        this.address = alamat;
        this.price = price;
        this.createdBy = createdBy;
        this.imagePath = image_path;
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)

        this.owner = owner
            ? {
                id: owner.id || null,
                name: owner.name || "Unknown",
            }
            : null;

        this.category = {
            id: category.id || null,
            name: category.name || "Unknown",
        };

        this.trainer = {
            id: trainer.id || null,
            name: trainer.name || "Unknown",
            age: trainer.age || "Unknown",
            imagePath: trainer.image_path || "",
            phone: trainer.phone_number || "",
            alamat: trainer.alamat || "",
            deletedAt: trainer.deletedAt,
        };

        this.schedules = Array.isArray(schedules)
            ? schedules.map((schedule) => ({
                id: schedule.id,
                hari: schedule.hari,
                jam: schedule.jam,
            }))
            : [];

        this.members = Array.isArray(members)
            ? members.map((member) => ({
                id: member.id,
                userId: member.user_id,
                classId: member.class_id,
                status: member.status,
                createdAt: member.createdAt ? new Date(createdAt) : null,
                updatedAt: member.updatedAt ? new Date(createdAt) : null,
                user: {
                    id: member.user?.id || null,
                    name: member.user?.name || "Unknown",
                    city: member.user?.kota || "Unknown",
                    address: member.user?.alamat || "Unknown",
                    phone: member.user?.phone_number || "Unknown",
                },
            }))
            : [];
    }

    // A method to check if the class has any members
    get hasMembers() {
        return this.members.length > 0;
    }

    // Method to get the trainer's full name
    get trainerFullName() {
        return `${this.trainer.name} (Age: ${this.trainer.age})`;
    }

    // Method to display class schedules
    get classSchedule() {
        return this.schedules.map((schedule) => `${schedule.hari} at ${schedule.jam}`).join(", ");
    }
}
