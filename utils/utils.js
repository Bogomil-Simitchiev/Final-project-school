const bcrypt = require('bcrypt');

async function hashPasssword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000);
  const uniqueId = `${timestamp}-${random}`;
  return uniqueId;
}

module.exports = {
  hashPasssword,
  comparePassword,
  generateUniqueId
} 