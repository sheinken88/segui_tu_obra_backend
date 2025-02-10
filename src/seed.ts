// src/seed.ts

import { createConnection } from 'typeorm';
import { User, UserRole } from './users/user.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

async function seed() {
  // Create a TypeORM connection using your configuration
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Ensure your entities are loaded correctly:
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Only for development and seeding
    logging: false,
  });

  // Get the repository for the User entity
  const userRepository = connection.getRepository(User);

  // Clear existing users (optional, for a clean seed)
  await userRepository.clear();

  // Hash passwords using bcrypt
  const hashedPassword1 = await bcrypt.hash('secret', 10);
  const hashedPassword2 = await bcrypt.hash('password', 10);

  // Create two user records
  const user1 = userRepository.create({
    tenant_id: 1,
    name: 'Test Homeowner',
    email: 'test@example.com',
    role: UserRole.HOMEOWNER,
    password_hash: hashedPassword1,
  });

  const user2 = userRepository.create({
    tenant_id: 1,
    name: 'Test Contractor',
    email: 'contractor@example.com',
    role: UserRole.CONTRACTOR,
    password_hash: hashedPassword2,
  });

  // Save the new users to the database
  await userRepository.save([user1, user2]);

  console.log('Seeding complete: Users have been added.');

  // Close the connection
  await connection.close();
}

// Run the seed function and catch any errors
seed().catch((error) => {
  console.error('Error during seeding:', error);
});
