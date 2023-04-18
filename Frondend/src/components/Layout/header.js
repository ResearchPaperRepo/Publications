import Link from "next/link";
import classes from "./header.module.css";
import { useState } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/home">Home</Link>
      </div>
      <nav>
        {isLoggedIn && (
          <ul>
            <li>
              <Link href="/publications">Publications</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <button
                type="button"
                className={classes.button}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
