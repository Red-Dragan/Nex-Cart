import React, { Fragment } from "react";
import { Outlet, useNavigation } from "react-router";
import Navigation from "../components/Navigation";
import styles from "../styles/Root.module.css";
import Loading from "../components/Loading";

const Root: React.FC = () => {
  const { state } = useNavigation();
  return (
    <Fragment>
      <Navigation />
      <main className={styles.mainContainer}>
        {state === "loading" ? <Loading variant={"bars"} text="Fetching products..."/> : <Outlet />}
      </main>
    </Fragment>
  );
};

export default Root;
