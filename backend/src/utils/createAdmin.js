const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    
    const adminExists = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    const admin = new User({
      email: 'admin@portfolio.com',
      password: 'adminpassword123' // You should change this after logging in
    });

    await admin.save();
    console.log('Admin created successfully: admin@portfolio.com / adminpassword123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
