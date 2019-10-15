"use strict";

var _apolloServer = require("apollo-server");

var _schema = _interopRequireDefault(require("./schema"));

var resolvers = _interopRequireWildcard(require("./resolvers"));

var _dataSources = _interopRequireDefault(require("./dataSources"));

var _dataloader = _interopRequireDefault(require("dataloader"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  if (obj != null) {
    var hasPropertyDescriptor =
      Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const npsAPI = new _dataSources.default();
const server = new _apolloServer.ApolloServer({
  typeDefs: _schema.default,
  resolvers,
  dataSources: () => ({
    npsAPI
  }),
  context: ({ req }) => {
    const api_key = (req.headers && req.headers.authorization) || "";
    const parksLoader = new _dataloader.default(
      npsAPI.parksLoaderFunction(api_key)
    );
    const campgroundsLoader = new _dataloader.default(
      npsAPI.campgroundsLoaderFunction(api_key)
    );
    return {
      api_key,
      parksLoader,
      campgroundsLoader
    };
  },
  playground: true
});
server
  .listen({
    port: process.env.PORT || 4000
  })
  .then(({ url }) => console.log(`Graphql Server listening on ${url}`));
