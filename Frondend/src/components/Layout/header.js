import Link from "next/link";
import classes from "./header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Publications</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/add-new-publication">Add New Publication</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
