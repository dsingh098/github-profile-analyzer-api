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
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`
        const avatar = profile.photos?.[0]?.value || ""

        let user = await User.findOne({ email })

        if (user) {
          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName || profile.username,
          email,
          avatar,
          authProvider: "github",
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);


passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport;