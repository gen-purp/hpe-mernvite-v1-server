require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
    const name = process.env.ADMIN_NAME || 'Admin';
    const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

    if (!email) {
      console.error('ADMIN_EMAIL missing in .env');
      process.exit(1);
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin exists:', email);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, passwordHash, role: 'admin' });
      console.log('✅ Admin created:', email);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
