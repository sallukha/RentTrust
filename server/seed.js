import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Import models
import { User } from './src/modules/user/models/user.model.js';
import Property from './src/modules/property/models/property.model.js';
import Booking from './src/modules/booking/models/booking.model.js';
import Lease from './src/modules/lease/models/Lease.model.js';
import Invoice from './src/modules/invoice/models/invoice.model.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trustcore');
    console.log('✓ Connected to MongoDB');

    // Get the E2E test users
    const tenantUser = await User.findOne({
      email: 'tenant.e2e.1788073285441@example.com',
      role: 'tenant',
    });

    const landlordUser = await User.findOne({
      email: 'landlord.e2e.1788073285441@example.com',
      role: 'landlord',
    });

    if (!tenantUser || !landlordUser) {
      throw new Error('E2E test users not found. Please run the auth e2e test first.');
    }

    console.log(`✓ Found tenant: ${tenantUser.name} (${tenantUser.email})`);
    console.log(`✓ Found landlord: ${landlordUser.name} (${landlordUser.email})`);

    // Create a sample property
    const property = await Property.create({
      title: 'Modern Downtown Apartment',
      description: 'A beautiful 2-bedroom apartment in the heart of downtown with modern amenities.',
      landlordId: landlordUser._id,
      address: {
        street: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
      },
      pricePerMonth: 2500,
      securityDeposit: 5000,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ['WiFi', 'Gym', 'Parking', 'Air Conditioning'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60',
      ],
      status: 'available',
    });

    console.log(`✓ Created property: "${property.title}" (ID: ${property._id})`);

    // Create a booking
    const requestedDate = new Date();
    requestedDate.setDate(requestedDate.getDate() + 7);

    const booking = await Booking.create({
      propertyId: property._id,
      tenantId: tenantUser._id,
      landlordId: landlordUser._id,
      requestedDate,
      timeSlot: '10:00 AM - 12:00 PM',
      notes: 'Very interested in viewing this property. Available anytime this week.',
      status: 'confirmed',
    });

    console.log(`✓ Created booking: (ID: ${booking._id}, status: ${booking.status})`);

    // Create a lease
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 14);

    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const lease = await Lease.create({
      propertyId: property._id,
      landlordId: landlordUser._id,
      tenantId: tenantUser._id,
      startDate,
      endDate,
      monthlyRent: 2500,
      securityDeposit: 5000,
      termsAndConditions:
        'Standard residential lease agreement. Tenant is responsible for utilities. No pets allowed.',
      status: 'active',
      landlordSigned: true,
      tenantSigned: true,
      signedAt: new Date(),
    });

    console.log(`✓ Created lease: (ID: ${lease._id}, status: ${lease.status})`);

    // Create an invoice for the first month
    const invoiceNumber = `INV-${Date.now()}-${landlordUser._id}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const invoice = await Invoice.create({
      invoiceNumber,
      leaseId: lease._id,
      tenantId: tenantUser._id,
      landlordId: landlordUser._id,
      amountDue: 2500,
      dueDate,
      lineItems: [
        {
          description: 'Monthly Rent',
          amount: 2500,
        },
      ],
      status: 'unpaid',
    });

    console.log(
      `✓ Created invoice: "${invoice.invoiceNumber}" (ID: ${invoice._id}, amount: $${invoice.amountDue})`
    );

    // Update property status to rented
    property.status = 'rented';
    await property.save();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Property: ${property.title}`);
    console.log(`   - Monthly Rent: $${property.pricePerMonth}`);
    console.log(`   - Tenant: ${tenantUser.name}`);
    console.log(`   - Landlord: ${landlordUser.name}`);
    console.log(`   - Lease Status: ${lease.status}`);
    console.log(`   - Invoice Status: ${invoice.status} ($${invoice.amountDue} due)`);

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
