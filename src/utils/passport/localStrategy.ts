import { Strategy } from "passport-local";
import { Store } from "../store";
import bcrypt from "bcrypt";

const localStrategy = (store: Store): Strategy => {
  const strategy = new Strategy(
    {
      usernameField: "login",
      passwordField: "password",
    },
    async (login, password, done) => {
      const user = await store.userRepo.findOne({ where: { login } });
      const message = "Wrong login or password!";

      if (!user) return done(null, null, { message });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, null, { message });

      return done(null, user);
    }
  );

  return strategy;
};

export default localStrategy;
