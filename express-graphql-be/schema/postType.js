// Dependencies
const axios = require("axios");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// config
const { dbUrl } = require("../../config");

// Types
const UserType = require("./userType");
const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: GraphQLString },
    content: { type: GraphQLString },
    likes: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve: pv => {
        return axios.get(`${dbUrl}/users/${pv.userId}`).then(res => res.data);
      }
    }
  })
});

module.exports = PostType;
