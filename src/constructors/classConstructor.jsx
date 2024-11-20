export default class Class {
    constructor({
        id,
        name,
        alamat,
        price,
        image_path,
        owner,
        category,
        trainer,
        schedules,
        members,
        createdAt,
        updatedAt,
        deletedAt = null,
    }) {
        this.id = id;
        this.name = name;
        this.address = alamat;
        this.price = price;
        this.imagePath = image_path;
        this.createdAt = createdAt ? new Date(createdAt) : null; // Tanggal data dibuat
        this.updatedAt = updatedAt ? new Date(updatedAt) : null; // Tanggal data diperbarui
        this.deletedAt = deletedAt ? new Date(deletedAt) : null; // Tanggal data dihapus (jika soft-delete)

        this.owner = {
            id: owner.id,
            name: owner.name
        };

        this.category = {
            id: category.id,
            name: category.name
        };

        this.trainer = {
            id: trainer.id,
            name: trainer.name,
            age: trainer.age,
            imagePath: trainer.image_path
        };

        this.schedules = schedules.map(schedule => ({
            id: schedule.id,
            hari: schedule.hari,
            jam: schedule.jam
        }));

        this.members = members.map(member => ({
            id: member.id,
            userId: member.user_id,
            classId: member.class_id,
            user: {
                id: member.user.id,
                name: member.user.name,
                city: member.user.kota,
                address: member.user.alamat,
                phone: member.user.phone_number
            }
        }));
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
        return this.schedules.map(schedule => `${schedule.day} at ${schedule.time}`).join(', ');
    }
}
