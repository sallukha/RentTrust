import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trustcore');
    console.log('✓ Connected to MongoDB');

    // Get the database
    const db = mongoose.connection.db;

    // Get all collection names
    const collections = await db.listCollections().toArray();
    console.log(`\n📊 Found ${collections.length} collections:`);

    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      console.log(`   - ${collectionName}: ${count} documents`);

      await db.collection(collectionName).deleteMany({});
      console.log(`   ✓ Cleared ${collectionName}`);
    }

    console.log('\n✅ Database cleared successfully!');
    console.log('\n💡 Tip: Run `node seed.js` to seed new test data');

    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB\n');
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
    process.exit(1);
  }
};

clearDatabase();
