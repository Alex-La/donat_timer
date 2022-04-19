import "dotenv/config";

import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import cors from "cors";
import expressStaticGzip from "express-static-gzip";
import path from "path";

const port = process.env.PORT;

async function startServer() {
  try {
    const server = new ApolloServer({
      typeDefs: gql`
        type Query {
          hello: String
        }
      `,
    });
    await server.start();

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

    server.applyMiddleware({ app });

    await new Promise<void>((resolve) => app.listen({ port }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

startServer();
