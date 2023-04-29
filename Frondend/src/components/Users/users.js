import classes from "./users.module.css";
import { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import useInput from "../hooks/use-input";
import { BallTriangle } from "react-loader-spinner";

function UsersList() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [addedUser, setAddedUser] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("publications_token");
    const email = sessionStorage.getItem("publications_email");
    if (token && email === "ssaikuma@ttu.edu") {
      setLoggedIn(true);
    }
    const fetchUsers = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/access/registeredUsers",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setUsers(responseData["users"]);
    };

    fetchUsers().catch((error) => {
      console.log(error);
    });
  }, []);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueInputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      value.endsWith("ttu.edu")
  );

  const emailInputClass = emailInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const addUserHandler = async () => {
    const email = sessionStorage.getItem("publications_email");
    const token = sessionStorage.getItem("publications_token");
    const newUserData = { email: email, user_email: enteredEmail };
    console.log(newUserData);
    const response = await fetch(
      "http://localhost:5000/api/v1/access/addUser",
      {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    setAddedUser(true);
    fetchUsers().catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      {loggedIn && !users && (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={classes.spinner}
          wrapperStyle=""
          visible={true}
        />
      )}
      {loggedIn && users && (
        <Fragment>
          <div className={classes.add_user}>
            <label htmlFor="email" className={classes.label}>
              Email
            </label>
            <div className={classes.input_div}>
              <input
                type="email"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                className={emailInputClass}
                required
              />
            </div>
            <button className={classes.button} onClick={addUserHandler}>
              Add User
            </button>
          </div>
          {emailInputHasError && (
            <p className={classes.error_text}>
              Please enter a valid input email ( ttu email id )
            </p>
          )}
          {addedUser && <p>Added User successfully {enteredEmail}</p>}
          {loggedIn && (
            <table className={classes.table}>
              <thead>
                <tr className={classes.tr}>
                  <th className={classes.th}>Registered Users</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr className={classes.tr} key={user}>
                        <td className={classes.td}>{user}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </Fragment>
      )}
      {!loggedIn && <p>You are not authorized to view this page</p>}
    </>
  );
}

export default UsersList;
