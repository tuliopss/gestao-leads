import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link to='/'>{/* <img src='/logo.png' alt='logo-turbo' /> */}</Link>
      </div>
      <ul>
        <li>
          <Link to='/'>Atendimentos</Link>
        </li>
        <li>
          <Link to='/leads'>Leads</Link>
        </li>
        <li>
          <Link to='/salespersons'>Atendentes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
