const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM achievements");
  await db.query("DELETE FROM users_achievements");

  await db.query(`
    INSERT INTO users(username,
                      password,
                      total_wins,
                      perfect_wins)
    VALUES ('u1', $1, 10, 5),
           ('u2', $2, 1, 1)
    `,
  [
    await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
    await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
  ]);

  await db.query(`
    INSERT INTO achievements(code, name, description)
    VALUES ('a1', 'A1', 'Desc1'),
           ('a2', 'A2', 'Desc2')`);

  await db.query(`
        INSERT INTO users_achievements(username, code)
        VALUES ('u1', 'a1')`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};