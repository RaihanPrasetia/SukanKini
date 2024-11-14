const sequelize = require('../../config');
const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Payment = require('../models/paymentModel');  // Import the Payment model
const Category = require('../models/categoryModel');  // Import the Payment model
const Class = require('../models/classModel');
const ClassSchedule = require('../models/classScheduleModel');
const Trainer = require('../models/trainerModel');

Object.keys(require.cache).forEach((key) => {
  delete require.cache[key];
});

const migrate = async () => {
  const transaction = await sequelize.transaction();
  try {
    await Payment.drop({ transaction });
    await ClassSchedule.drop({ transaction });
    await Class.drop({ transaction });
    await Category.drop({ transaction });
    await Trainer.drop({ transaction });
    await Bank.drop({ transaction });
    await User.drop({ transaction });

    await User.sync({ force: true, transaction });
    await Bank.sync({ force: true, transaction });
    await Trainer.sync({ force: true, transaction });
    await Category.sync({ force: true, transaction });
    await Class.sync({ force: true, transaction });
    await ClassSchedule.sync({ force: true, transaction });
    await Payment.sync({ force: true, transaction });

    await transaction.commit();
    console.log('All tables created successfully.');
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating tables:', error);
  }
};

migrate();
