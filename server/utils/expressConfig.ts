import express from "express";
import expressStaticGzip from "express-static-gzip";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(
    "/",
    expressStaticGzip(path.join("client", "build"), {
      enableBrotli: true,
      orderPreference: ["br", "gz"],
    })
  );
  app.get("*", (_, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.route("/").get((_, res) => res.send("🚀 Server ready!"));

export default { app };
