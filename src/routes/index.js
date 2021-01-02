import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Layout from "../components/Admin/Layout";
import {useUserState} from "../context/UserContext";
import {ADMIN, ROOT, STATISTICS} from "./paths";
import HomePage from "../pages/Home";

export default function Router() {
    const {isAuthenticated, user, isAdmin} = useUserState();
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={ADMIN} render={() => <Redirect to={STATISTICS}/>}/>
                <PrivateRoute path={ADMIN} component={Layout}/>
                <PublicRoute path={ROOT} component={HomePage}/>
                <Route component={Error}/>
            </Switch>
        </BrowserRouter>
    );

    function PrivateRoute({component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated && isAdmin ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: ROOT,
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props => (
                    React.createElement(component, props)
                )
                }
            />
        );
    }
}
