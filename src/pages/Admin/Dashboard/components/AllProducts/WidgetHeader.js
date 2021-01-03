import {Typography} from "../../../../../components/Admin/Wrappers";
import {Input, MenuItem, Select} from "@material-ui/core";
import React from "react";
import useStyles from "../BigStat/styles";

export default function WidgetHeader({title, value, setValue}){
    const classes = useStyles();
    return(
        <div className={classes.title}>
            <Typography variant="h5">{title}</Typography>
            <Select
                value={value}
                onChange={e => setValue(e.target.value)}
                input={
                    <Input
                        disableUnderline
                        classes={{input: classes.selectInput}}
                    />
                }
                className={classes.select}
            >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="year">Year</MenuItem>
            </Select>
        </div>
    );
}