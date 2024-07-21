"use strict";

const request = require("supertest");

const app = require("../app");

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

/************************************** POST /achievements */

describe("POST /achievements", function () {
  test("works", async function () {
    const resp = await request(app)
        .post("/achievements")
        .send({
            code: "new",
            name: "New",
            description: "New desc",
        });
    expect(resp.statusCode).toEqual(201);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/achievements")
        .send({
            code: "new",
            name: "New",
        });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/achievements")
        .send({
            code: "new",
            name: 42,
            description: "New desc",
        });
    expect(resp.statusCode).toEqual(400);
  });

});

/************************************** GET /achievements */

describe("GET /achievements", function () {
  test("works", async function () {
    const resp = await request(app).get("/achievements");
    expect(resp.body).toEqual({
          achievements: [
            {
              code: "a1",
              name: "A1",
              description: "Desc1"
            },
            {
              code: "a2",
              name: "A2",
              description: "Desc2"
            },
            {
              code: "a3",
              name: "A3",
              description: "Desc3"
            },
          ],
        },
    );
  });
});
