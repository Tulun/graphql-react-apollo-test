import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// import fetchUsers from "../../queries/fetchUsers";

// import "./AddUserForm.scss";

const EDIT_USER = gql`
  mutation EditUser($id: String!, $firstName: String, $age: Int) {
    editUser(id: $id, firstName: $firstName, age: $age) {
      id
      firstName
      age
    }
  }
`;

const EditUserForm = ({ currentAge, currentFirstName, userId }) => {
  const [firstName, setFirstName] = useState(currentFirstName);
  const [age, setAge] = useState(currentAge);

  // Update the cache when you create a new user
  // const [addUser] = useMutation(ADD_USER, {
  //   update(cache, { data: { addUser } }) {
  //     const { users } = cache.readQuery({ query: fetchUsers });
  //     cache.writeQuery({
  //       query: fetchUsers,
  //       data: { users: users.concat([addUser]) }
  //     });
  //   }
  // });

  const [editUser] = useMutation(EDIT_USER);

  const onSubmit = event => {
    event.preventDefault();
    const ageValue = age;
    editUser({ variables: { id: userId, firstName, age: parseInt(ageValue) } });
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
