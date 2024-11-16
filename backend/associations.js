const Class = require('./models/classModel');
const ClassSchedule = require('./models/classScheduleModel');
const Category = require('./models/categoryModel');
const User = require('./models/userModel');
const Trainer = require('./models/trainerModel');
const Memberships = require('./models/membershipsModel');
const Payment = require('./models/paymentModel');
const Bank = require('./models/bankModel');

// Define Associations
Class.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });
Class.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Class.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
Class.hasMany(ClassSchedule, { foreignKey: 'class_id', as: 'schedules' });
Class.hasMany(Memberships, { foreignKey: 'class_id', as: 'members' });

ClassSchedule.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });
Memberships.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });
Memberships.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'to' });
Payment.belongsTo(User, { foreignKey: 'createdBy', as: 'from' });
Payment.belongsTo(Bank, { foreignKey: 'bank_id', as: 'bank' });
Payment.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

module.exports = {
    Class,
    ClassSchedule,
    Category,
    User,
    Trainer,
    Memberships,
    Payment,
    Bank,
    User,
};
