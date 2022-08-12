import React, { useState } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

import styles from "./UserForm.module.css";
import Wrapper from "../Helpers/Wrapper";

const UserForm = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUserAge, setEnteredUserAge] = useState("");
  const [error, setError] = useState("");

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      enteredUsername.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age",
      });
    } else if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0)",
      });
    } else {
      props.onAddUser(enteredUsername, enteredUserAge);
      setEnteredUsername("");
      setEnteredUserAge("");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error &&
        ReactDOM.createPortal(
          <Modal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />,
          document.getElementById("modal-root")
        )}
      <Card className={styles.input}>
        <form onSubmit={submitHandler}>
          <label>Username</label>
          <input
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label>Age (Years)</label>
          <input
            type="number"
            onChange={ageChangeHandler}
            value={enteredUserAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default UserForm;
