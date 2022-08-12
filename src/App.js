import React, { useState } from "react";

import UserForm from "./components/Users/UserForm";
import UsersList from "./components/Users/UsersList";

import "./index.css";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (name, age) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          id: Math.random().toString(),
          name: name,
          age: age,
        },
      ];
    });
  };

  return (
    <>
      <UserForm onAddUser={addUserHandler} />
      {usersList.length > 0 && <UsersList users={usersList} />}
    </>
  );
}

export default App;
