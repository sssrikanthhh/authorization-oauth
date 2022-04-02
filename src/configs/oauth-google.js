const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user.models');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, cb) {

    let user = await User.findOne({
      email: profile?._json.email
    });
    if (!user) {
      user = await User.create({
        email: profile._json.email,
        password: uuidv4(),
        role: ['customer']
      });
    }
    return cb(err, user);
  }
));

module.exports = passport;