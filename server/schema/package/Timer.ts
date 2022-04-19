import { gql } from "apollo-server-core";
import pubsub from "../../utils/pubsub";

const typeDefs = gql`
  extend type Query {
    initialTimerSettings: TimerSettings!
  }

  extend type Mutation {
    updateTimerSettings: String
  }
  extend type Subscription {
    onUpdateTimerSettings: TimerSettings
  }

  type TimerSettings {
    color: String
  }
`;

const resolvers = {
  Query: {
    initialTimerSettings: () => {
      return {
        color: "red",
      };
    },
  },
  Mutation: {
    updateTimerSettings: () => {
      pubsub.publish("SETTINGS_CHANGED", {
        onUpdateTimerSettings: {
          color: "red",
        },
      });
      return "Settings changed!";
    },
  },
  Subscription: {
    onUpdateTimerSettings: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["SETTINGS_CHANGED"]),
    },
  },
};

export default { typeDefs, resolvers };
