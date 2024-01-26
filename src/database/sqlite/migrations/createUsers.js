const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTRAMP,
    updated_at TIMESTRAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

module.exports = createUsers;