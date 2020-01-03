const axios = require("axios");
const { dbUrl } = require("../config");
const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub();
const userAdded = "userAdded";

const TOPIC = "infoTopic";

const infos = ["info1", "info2", "info3", "done"];

const publish = () => {
  setTimeout(
    () => infos.forEach(info => pubsub.publish(TOPIC, { info })),
    1000
  );
};

const resolvers = {
  Subscription: {
    userAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([userAdded])
    },
    info: {
      subscribe: () => pubsub.asyncIterator([TOPIC])
    }
  },
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
    },
    go: () => {
      publish();
      return "going";
    }
  },
  Mutation: {
    addUser: (_pv, args) => {
      pubsub.publish(userAdded, { userAdded: args });
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
