// Script to create initial admin user
// Run this after setting up the D1 database: npx wrangler d1 execute geelong-stars-db --file=./scripts/create-admin.js

// This generates a password hash for the admin user
// In production, change the password and regenerate the hash

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');

  const data = encoder.encode(saltHex + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return `${saltHex}:${hashHex}`;
}

// Generate hash for 'admin123' password
// For production, use a secure password!
async function main() {
  const password = 'admin123';
  const hash = await hashPassword(password);
  console.log('Password hash for "admin123":');
  console.log(hash);
  console.log('\nSQL to insert admin user:');
  console.log(`INSERT INTO users (username, password_hash) VALUES ('admin', '${hash}');`);
}

main();
