import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import * as resolvers from "./resolvers";
import NPS_API from "./dataSources";
import DataLoader from "dataloader";

const npsAPI = new NPS_API();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ npsAPI }),
  context: ({ req }) => {
    const api_key = (req.headers && req.headers.authorization) || "";
    const parksLoader = new DataLoader(npsAPI.parksLoaderFunction(api_key));
    const campgroundsLoader = new DataLoader(
      npsAPI.campgroundsLoaderFunction(api_key)
    );

    return { api_key, parksLoader, campgroundsLoader };
  },
  playground: true
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Graphql Server listening on ${url}`));
