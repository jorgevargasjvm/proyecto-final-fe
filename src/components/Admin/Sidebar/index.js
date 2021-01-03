import React, {useEffect, useState} from "react";
import {Drawer, IconButton, List} from "@material-ui/core";
import {
    ArrowBack as ArrowBackIcon,
    HelpOutline as FAQIcon,
    LibraryBooks as LibraryIcon,
    Loyalty,
    QuestionAnswer as SupportIcon,
    Timeline,
} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import {useTheme} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {toggleSidebar, useLayoutDispatch, useLayoutState,} from "../../../context/LayoutContext";
import {EVENTS, NOTIFICATIONS, ROOT, STATISTICS, USERS} from "../../../routes/paths";

const structure = [
    {
        id: 0,
        label: "Home",
        link: ROOT,
        icon: <HomeIcon/>
    },
    {
        id: 1,
        label: "Estadísticas",
        link: STATISTICS,
        icon: <Timeline/>
    },
    {
        id: 2,
        label: "Usuarios",
        link: USERS,
        icon: <PeopleAltIcon/>
    },
    {
        id: 3,
        label: "Notificaciones",
        link: NOTIFICATIONS,
        icon: <NotificationsIcon/>
    },
    {
        id: 4,
        label: "Eventos",
        link: EVENTS,
        icon: <Loyalty/>
    },
];

function Layout({location}) {
    const classes = useStyles();
    const theme = useTheme();
    const {isSidebarOpened} = useLayoutState();
    const layoutDispatch = useLayoutDispatch();
    const [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar}/>
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(classes.headerIcon, classes.headerIconCollapse),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        const windowWidth = window.innerWidth;
        const breakpointWidth = theme.breakpoints.values.md;
        const isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

export default withRouter(Layout);
