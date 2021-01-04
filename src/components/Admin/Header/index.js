import React, {useState} from "react";
import {AppBar, IconButton, Menu, Toolbar,} from "@material-ui/core";
import {
    ArrowBack as ArrowBackIcon,
    Menu as MenuIcon,
    Person as AccountIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./style";
import { Typography} from "../Wrappers";

import {toggleSidebar, useLayoutDispatch, useLayoutState,} from "../../../context/LayoutContext";
import {useUserDispatch, useUserState} from "../../../context/UserContext";
import {signOut} from "../../../service/API";



export default function Header(props) {
    let {loggedUser} = useUserState();
    if (loggedUser)
        loggedUser = JSON.parse(loggedUser);
    const classes = useStyles();

    const layoutState = useLayoutState();
    const layoutDispatch = useLayoutDispatch();
    const userDispatch = useUserDispatch();

    const [profileMenu, setProfileMenu] = useState(null);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    onClick={() => toggleSidebar(layoutDispatch)}
                    className={classNames(
                        classes.headerMenuButtonSandwich,
                        classes.headerMenuButtonCollapse,
                    )}
                >
                    {layoutState.isSidebarOpened ? (
                        <ArrowBackIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    ) : (
                        <MenuIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    )}
                </IconButton>
                <Typography variant="h6" weight="medium" className={classes.logotype}>
                    Panel de administrador

                </Typography>
                <div className={classes.grow}/>

                <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuButton}
                    aria-controls="profile-menu"
                    onClick={e => setProfileMenu(e.currentTarget)}
                >
                    <AccountIcon classes={{root: classes.headerIcon}}/>
                </IconButton>


                <Menu
                    id="profile-menu"
                    open={Boolean(profileMenu)}
                    anchorEl={profileMenu}
                    onClose={() => setProfileMenu(null)}
                    className={classes.headerMenu}
                    classes={{paper: classes.profileMenu}}
                    disableAutoFocusItem
                >
                    <div className={classes.profileMenuUser}>
                        <Typography variant="h4" weight="medium">
                            {loggedUser?.name}
                        </Typography>
                    </div>
                    <div className={classes.profileMenuUser}>
                        <Typography
                            className={classes.profileMenuLink}
                            color="primary"
                            onClick={() => signOut(userDispatch, props.history)}
                        >
                            Desconectar
                        </Typography>
                    </div>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
