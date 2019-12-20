import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// import fetchUsers from "../../queries/fetchUsers";

// import "./AddUserForm.scss";

// const ADD_USER = gql`
//   mutation AddUser($firstName: String!, $age: Int) {
//     addUser(firstName: $firstName, age: $age) {
//       id
//       firstName
//       age
//     }
//   }
// `;

const EditUserForm = ({ currentAge, currentFirstName }) => {
  const [firstName, setFirstName] = useState(currentFirstName);
  const [age, setAge] = useState(currentAge);

  // // Update the cache when you create a new user
  // const [addUser] = useMutation(ADD_USER, {
  //   update(cache, { data: { addUser } }) {
  //     const { users } = cache.readQuery({ query: fetchUsers });
  //     cache.writeQuery({
  //       query: fetchUsers,
  //       data: { users: users.concat([addUser]) }
  //     });
  //   }
  // });

  const onSubmit = event => {
    event.preventDefault();
    console.log(firstName, age);
    const ageValue = age;
    // addUser({ variables: { firstName, age: parseInt(ageValue) } });
    // setFirstName("");
    // setAge();
  };

  return (
    <form className="form" onSubmit={event => onSubmit(event)}>
      <h3>Edit User</h3>
      <label className="label">First Name</label>
      <input
        className="input"
        type="text"
        onChange={event => setFirstName(event.target.value)}
        value={firstName}
      />
      <label className="label">Age</label>
      <input
        className="input"
        type="number"
        onChange={event => setAge(event.target.value)}
        value={age}
      />
      <button className="button" onClick={event => onSubmit(event)}>
        Submit
      </button>
    </form>
  );
};

export default EditUserForm;
