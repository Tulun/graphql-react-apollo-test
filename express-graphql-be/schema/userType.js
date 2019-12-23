const graphql = require("graphql");
// const PostType = require("./postType");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const { dbUrl } = require("../../config");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
    // posts: {
    //   type: new GraphQLList(PostType),
    // }
  })
});

module.exports = UserType;
