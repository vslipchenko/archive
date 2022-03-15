import React from "react";
import {
	BrowserRouter,
	Switch,
	Route
} from "react-router-dom";
import "./app.scss";

import {Home} from "./pages/home/home";
import {Login} from "./pages/login/login";
import {Register} from "./pages/register/register";
import {NotFound} from "./pages/not-found/not-found";

export const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

