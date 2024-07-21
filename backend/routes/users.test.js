"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("works for current user", async function () {
    const resp = await request(app)
        .get(`/users/u1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        totalWins: 0,
        perfectWins: 0,
        achievements: ["a1"],
      },
    });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
        .get(`/users/u2`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});

/**************************** PATCH /users/:username/gainwin */

describe("PATCH /users/u1/gainwin", function () {
  test("works for current user", async function () {
    const resp = await request(app)
        .patch("/users/u1/gainwin")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ totalWins: 1 });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .patch("/users/u2/gainwin")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch("/users/u1/gainwin");
    expect(resp.statusCode).toEqual(401);
  });
});

/*********************** PATCH /users/:username/gainperfectwin */

describe("PATCH /users/gainperfectwin", function () {
  test("works for current user", async function () {
    const resp = await request(app)
        .patch("/users/u1/gainperfectwin")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ perfectWins: 1 });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .patch("/users/u2/gainperfectwin")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch("/users/u1/gainperfectwin");
    expect(resp.statusCode).toEqual(401);
  });
});

/******************* POST /users/:username/achievements/:code */

describe("POST /users/:username/achievements/:code", function () {
  test("works for current user", async function () {
    const resp = await request(app)
        .post("/users/u1/achievements/a2")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ unlocked: "a2" });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .post("/users/u2/achievements/a2")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .post("/users/u1/achievements/a2");
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such achievement", async function () {
    const resp = await request(app)
        .post("/users/u1/achievements/everest")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});