import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutesdsa
  max: 5, // 5 attempts
  message: "Too many login attempts, please try again later",
});
