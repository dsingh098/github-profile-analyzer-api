import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import env from "./env.js";
import User from "../models/user.model.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName || profile.username,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          authProvider: "github",
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
