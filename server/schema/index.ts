import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "apollo-server-express";

import Timer from "./package/Timer";

const initialDefaultTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _null: Boolean
  }
  type Subscription {
    _null: Boolean
  }
`;

const typeDefs = [initialDefaultTypeDefs, Timer.typeDefs];
const resolvers = [Timer.resolvers];

export default makeExecutableSchema({ typeDefs, resolvers });
