// server/data/users.js
import bcrypt from 'bcryptjs';

// Password '123456' hashed
const hashedPassword = await bcrypt.hash('123456', 10);

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: hashedPassword,
  },
];

export default users;