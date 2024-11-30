const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Payment = require('../models/paymentModel');
const ClassSchedule = require('../models/classScheduleModel');
const Category = require('../models/categoryModel');
const Class = require('../models/classModel');
const Trainer = require('../models/trainerModel');
const Membership = require('../models/membershipsModel');
const Benefit = require('../models/benefitModel');
const Video = require('../models/videoModel');
const Comment = require('../models/commentModel');

const seedData = async () => {
  try {
    // Seed Admin User
    const hashedPassword = await bcrypt.hash('12345678', 10);

    const adminUser = await User.create({
      name: 'Admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin',
      isVerified: true,
      gender: 'Laki-Laki',
      age: 30,
    });

    console.log('Admin seeded successfully.');

    // Seed Regular Users
    const regularUsers = [];
    for (let i = 1; i <= 3; i++) {
      const user = await User.create({
        name: `User ${i}`,
        password: hashedPassword,
        email: `user${i}@example.com`,
        kota: 'Jambi',
        alamat: `Alamat User ${i}`,
        isVerified: true,
        gender: 'Laki-Laki',
        age: 25 + i,
        height: 170 + i,
        weight: 70 + i,
        phone_number: `08579126352${i}`,
      });
      regularUsers.push(user);
    }

    console.log('Users seeded successfully.');

    // Seed Mitra Users
    const mitraUsers = [];
    for (let i = 1; i <= 5; i++) {
      const mitra = await User.create({
        name: `Mitra ${i}`,
        password: hashedPassword,
        email: `mitra${i}@example.com`,
        role: 'mitra',
        kota: 'Jambi',
        alamat: `Alamat Mitra ${i}`,
        isVerified: true,
        gender: 'Perempuan',
        age: 40 + i,
        phone_number: `08579126352${i + 5}`,
      });
      mitraUsers.push(mitra);

      // Seed Banks for Mitra
      await Bank.bulkCreate([
        { brand: 'BCA', an: `Mitra ${i}`, no_rek: `52678910${i}1`, createdBy: mitra.id },
        { brand: 'BRI', an: `Mitra ${i}`, no_rek: `52678910${i}2`, createdBy: mitra.id },
      ]);

      // Seed Classes for Mitra
      for (let j = 1; j <= 2; j++) {
        const category = await Category.create({
          name: `Kategori ${j} Mitra ${i}`,
          createdBy: mitra.id,
        });

        const trainer = await Trainer.create({
          name: `Trainer ${j} Mitra ${i}`,
          age: 30 + j,
          image_path: 'trainer.jpg',
          alamat: `Alamat Trainer ${j} Mitra ${i}`,
          phone_number: `0867352437${i}${j}`,
          createdBy: mitra.id,
        });

        const classInstance = await Class.create({
          name: `Kelas ${j} Mitra ${i}`,
          category_id: category.id,
          alamat: mitra.kota + ', ' + mitra.alamat,
          trainer_id: trainer.id,
          createdBy: mitra.id,
          price: 100000 * j,
        });

        // Seed Schedules for Class
        await ClassSchedule.bulkCreate([
          { class_id: classInstance.id, hari: 'Senin', jam: '09:00', createdBy: mitra.id },
          { class_id: classInstance.id, hari: 'Rabu', jam: '10:00', createdBy: mitra.id },
        ]);

        // Seed Benefits for Class
        await Benefit.bulkCreate([
          { name: 'Benefit 1', description: 'Deskripsi 1', class_id: classInstance.id, createdBy: mitra.id },
          { name: 'Benefit 2', description: 'Deskripsi 2', class_id: classInstance.id, createdBy: mitra.id },
        ]);
      }
    }

    console.log('Mitras seeded successfully.');

    // Seed Videos
    const videos = [];
    for (let i = 1; i <= 5; i++) {
      const video = await Video.create({
        title: `Video ${i}`,
        description: `Deskripsi Video ${i}`,
        video_link: `https://youtube.com/video${i}`,
        thumbnail_link: `https://youtube.com/video${i}`,
        createdBy: 1,
        view_count: Math.floor(Math.random() * 100),
        like_count: Math.floor(Math.random() * 50),
      });
      videos.push(video);
    }

    console.log('Videos seeded successfully.');

    // Seed Comments
    for (let i = 0; i < videos.length; i++) {
      for (let j = 1; j <= 3; j++) {
        await Comment.create({
          video_id: videos[i].id,
          createdBy: regularUsers[j - 1].id,
          message: `Comment ${j} on Video ${videos[i].title}`,
        });
      }
    }

    console.log('Comments seeded successfully.');

    // Register Users to Classes
    for (const user of regularUsers) {
      for (let i = 0; i < 2; i++) {
        const classId = i + 1; // Assuming classes are auto-incremented starting from 1
        await Membership.create({
          user_id: user.id,
          class_id: classId,
          status: 'active',
        });
      }
    }

    console.log('Memberships seeded successfully.');

    // Seed Payments
    for (const user of regularUsers) {
      await Payment.bulkCreate([
        { createdBy: user.id, bank_id: 1, class_id: 1, total: 50000, status_pembayaran: 'Diproses', user_id: mitraUsers[0].id },
        { createdBy: user.id, bank_id: 1, class_id: 2, total: 70000, status_pembayaran: 'Diterima', user_id: mitraUsers[1].id },
        { createdBy: user.id, bank_id: 1, class_id: 1, total: 80000, status_pembayaran: 'Ditolak', user_id: mitraUsers[2].id },
      ]);
    }

    for (const mitra of mitraUsers) {
      await Payment.bulkCreate([
        { createdBy: mitra.id, bank_id: 1, total: 100000, status_pembayaran: 'Diproses', user_id: adminUser.id },
        { createdBy: mitra.id, bank_id: 1, total: 150000, status_pembayaran: 'Diterima', user_id: adminUser.id },
        { createdBy: mitra.id, bank_id: 1, total: 200000, status_pembayaran: 'Ditolak', user_id: adminUser.id },
      ]);
    }

    console.log('Payments seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
