import React from "react";
import {Route, Switch, withRouter,} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {useLayoutState} from "../../../context/LayoutContext";
import {EVENTS, NOTIFICATIONS, STATISTICS, USERS} from "../../../routes/paths";
import DashboardPage from "../../../pages/Admin/Dashboard";
import UsersPage from "../../../pages/Admin/Users";
import EventsPage from "../../../pages/Admin/Events";
import NotificationsPage from "../../../pages/Admin/Notifications";

function Layout(props) {
    const classes = useStyles();
    const layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <>
                <Header history={props.history}/>
                <Sidebar/>
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.fakeToolbar}/>
                    <Switch>
                        <Route exact path={STATISTICS} component={DashboardPage}/>
                        <Route exact path={USERS} component={UsersPage}/>
                        <Route exact path={EVENTS} component={EventsPage}/>
                        <Route exact path={NOTIFICATIONS} component={NotificationsPage}/>
                    </Switch>
                </div>
            </>
        </div>
    );
}

export default withRouter(Layout);
