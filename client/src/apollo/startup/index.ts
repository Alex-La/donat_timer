import { ApolloClient, from, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import cache from "./cache";

const APOLLO_API_URL = process.env.APOLLO_API_URL!!;
const APOLLO_SUBSCRIPTIONS_URL = process.env.APOLLO_SUBSCRIPTIONS_URL!!;

const httpLink = new HttpLink({
  uri: APOLLO_API_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({ url: APOLLO_SUBSCRIPTIONS_URL })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
export const client = new ApolloClient({
  link: from([splitLink]),
  cache,
});
