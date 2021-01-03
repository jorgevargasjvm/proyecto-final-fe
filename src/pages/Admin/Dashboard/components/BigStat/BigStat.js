import React, {useState} from "react";
import { Input, MenuItem, Select} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import {Bar, BarChart} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../../components/Admin/Widget";
import {Typography} from "../../../../../components/Admin/Wrappers";

export default function BigStat(props) {
    let { product, total, color } = props;
    let classes = useStyles();
    let theme = useTheme();

    // local
    let [value, setValue] = useState("daily");

    return (
        <Widget
            header={
                <div className={classes.title}>
                    <Typography variant="h5">{product}</Typography>

                    <Select
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        input={
                            <Input
                                disableUnderline
                                classes={{ input: classes.selectInput }}
                            />
                        }
                        className={classes.select}
                    >
                        <MenuItem value="daily">Diario</MenuItem>
                        <MenuItem value="weekly">Semanal</MenuItem>
                        <MenuItem value="monthly">Mensual</MenuItem>
                    </Select>
                </div>
            }
            upperTitle
            bodyClass={classes.bodyWidgetOverflow}
        >
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
        </Widget>
    );
}

// #######################################################################

function getRandomData() {
    return Array(7)
        .fill()
        .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
