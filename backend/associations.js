const Class = require('./models/classModel');
const ClassSchedule = require('./models/classScheduleModel');
const Category = require('./models/categoryModel');
const User = require('./models/userModel');
const Trainer = require('./models/trainerModel');
const Memberships = require('./models/membershipsModel');
const Payment = require('./models/paymentModel');
const Bank = require('./models/bankModel');
const Notification = require('./models/notifModel');
const Benefit = require('./models/benefitModel');
const Video = require('./models/videoModel');
const Comment = require('./models/commentModel');
const Like = require('./models/likeModel');
const Rating = require('./models/ratingModel');

// Define Associations
Class.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });
Class.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Class.belongsTo(Trainer, {
    foreignKey: 'trainer_id',
    as: 'trainer',
    paranoid: true
});

Class.hasMany(ClassSchedule, { foreignKey: 'class_id', as: 'schedules' });
Class.hasMany(Memberships, { foreignKey: 'class_id', as: 'members' });
Class.hasMany(Payment, { foreignKey: 'class_id', as: 'payments' });
Class.hasMany(Benefit, { foreignKey: 'class_id', as: 'benefits' });
Class.hasMany(Rating, { foreignKey: 'class_id', as: 'ratings' });

Trainer.hasMany(Class, { foreignKey: 'trainer_id', as: 'class' });
Trainer.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });

Benefit.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });
Benefit.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });

ClassSchedule.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

Memberships.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });
Memberships.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Payment.belongsTo(User, { foreignKey: 'user_id', as: 'to' });
Payment.belongsTo(User, { foreignKey: 'createdBy', as: 'from' });
Payment.belongsTo(Bank, { foreignKey: 'bank_id', as: 'bank' });
Payment.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

Notification.belongsTo(User, { foreignKey: 'createdBy', as: 'from' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'to' });

Comment.belongsTo(Video, { foreignKey: 'video_id', as: 'video' });
Comment.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });

Video.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });
Video.hasMany(Comment, { foreignKey: 'video_id', as: 'comments' });
Video.hasMany(Like, { foreignKey: 'video_id', as: 'likes' });

Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Rating.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

Like.belongsTo(Video, { foreignKey: 'video_id', as: 'video' });

module.exports = {
    Class,
    ClassSchedule,
    Category,
    Like,
    User,
    Trainer,
    Memberships,
    Payment,
    Bank,
    Notification,
    Benefit,
    Video,
    Comment,
    Rating,
};
