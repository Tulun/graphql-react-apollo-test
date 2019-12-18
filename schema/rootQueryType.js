// Dependencies
const axios = require("axios");
const graphql = require("graphql");

// Types
const UserType = require("./userType");
const PostType = require("./postType");

// config
const { dbUrl } = require("../config");
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
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return axios.get(`${dbUrl}/posts`).then(res => res.data);
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve: (_pv, args) => {
        return axios.get(`${dbUrl}/posts/${args.id}`).then(res => res.data);
      }
    }
  })
});

module.exports = RootQuery;
