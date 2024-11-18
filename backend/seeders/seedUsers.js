const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Payment = require('../models/paymentModel');  // Import the Payment model
const ClassSchedule = require('../models/classScheduleModel');
const Category = require('../models/categoryModel');
const Class = require('../models/classModel');
const Trainer = require('../models/trainerModel');
const Membership = require('../models/membershipsModel');

const seedData = async () => {
  try {

    // Seed User Data
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Create admin user
    const adminUser = await User.create({
      name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin',
      isVerified: true,
      gender: 'Laki-Laki',
      age: 20,
    });

    // Create regular user
    const regularUser = await User.create({
      name: 'user',
      password: hashedPassword,
      email: 'user@example.com',
      kota: 'Jambi',
      alamat: 'Jalan Merpati Blok.D No.2 Kel.Selamat',
      isVerified: true,
      gender: 'Laki-Laki',
      age: 20,
      height: 170,
      weight: 72,
      phone_number: '0857912635271',
    });

    // Create Mitra user
    const mitraUser = await User.create({
      name: 'mitra',
      password: hashedPassword,
      email: 'mitra@example.com',
      role: 'mitra',
      alamat: 'Astone Hotel',
      kota: 'Jambi',
      isVerified: true,
      gender: 'Perempuan',
      age: 45,
      phone_number: '0857912635276',
    });

    console.log('Users seeded successfully.');
    // Seed Bank Data
    await Bank.create({
      brand: 'BRI',
      an: 'Admin',
      no_rek: '5267891022',
      createdBy: adminUser.id,
    });

    await Bank.create({
      brand: 'MANDIRI',
      an: 'Mitra',
      no_rek: '62818626372',
      createdBy: mitraUser.id,
    });
    await Bank.create({
      brand: 'BCA',
      an: 'Mitra',
      no_rek: '2863234',
      createdBy: mitraUser.id,
    });

    console.log('Banks seeded successfully.');

    await Category.create({
      name: 'Yoga',
      createdBy: mitraUser.id,
    })
    await Category.create({
      name: 'Zumba',
      createdBy: mitraUser.id,
    })
    await Trainer.create({
      name: 'Natalie Rose',
      age: 32,
      image_path: 'pelatih1.jpg',
      createdBy: mitraUser.id,
    })
    await Trainer.create({
      name: 'Natasha Willona',
      age: 32,
      image_path: 'pelatih1.jpg',
      createdBy: mitraUser.id,
    })
    await Class.create({
      name: 'Kelas Yoga Natalie',
      category_id: 1,
      alamat: mitraUser.kota + ', ' + mitraUser.alamat,
      trainer_id: 1,
      createdBy: mitraUser.id,
      price: 500000
    })
    await Class.create({
      name: 'Kelas Zumba Bersama Natasha',
      category_id: 2,
      alamat: mitraUser.kota + ', ' + mitraUser.alamat,
      trainer_id: 2,
      createdBy: mitraUser.id,
      price: 300000
    })
    await ClassSchedule.bulkCreate([
      {
        class_id: 1,
        hari: 'Senin',
        jam: '09:00',
        createdBy: mitraUser.id,
      },
      {
        class_id: 1,
        hari: 'Rabu',
        jam: '09:00',
        createdBy: mitraUser.id,
      },
      {
        class_id: 1,
        hari: 'Kamis',
        jam: '11:00',
        createdBy: mitraUser.id,
      },
      {
        class_id: 2,
        hari: 'Senin',
        jam: '11:00',
        createdBy: mitraUser.id,
      },
      {
        class_id: 2,
        hari: 'Rabu',
        jam: '14:00',
        createdBy: mitraUser.id,
      },
      {
        class_id: 2,
        hari: 'Kamis',
        jam: '13:00',
        createdBy: mitraUser.id,
      }
    ]);

    await Payment.create({
      user_id: adminUser.id, // Payment for the admin user
      bank_id: 1, // Associated with Bank A
      bukti: 'bukti1.jpg', // Payment proof file path
      status_pembayaran: 'Diterima',
      createdBy: mitraUser.id,
      total: 250000 // Payment status (completed)
    });

    await Payment.create({
      user_id: mitraUser.id, // Payment for the regular user
      bank_id: 2, // Associated with Bank A
      bukti: 'path/to/payment-proof-user.jpg', // Payment proof file path
      status_pembayaran: 'Diproses',
      createdBy: regularUser.id,
      class_id: 1,
      total: 150000
    });
    await Payment.create({
      user_id: mitraUser.id, // Payment for the regular user
      bank_id: 2, // Associated with Bank A
      bukti: 'path/to/payment-proof-user.jpg', // Payment proof file path
      status_pembayaran: 'Ditolak',
      createdBy: regularUser.id,
      class_id: 1,
      total: 150000
    });

    await Payment.create({
      user_id: mitraUser.id, // Payment for the mitra user
      bank_id: 2, // Associated with Bank B
      bukti: 'path/to/payment-proof-mitra.jpg', // Payment proof file path
      status_pembayaran: 'Diterima',
      createdBy: regularUser.id,
      class_id: 2,
      total: 200000
    });

    await Membership.create({
      user_id: regularUser.id,
      class_id: 1,
      status: 'active'
    })

    await Membership.create({
      user_id: regularUser.id,
      class_id: 2,
      status: 'active'
    })

    console.log('Payments seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
