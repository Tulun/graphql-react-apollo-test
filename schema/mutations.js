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
const { dbUrl } = require("../config");

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
    }
    // addLyricToSong: {
    //   type: SongType,
    //   args: {
    //     content: { type: GraphQLString },
    //     songId: { type: GraphQLID }
    //   },
    //   resolve(parentValue, { content, songId }) {
    //     return Song.addLyric(songId, content);
    //   }
    // },
    // likeLyric: {
    //   type: LyricType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Lyric.like(id);
    //   }
    // },
    // deleteSong: {
    //   type: SongType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Song.remove({ _id: id });
    //   }
    // }
  }
});

module.exports = mutation;
