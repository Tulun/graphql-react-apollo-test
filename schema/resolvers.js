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
    user: (_pv, { id }) => {
      console.log("_pv", _pv, "id", id);
      return axios
        .get(`${dbUrl}/users/${id}`)
        .then(res => {
          console.log("res", res);
          return res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    posts: () => {
      return axios
        .get(`${dbUrl}/posts`)
        .then(res => {
          console.log("res in posts", res);
          return res.data;
        })
        .catch(err => {
          console.log("err in posts", err);
        });
    },
    post: (_pv, { id }) => {
      return axios.get(`${dbUrl}/posts/${id}`).then(res => res.data);
    }
  },
  Mutation: {
    addUser: (_pv, args) => {
      return axios.post(`${dbUrl}/users`, args).then(res => res.data);
    },
    editUser: (_pv, { id, firstName, age }) => {
      return axios
        .patch(`${dbUrl}/users/${id}`, { firstName, age })
        .then(res => res.data);
    },
    deleteUser: (pv, { id }) => {
      return axios.delete(`${dbUrl}/users/${id}`).then(res => res.data);
    }
  }
};

module.exports = resolvers;
