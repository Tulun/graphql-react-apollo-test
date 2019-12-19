import React, { useState } from "react";

import "./AddUserForm.scss";

const AddUserForm = () => {
  const [firstName, setFirstname] = useState("");
  const [age, setAge] = useState(0);

  const onSubmit = event => {
    event.preventDefault();
    console.log(firstName, age);
  };

  return (
    <form className="form" onSubmit={event => onSubmit(event)}>
      <h3>Add User</h3>
      <label className="label">First Name (required)</label>
      <input
        className="input"
        type="text"
        onChange={event => setFirstname(event.target.value)}
        value={firstName}
      />
      <label className="label">Age (optional)</label>
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

export default AddUserForm;
