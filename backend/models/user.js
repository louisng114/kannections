"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, totalWins, perfectWins }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  total_wins AS "totalWins",
                  perfect_wins AS "perfectWins"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, totalWins, perfectWins }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Username already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            total_wins,
            perfect_wins)
           VALUES ($1, $2, 0, 0)
           RETURNING username, total_wins AS "totalWins", perfect_wins AS "perfectWins"`,
        [
          username,
          hashedPassword,
        ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, totalWins, perfectWins, achievements }
   *   where achievements is { code }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  total_wins AS "totalWins",
                  perfect_wins AS "perfectWins"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`User not found`);

    const userAchievementsRes = await db.query(
          `SELECT code
           FROM users_achievements
           WHERE username = $1`, [username]);

    user.achievements = userAchievementsRes.rows.map(row => row.code);
    return user;
  }

  /** Increase user total_wins by 1: update db, returns total_wins as totalWins.
   *
   * - username: username of the user
   **/

  static async gainWin(username) {
    const resp = await db.query(
          `UPDATE users
          SET total_wins = total_wins + 1
          WHERE username = $1
          RETURNING total_wins AS "totalWins"`,
          [username]
    );

    return resp.rows[0].totalWins;
  }

  /** Increase user perfect_wins by 1: update db, returns perfect_wins as perfectWins.
   *
   * - username: username of the user
   **/

  static async gainPerfectWin(username) {
    const resp = await db.query(
      `UPDATE users
      SET perfect_wins = perfect_wins + 1
      WHERE username = $1
      RETURNING perfect_wins AS "perfectWins"`,
      [username]
    );

    return resp.rows[0].perfectWins;
  }

  /** Grant user achievement: update db, returns undefined.
   *
   * - username: username of the user
   * - code: achievement code
   **/

  static async gainAchievement(username, code) {
    const preCheck = await db.query(
      `SELECT code
        FROM achievements
        WHERE code = $1`, [code]);
    const achievement = preCheck.rows[0];

    if (!achievement) throw new NotFoundError(`No job: ${code}`);

    // Check if the user-achievement pair already exists
    const userAchievementCheck = await db.query(
      `SELECT username, code
        FROM users_achievements
        WHERE username = $1 AND code = $2`,
      [username, code]
    );

    const userAchievement = userAchievementCheck.rows[0];

    if (!userAchievement) {
      // Insert the user-achievement pair if it doesn't exist
      await db.query(
        `INSERT INTO users_achievements (username, code)
        VALUES ($1, $2)`,
        [username, code]);
    }
  }
}


module.exports = User;