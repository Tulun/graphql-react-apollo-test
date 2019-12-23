// Dependencies
const axios = require("axios");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = graphql;
const { dbUrl } = require("../../config");

// Types
const UserType = require("./userType");
const PostType = require("./postType");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(_pv, args) {
        return axios.post(`${dbUrl}/users`, args).then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(pv, { id }) {
        return axios.delete(`${dbUrl}/users/${id}`).then(res => res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(_pv, { id, firstName, age }) {
        return axios
          .patch(`${dbUrl}/users/${id}`, { firstName, age })
          .then(res => res.data);
      }
    },
    addPost: {
      type: PostType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_pv, args) {
        return axios
          .post(`${dbUrl}/posts`, { ...args, likes: 0 })
          .then(res => res.data);
      }
    }
  }
});

module.exports = mutation;
