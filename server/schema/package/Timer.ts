import { gql } from "apollo-server-core";
import pubsub from "../../utils/pubsub";

const typeDefs = gql`
  extend type Query {
    initialTimer: Timer!
  }

  extend type Mutation {
    updateTimer: String
  }
  extend type Subscription {
    onUpdateTimer: Timer
  }

  type Timer {
    color: String
  }
`;

const resolvers = {
  Query: {
    initialTimer: () => {
      return {
        color: "red",
      };
    },
  },
  Mutation: {
    updateTimer: () => {
      pubsub.publish("TIMER_CHANGED", {
        onUpdateTimerSettings: {
          color: "red",
        },
      });
      return "Settings changed!";
    },
  },
  Subscription: {
    onUpdateTimer: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["TIMER_CHANGED"]),
    },
  },
};

export default { typeDefs, resolvers };
