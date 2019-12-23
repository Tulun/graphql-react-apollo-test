const axios = require("axios");
const { dbUrl } = require("../config");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: () => {
      return axios
        .get(`${dbUrl}/users`)
        .then(res => res.data)
        .catch(err => {
          console.log("err", err, err.message);
        });
    },
    user: (_pv, args) => {
      return axios.get(`${dbUrl}/users/${args.id}`).then(res => res.data);
    },
    posts: () => {
      return axios.get(`${dbUrl}/posts`).then(res => res.data);
    },
    post: (_pv, args) => {
      return axios.get(`${dbUrl}/posts/${args.id}`).then(res => res.data);
    }
  },
  Mutation: {
    addUser: (_pv, args) => {
      return axios.post(`${dbUrl}/users`, args).then(res => res.data);
    }
  }
};

module.exports = resolvers;
