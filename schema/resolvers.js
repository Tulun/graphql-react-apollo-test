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
    posts: () => {
      return axios.get(`${dbUrl}/posts`).then(res => res.data);
    }
  }
};

module.exports = resolvers;
