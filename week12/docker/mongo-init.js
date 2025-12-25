db = db.getSiblingDB('week12');

db.createUser({
  user: 'week12-admin',
  pwd: 'week12-pass',
  roles: [{ role: 'readWrite', db: 'week12' }]
});

db.createCollection('participants');
db.participants.createIndex({ ownerId: 1 });
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.insertOne({
  email: 'admin@example.com',
  passwordHash: '$2b$10$H2.y8wZbmxGX2Kg6qwnqseOjajeqpUM2QwBFZEo6hOAEtbvOENPDe',
  role: 'admin',
  createdAt: new Date()
});
