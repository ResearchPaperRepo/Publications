import { useRouter } from "next/router";
import Card from "../UI/Card";
import useInput from "../hooks/use-input";
import classes from "./register.module.css";

function Register() {
  const router = useRouter();

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
      )
    // && value.endsWith("ttu.edu")
  );

  const {
    value: enteredPassword1,
    isValid: enteredPasswordIsValid1,
    hasError: passwordInputHasError1,
    valueInputChangeHandler: passwordChangeHandler1,
    inputBlurHandler: passwordBlurHandler1,
    reset: resetPasswordInput1,
  } = useInput((value) => value.trim() !== "" && value.trim().length >= 6);

  const {
    value: enteredPassword2,
    isValid: enteredPasswordIsValid2,
    hasError: passwordInputHasError2,
    valueInputChangeHandler: passwordChangeHandler2,
    inputBlurHandler: passwordBlurHandler2,
    reset: resetPasswordInput2,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value.trim().length >= 6 &&
      enteredPassword1 === value.trim()
  );

  let formIsValid = false;

  if (
    enteredPasswordIsValid1 &&
    enteredPasswordIsValid2 &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const emailInputClass = emailInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const passwordInputClass1 = passwordInputHasError1
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const passwordInputClass2 = passwordInputHasError2
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const formLoginHandler = async (event) => {
    event.preventDefault();

    if (
      !enteredPasswordIsValid1 ||
      !enteredPasswordIsValid2 ||
      !enteredEmailIsValid
    ) {
      return;
    }

    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword1 }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(response.msg);
    }

    resetPasswordInput1();
    resetPasswordInput2();
    resetEmailInput();
    router.push("/login");
  };
  return (
    <Card classes={classes.bgImage}>
      <p className={classes.welcome_text}>
        Welcome back, Please register to view the content
      </p>
      <form className={classes.form} onSubmit={formLoginHandler}>
        <div className={classes.form_grid}>
          <label htmlFor="email" className={classes.label}>
            <b>Email</b>
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
            {emailInputHasError && (
              <p className={classes.error_text}>
                Please enter a valid input email
              </p>
            )}
          </div>
          <label htmlFor="password1" className={classes.label}>
            <b>Password</b>
          </label>
          <div className={classes.input_div}>
            <input
              type="password"
              id="password1"
              onChange={passwordChangeHandler1}
              onBlur={passwordBlurHandler1}
              value={enteredPassword1}
              className={passwordInputClass1}
              required
            />
            {passwordInputHasError1 && (
              <p className={classes.error_text}>
                Please enter a valid password ( minimum 6 digits )
              </p>
            )}
          </div>
          <label htmlFor="password2" className={classes.label}>
            <b>Repeat Password</b>
          </label>
          <div className={classes.input_div}>
            <input
              type="password"
              id="password2"
              onChange={passwordChangeHandler2}
              onBlur={passwordBlurHandler2}
              value={enteredPassword2}
              className={passwordInputClass2}
              required
            />
            {passwordInputHasError2 && (
              <p className={classes.error_text}>
                Please enter a password same as previous password
              </p>
            )}
          </div>

          <button className={classes.button}>Register</button>
        </div>
      </form>
    </Card>
  );
}

export default Register;
