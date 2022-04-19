import "dotenv/config";

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import ExpressConfig from "./utils/expressConfig";

const port = process.env.PORT;
const app = ExpressConfig.app;

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start().then(() => {
  server.applyMiddleware({ app });
  httpServer.listen(port, () => {
    console.log(
      `🚀 Server is now running on http://localhost:${port}${server.graphqlPath}`
    );
  });
});
