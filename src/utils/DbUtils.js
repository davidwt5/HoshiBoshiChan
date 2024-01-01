const fs = require('fs').promises;
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'db');

async function readFromDb(db) {
  const filePath = path.resolve(dbPath, db);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log(`File "${path.basename(filePath)}" has been read, content: ${content}`);
    return content;
  } catch (err) {
    console.error('Error reading the file:', err);
    throw err;
  }
}

async function writeToDb(db, content) {
  const filePath = path.resolve(dbPath, db);
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`File "${path.basename(filePath)}" has been written to, new content: ${content}`);
  } catch (err) {
    console.error('Error reading the file:', err);
    throw err;
  }
}

module.exports = {
  readFromDb,
  writeToDb
};