import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/modules/user/models/user.model.js';
import { createUserProfiles } from './src/modules/user/services/user.service.js';

dotenv.config();

const createE2EUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trustcore');
    console.log('✓ Connected to MongoDB Atlas');

    // Create tenant user
    const tenantUser = await User.create({
      name: 'Tenant E2E User',
      email: 'tenant.e2e.1788073285441@example.com',
      phone: '+1073285441',
      role: 'tenant',
      isActive: true,
    });
    await createUserProfiles({ user: tenantUser });
    console.log(`✓ Created tenant: ${tenantUser.email}`);

    // Create landlord user
    const landlordUser = await User.create({
      name: 'Landlord E2E User',
      email: 'landlord.e2e.1788073285441@example.com',
      phone: '+1073286441',
      role: 'landlord',
      isActive: true,
    });
    await createUserProfiles({ user: landlordUser });
    console.log(`✓ Created landlord: ${landlordUser.email}`);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin E2E User',
      email: 'admin.e2e.1788073285441@example.com',
      phone: '+1073287441',
      role: 'admin',
      isActive: true,
    });
    await createUserProfiles({ user: adminUser });
    console.log(`✓ Created admin: ${adminUser.email}`);

    console.log('\n✅ E2E test users created successfully!');
    console.log('\nNow run: node seed.js\n');

    await mongoose.disconnect();
  } catch (error) {
    if (error.message.includes('E11000')) {
      console.log('⚠️  Users already exist in database');
      console.log('\nRun: node seed.js');
      process.exit(0);
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
};

createE2EUsers();
