import rateLimit from "express-rate-limit";

export const generalLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min in ms
  max: 100,
  message: { message: "Too many requests" },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many requests" },
});

export const redisLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests" },
});
