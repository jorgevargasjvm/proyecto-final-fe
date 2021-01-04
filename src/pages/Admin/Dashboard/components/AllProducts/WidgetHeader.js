import {Typography} from "../../../../../components/Admin/Wrappers";
import React from "react";
import useStyles from "../BigStat/styles";

export default function WidgetHeader({title}) {
    const classes = useStyles();
    return (
        <div className={classes.title}>
            <Typography variant="h5">{title}</Typography>
        </div>
    );
}