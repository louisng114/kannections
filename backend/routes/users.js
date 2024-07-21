"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

/** GET /:username => { user }
 *
   * Returns { username, totalWins, perfectWins, achievements }
   *   where achievements is { code }
 *
 * Authorization required: same user as :username
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** Patch /:username/gainwin  => { totalWins: totalWins }
 *
 * Authorization required: same user as :username
 * */

router.patch("/:username/gainwin", ensureCorrectUser, async function (req, res, next) {
  try {
    const totalWins = await User.gainWin(req.params.username);
    return res.json({ totalWins: totalWins });
  } catch (err) {
    return next(err);
  }
});

/** Patch /:username/gainperfectwin  => { perfectWins: perfectWins }
 *
 * Authorization required: same user as :username
 * */

router.patch("/:username/gainperfectwin", ensureCorrectUser, async function (req, res, next) {
  try {
    const perfectWins = await User.gainPerfectWin(req.params.username);
    return res.json({ perfectWins: perfectWins });
  } catch (err) {
    return next(err);
  }
});

/** POST /:username/achievement/:code  => { unlocked: code }
 *
 * Authorization required: same user as :username
 * */

router.post("/:username/achievements/:code", ensureCorrectUser, async function (req, res, next) {
  try {
    const achievementCode = req.params.code;
    await User.gainAchievement(req.params.username, achievementCode);
    return res.json({ unlocked: achievementCode });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;