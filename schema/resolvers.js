const axios = require("axios");
const { dbUrl } = require("../config");
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
    }
  }
  // User: (_pv, args) => {
  //   return axios.get(`${dbUrl}/users/${args.id}`).then(res => res.data);
  // }
};

module.exports = resolvers;
