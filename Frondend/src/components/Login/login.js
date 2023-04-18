import { useRouter } from "next/router";
import Card from "../UI/Card";
import useInput from "../hooks/use-input";
import classes from "./login.module.css";

function Login() {
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
      ) &&
      value.endsWith("ttu.edu")
  );

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueInputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.trim().length >= 6);
  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailInputClass = emailInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const passwordInputClass = passwordInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  console.log(
    emailInputHasError,
    passwordInputHasError,
    emailInputClass,
    passwordInputClass
  );
  const formLoginHandler = (event) => {
    event.preventDefault();

    if (!enteredPasswordIsValid || !enteredEmailIsValid) {
      return;
    }

    localStorage.setItem("publications_email_id", enteredEmail);
    useRouter.push("/home");

    resetPasswordInput();
    resetEmailInput();
  };
  return (
    <Card classes={classes.bgImage}>
      <p className={classes.welcome_text}>
        Welcome back, Please login to view the content
      </p>
      <form className={classes.form} onSubmit={formLoginHandler}>
        <div className={classes.form_grid}>
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
            {emailInputHasError && (
              <p className={classes.error_text}>
                Please enter a valid input email ( ttu email id )
              </p>
            )}
          </div>
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
          <div className={classes.input_div}>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              className={passwordInputClass}
              required
            />
            {passwordInputHasError && (
              <p className={classes.error_text}>
                Please enter a valid password ( minimum 6 digits )
              </p>
            )}
          </div>

          <button className={classes.button}>Login</button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
