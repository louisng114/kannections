"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Achievement = require("../models/achievement");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM achievements");
  await db.query("DELETE FROM users_achievements");

  await Achievement.create(
    { code: "a1",
      name: "A1",
      description: "Desc1" });
  await Achievement.create(
    { code: "a2",
      name: "A2",
      description: "Desc2" });
  await Achievement.create(
    { code: "a3",
      name: "A3",
      description: "Desc3" });

  await User.register({
    username: "u1",
    password: "password1",
  });
  await User.register({
    username: "u2",
    password: "password2",
  });
  await User.register({
    username: "u3",
    password: "password3",
  });

  await User.gainAchievement("u1", "a1");
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


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
};