import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import env from "./config/env.js";
import passport from "./config/passport.js";
import session from "express-session"

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// end-point

app.use("/api/auth", authRouter);

// start server and conntected Db
connectDb();
app.listen(port, () => {
  console.log(`Server is connected on port ${port}`);
});
