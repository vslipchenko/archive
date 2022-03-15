import React from "react";

// import "./home.scss";
// import {render} from "@testing-library/react";
import styles from "./home.module.scss";

export const Home = () => (
	<React.Fragment>
		<div className="page">
			<main className="main">
				<header className={`main__item header ${styles.header}`}>
					<button className="header__item login button button-primary">login</button>
					<button className="header__item register button button-primary">register</button>
				</header>
			</main>
		</div>
	</React.Fragment>
);