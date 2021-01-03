import React, {useState} from "react";
import {useTheme} from "@material-ui/styles";
import {Bar, BarChart} from "recharts";

// styles
import useStyles from "../BigStat/styles";

// components
import Widget from "../../../../../components/Admin/Widget";
import {Typography} from "../../../../../components/Admin/Wrappers";
import WidgetHeader from "./WidgetHeader";

export default function AllProducts({title, total, color}) {
    color = color ? color : "primary";
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState("daily");

    return (
        <Widget
            header={<WidgetHeader title={title} value={value} setValue={setValue}/>}
            upperTitle
            bodyClass={classes.bodyWidgetOverflow}>
            <div className={classes.totalValueContainer}>
                <div className={classes.totalValue}>
                    <Typography size="xxl" color="text" colorBrightness="secondary">
                        {total[value]}
                    </Typography>
                    <Typography color={total.percent.profit ? "success" : "secondary"}>
                        &nbsp;{total.percent.profit ? "+" : "-"}
                        {total.percent.value}%
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
            {/*<div className={classes.bottomStatsContainer}>*/}
            {/*    <div className={classnames(classes.statCell, classes.borderRight)}>*/}
            {/*        <Grid container alignItems="center">*/}
            {/*            <Typography variant="h6">{registrations[value].value}</Typography>*/}
            {/*            <ArrowForwardIcon*/}
            {/*                className={classnames(classes.profitArrow, {*/}
            {/*                    [!registrations[value].profit]: classes.profitArrowDanger,*/}
            {/*                })}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*        <Typography size="sm" color="text" colorBrightness="secondary">*/}
            {/*            Registrations*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*    <div className={classes.statCell}>*/}
            {/*        <Grid container alignItems="center">*/}
            {/*            <Typography variant="h6">{bounce[value].value}%</Typography>*/}
            {/*            <ArrowForwardIcon*/}
            {/*                className={classnames(classes.profitArrow, {*/}
            {/*                    [!registrations[value].profit]: classes.profitArrowDanger,*/}
            {/*                })}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*        <Typography size="sm" color="text" colorBrightness="secondary">*/}
            {/*            Bounce Rate*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*    <div className={classnames(classes.statCell, classes.borderRight)}>*/}
            {/*        <Grid container alignItems="center">*/}
            {/*            <Typography variant="h6">*/}
            {/*                {registrations[value].value * 10}*/}
            {/*            </Typography>*/}
            {/*            <ArrowForwardIcon*/}
            {/*                className={classnames(classes.profitArrow, {*/}
            {/*                    [classes.profitArrowDanger]: !registrations[value].profit,*/}
            {/*                })}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*        <Typography size="sm" color="text" colorBrightness="secondary">*/}
            {/*            Views*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Widget>
    );
}

// #######################################################################

function getRandomData() {
    return Array(7)
        .fill()
        .map(() => ({value: Math.floor(Math.random() * 10) + 1}));
}
