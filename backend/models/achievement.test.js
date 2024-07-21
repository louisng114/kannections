"use strict";

const Achievement = require("./achievement.js");
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

/************************************** create */

describe("create", function () {
  let newAchievement = {
    code: "new",
    name: "New1",
    description: "Desc1"
  };

  test("works", async function () {
    let achievement = await Achievement.create(newAchievement);
    expect(achievement).toEqual(newAchievement);
  });
});

/************************************** findAll */

describe("findAll", function () {
    test("works", async function () {
      let achievements = await Achievement.findAll();
      expect(achievements).toEqual([
        {
            code: "a1",
            name: "A1",
            description: "Desc1",
        },
        {
            code: "a2",
            name: "A2",
            description: "Desc2",
        },
      ]);
    });
  });