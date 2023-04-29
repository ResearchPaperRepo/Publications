import Link from "next/link";
import classes from "./header.module.css";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

function Header() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const logoutHandler = () => {
    sessionStorage.removeItem("publications_token");
    sessionStorage.removeItem("publications_email");
    setLoggedIn(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Home</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/publications">Publications</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          {loggedIn && (
            <li>
              <Link href="/users">Users</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <button
                type="button"
                className={classes.button}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
