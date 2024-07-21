"use strict";

/** Routes for achievements. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Achievement = require("../models/achievement");
const achievementSchema = require("../schemas/achievement.json");

const router = express.Router();


/** POST / { achievement } => { achievement }
 *
 * achievement should be { code, name, description }
 */

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, achievementSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const achievement = await Achievement.create(req.body);
    return res.status(201).json({ achievement });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { achievements: [ { code, name, description }, ...] }
 */

router.get("/", async function (req, res, next) {
  try {
    const achievements = await Achievement.findAll();
    return res.json({ achievements });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;