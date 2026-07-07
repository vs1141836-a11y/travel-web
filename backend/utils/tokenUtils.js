import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const setTokenCookies = (res, accessToken, refreshToken) => {
  // Access token cookie (expires in 15 minutes)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 mins in ms
  });

  // Refresh token cookie (expires in 7 days)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });
};

export const clearTokenCookies = (res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
