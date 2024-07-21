"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      username: "u1",
      totalWins: 10,
      perfectWins: 5,
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    totalWins: 0,
    perfectWins: 0,
  };
  
  test("works", async function () {
    let user = await User.register({
        username: "new",
        password: "password",
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        username: "new",
        password: "password",
      });
      await User.register({
        username: "new",
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.get("u1");
    expect(user).toEqual({
      username: "u1",
      totalWins: 10,
      perfectWins: 5,
      achievements: ["a1"]
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** gainWin */

describe("gainWin", function () {
  test("works", async function () {
    await User.gainWin("u1");

    const res = await db.query(
        "SELECT total_wins AS \"totalWins\" FROM users WHERE username='u1'");
    expect(res.rows).toEqual([{
      totalWins: 11,
    }]);
  });
});

/************************************** gainWin */

describe("gainPerfectWin", function () {
  test("works", async function () {
    await User.gainPerfectWin("u1");

    const res = await db.query(
        "SELECT perfect_wins AS \"perfectWins\" FROM users WHERE username='u1'");
    expect(res.rows).toEqual([{
      perfectWins: 6,
    }]);
  });
});

/************************************** gainAchievement */

describe("gainAchievement", function () {
  test("works", async function () {
    await User.gainAchievement("u1", "a2");

    const res = await db.query(
        "SELECT * FROM users_achievements WHERE username='u1'");
    expect(res.rows).toEqual([{
      username: "u1",
      code: "a1",
    }, {
      username: "u1",
      code: "a2",
    }]);
  });
});