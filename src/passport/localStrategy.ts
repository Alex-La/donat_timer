import { Strategy } from "passport-local";

const localStrategy = new Strategy(
  {
    usernameField: "login",
    passwordField: "password",
  },
  (user, password, done) => {
    if (user !== "test_user")
      return done(null, false, {
        message: "User not found",
      });
    else if (password !== "test_password")
      return done(null, false, {
        message: "Wrong password",
      });

    return done(null, { id: 1, name: "Test", age: 21 });
  }
);

export default localStrategy;
