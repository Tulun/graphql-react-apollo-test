// Dependencies
const axios = require("axios");
const graphql = require("graphql");

// Types
const UserType = require("./userType");

// config
const dbUrl = "http://localhost:3000";
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(_pv, args) {
        return axios.get(`${dbUrl}/users/${args.id}`).then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return axios.get(`${dbUrl}/users`).then(res => res.data);
      }
    }
  })
});

module.exports = RootQuery;
