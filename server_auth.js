import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import returnOnError from "./middlewares/validators/api/apiValidation.js";
import { connection } from './connection.js'

const env = dotenv.config().parsed;
const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: env.BASE_FRONTEND_URL
}));
import authController from "./controllers/api/AuthController.js";
import authValiation from "./middlewares/validators/api/auth.js";

const baseRoute = "/api/auth/";

app.post(
  baseRoute + "register",
  authValiation.register,
  returnOnError,
  authController.register
);

app.post(
  baseRoute + "is-email-exist",
  authValiation.isEmailExist,
  authController.isEmailExist
);

/**
 * Login
 *
 * Logged-in the user
 *
 * If success, user will get access-token and refresh token with 200 http response code.
 *
 * @bodyParam {string} username required The username of the user. Example: ihza
 * @bodyParam {string} password required The password of the user. Example: 123
 * 
 * @response 200 scenario="Login Success" {
                                              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImloemEiLCJpZCI6MywiaWF0IjoxNjYwNjI1NTM0LCJleHAiOjE2NjA3MzM1MzR9.zGIOgWunvR58DBYnl5cGPZ64tvCEUFzxDLXdtpPo7J8",
                                              "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImloemEiLCJpZCI6MywiaWF0IjoxNjYwNjI1NTM0fQ.AzUYTwQD-xvPjEofszQnDb-nYtDwBiDXu8vo203Cyug",
                                              "username": "ihza",
                                              "message": "Login Success!"
                                            }
 * @responseField access_token The token used for each request in header.
 * @responseField refresh_token The token that used for refresh access_token if expired.
 */
app.post(baseRoute + "login",
  authValiation.login,
  returnOnError,
  authController.login);

/**
 * Refresh Token
 *
 * Refresh access token if expired
 *
 * If success, user will get new access-token with 200 http response code.
 *
 * @bodyParam {string} refresh_token required The refresh token of the user. Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * 
 * @response 200 scenario="Success" {
                                      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjYwNjI0NzMxLCJleHAiOjE2NjA3MzI3MzF9.1JnasxRa6hyW4ZAu_qH0M-3EOv33S8L5HuNSvIamxMM"
                                    }
 * @responseField access_token The token used for each request in header.
 */
app.post(baseRoute + "refresh-token", authController.refresh_token);

/**
 * Logout
 *
 * Logout the user
 *
 * @bodyParam {string} refresh_token required The refresh token of the user. Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * 
 * @response 204 scenario="Success"
 */
app.delete(baseRoute + "logout", authController.logout);

connection().then(() => {
  app.listen(env.SERVER_AUTH_PORT, () => {
    console.log("Auth server running in port: " + env.SERVER_AUTH_PORT);
  });
});
