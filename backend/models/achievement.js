"use strict";

const db = require("../db");

/** Related functions for achievements. */

class Achievement {
  /** Create an achievement (from data), update db, return new achievement data.
 *
 * data should be { code, name, description }
 *
 * Returns { code, name, description }
 **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO achievements (code,
                                    name,
                                    description)
            VALUES ($1, $2, $3)
            RETURNING code, name, description`,
        [
          data.code,
          data.name,
          data.description,
        ]);
    let achievement = result.rows[0];

    return achievement;
  }

  /** Find all achievements.
   *
   * Returns [{ code, name, description }, ...]
   * */

  static async findAll() {
    let result = await db.query(`SELECT code,
                        name,
                        description
                 FROM achievements`);

    return result.rows;
  }
}

module.exports = Achievement;