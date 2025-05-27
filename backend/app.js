import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const port = process.env.PORT || 3000;

import { insert, getUser, getAllUsers, login } from "./database.js";
import { loginSchema, registerSchema } from "./validators/users.validator.js";
import { generateToken } from "./utils/generateTokenFunc.js";
import { authenticate } from "./middleware/authenticate.js";
import redis from "redis";
import { redisClient, connectRedis } from "./config/redisClient.js";

// await connectRedis();
const app = express();
app.use(express.json());
app.use(cookieParser());

const refreshTokens = []; //locally storing refresh token

// Save refresh token with expiry

app.get("/getUsers", async (req, res) => {
  try {
    const result = await getAllUsers();
    if (!result || result.length === 0) {
      return res.status(400).send("Data not found");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getUser(id);
    if (!result || result.length === 0) {
      return res.status(400).send("Data not found");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const { name, email, password } = value;
    const result = await insert(name, email, password);
    console.log(result);
    res.status(201).send(result);
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { email, password } = value;
    const user = await login(email, password);
    if (user === null) {
      return res.status(400).send("Invalid Details");
    } else {
      const accessToken = generateToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});
      await redisClient.set(`refreshToken:${user.id}`, refreshToken, {
        EX: 7 * 24 * 60 * 60, // 7 days
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/token",
      });
      res.cookie("AccessToken", accessToken, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 1000, // 15 seconds for dev
        httpOnly: true,
      });

      res.status(200).json({
        message: "Login successful",
        user,
        Access_Token: accessToken,
        Refresh_Token: refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/token", async (req, res) => {
    const token = req.cookies.refresh_token;
    if (!token) return res.status(401).json({ message: 'Refresh token missing' });
  if (token === null) return res.sendStatus(401);
  try {
    const user = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );
     const storedRedisToken = await redisClient.get(`refreshToken:${user.id}`);

    if (storedRedisToken !== token) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    const newAccessToken = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      message: "refreshed",
    });
    res.cookie("AccessToken", newAccessToken, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 1000, // 15 seconds for dev
      httpOnly: true,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500);
  }
});

// Protected
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user, // user data decoded from token
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
