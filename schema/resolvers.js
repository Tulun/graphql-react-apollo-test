const axios = require("axios");
const { dbUrl } = require("../config");
const resolvers = {
  Query: {
    users: () => {
      return axios
        .get(`${dbUrl}/users`)
        .then(res => {
          console.log(res);
          return res.data;
        })
        .catch(err => {
          console.log("err", err, err.message);
        });
    }
  }
};

module.exports = resolvers;
