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

      const result = await db.query(
          'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id',
          [email, hashedPassword, username]
      );

      const token = jwt.sign(
          { id: result.rows[0].id, email, username },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: { id: result.rows[0].id, email, username },
      });
    } catch (error) {
      console.log(error);
      if (error.code === '23505') { // Unique violation in PostgreSQL
        return res.status(409).json({ message: "Email already exists" });
      }
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

      const result = await db.query(
          'SELECT * FROM users WHERE email = $1',
          [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result.rows[0];
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