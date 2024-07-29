"use strict";

/** Express app for KANnections. */

const express = require("express");
const cors = require("cors");
const axios = require('axios');

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const achievementsRoutes = require("./routes/achievements");

const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

// set up cors for API proxy
const corsOptions = {
  origin: `${allowedOrigin}`,
  methods: 'GET, PATCH, POST',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/achievements", achievementsRoutes);

// Proxy endpoint using axios
app.use('/api/v1/kanji', async (req, res) => {
  try {
    const apiUrl = new URL('http://ec2-13-60-36-124.eu-north-1.compute.amazonaws.com/api/v1/kanji?size=3000');
    const response = await axios.get(apiUrl.href, {
      responseType: 'json', // Changed from 'stream' to 'json'
      params: req.query
    });

    res.status(200).json(response.data); // Send the JSON data directly
  } catch (error) {
    console.error("Error proxying request:", error.message);
    res.status(500).json({ error: 'Error proxying request' });
  }
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;