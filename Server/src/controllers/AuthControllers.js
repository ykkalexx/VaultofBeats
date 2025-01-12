// @ts-nocheck
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export class AuthControllers {
  // function used to create a new account
  async register(req, res) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      const connection = await db.getConnection();

      const [result] = await connection.execute(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email, hashedPassword, username]
      );

      connection.release();

      const token = jwt.sign(
        { id: result.insertId, email, username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: { id: result.insertId, email, username },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // function used to login to an existing account
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const connection = await db.getConnection();
      const [users] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      connection.release();

      if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = users[0];
      const validPassword = await bcryptjs.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
