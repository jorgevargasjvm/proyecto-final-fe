import React from "react";
import {useTheme} from "@material-ui/styles";
import {Bar, BarChart} from "recharts";

// styles
import useStyles from "../BigStat/styles";

// components
import Widget from "../../../../../components/Admin/Widget";
import {Typography} from "../../../../../components/Admin/Wrappers";
import WidgetHeader from "./WidgetHeader";

export default function AllProducts({title, total, color, profit, profitValue}) {
    color = color ? color : "primary";
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Widget
            header={<WidgetHeader title={title}/>}
            upperTitle
            bodyClass={classes.bodyWidgetOverflow}>
            <div className={classes.totalValueContainer}>
                <div className={classes.totalValue}>
                    <Typography size="xxl" color="text" colorBrightness="secondary">
                        {total}
                    </Typography>
                    <Typography color={profit ? "success" : "secondary"}>
                        &nbsp;{profit ? "+" : "-"}
                        {profitValue}%
                    </Typography>
                </div>
                <BarChart width={150} height={70} data={getRandomData()}>
                    <Bar
                        dataKey="value"
                        fill={theme.palette[color].main}
                        radius={10}
                        barSize={10}
                    />
                </BarChart>
            </div>
        </Widget>
    );
}

// #######################################################################

function getRandomData() {
    return Array(7)
        .fill()
        .map(() => ({value: Math.floor(Math.random() * 10) + 1}));
}
