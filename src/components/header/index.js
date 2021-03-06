import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  BsClipboard,
  BsSearch,
  BsBookmarkCheck,
  BsWrench,
} from "react-icons/bs";

import { FirebaseContext } from "../../firebase";
import GC from "../../constants";
import Menu from "../menu";

import styles from "./index.module.css";

const Header = () => {
  // Preventing the reloading, every time when check currentUser
  const localUser = JSON.parse(localStorage.getItem("authUser"));
  const { currentUser } = useContext(FirebaseContext);
  const user = localUser ? localUser : currentUser;

  return (
    <Container fluid className={styles.header}>
      <Container>
        <Navbar collapseOnSelect expand="sm" className={styles.navbar}>
          <Navbar.Brand className={styles.brand} href="/">
            CarBay
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className={styles.navbar}>
            <Nav.Link href="/search" className={styles["nav-item"]}>
              <BsSearch className={styles["icon-item"]} />
              Търси
            </Nav.Link>
            {user && (
              <>
                {user.isAdmin && (
                  <Nav.Link
                    href={GC.ROUTES.ADMIN.PANEL}
                    className={styles["nav-item"]}
                  >
                    <BsWrench className={styles["icon-item"]} />
                    Администраторски панел
                  </Nav.Link>
                )}
                <Nav.Link
                  href={GC.ROUTES.USER.MYADS}
                  className={styles["nav-item"]}
                >
                  <BsClipboard className={styles["icon-item"]} />
                  Моите обяви
                </Nav.Link>
                <Nav.Link
                  href={GC.ROUTES.USER.FAVORITES}
                  className={styles["nav-item"]}
                >
                  <BsBookmarkCheck className={styles["icon-item"]} />
                  Бележник
                </Nav.Link>
              </>
            )}
            <Menu />
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container>
  );
};

export default Header;
