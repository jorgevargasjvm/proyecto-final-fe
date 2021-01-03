import React, {useState} from "react";
import {Grid, LinearProgress} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import {Line, LineChart,} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../../components/Admin/Widget";
import PageTitle from "../../../components/PageTitle";
import {Typography} from "../../../components/Admin/Wrappers";
import {LargeDot} from "../../../components/Dot";
import BigStat from "./components/BigStat/BigStat";

const TABS = {
    today: 0,
    week: 1,
    month: 2,
    year: 3
};

export default function DashboardPage(props) {
    const [selectedTab, setSelectedTab] = useState(TABS.today);
    const classes = useStyles();
    const theme = useTheme();

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    }
    return (
        <>
            <PageTitle title="Index" showTabs={true} handleChangeTab={handleChangeTab} selectedTab={selectedTab}/>
            <Grid container spacing={4}>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        title="Visits Today"
                        upperTitle
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                    >
                        <div className={classes.visitsNumberContainer}>
                            <Grid container item alignItems={"center"}>
                                <Grid item xs={6}>
                                    <Typography size="xl" weight="medium" noWrap>
                                        12, 678
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <LineChart
                                        width={100}
                                        height={30}
                                        data={[
                                            {value: 10},
                                            {value: 15},
                                            {value: 10},
                                            {value: 17},
                                            {value: 18},
                                        ]}
                                    >
                                        <Line
                                            type="natural"
                                            dataKey="value"
                                            stroke={theme.palette.success.main}
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item xs={4}>
                                <Typography color="text" colorBrightness="secondary" noWrap>
                                    Registrations
                                </Typography>
                                <Typography size="md">860</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="text" colorBrightness="secondary" noWrap>
                                    Sign Out
                                </Typography>
                                <Typography size="md">32</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="text" colorBrightness="secondary" noWrap>
                                    Rate
                                </Typography>
                                <Typography size="md">3.25%</Typography>
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                    <Widget
                        title="App Performance"
                        upperTitle
                        className={classes.card}
                        bodyClass={classes.fullHeightBody}
                    >
                        <div className={classes.performanceLegendWrapper}>
                            <div className={classes.legendElement}>
                                <LargeDot color="warning"/>
                                <Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                >
                                    Integration
                                </Typography>
                            </div>
                            <div className={classes.legendElement}>
                                <LargeDot color="primary"/>
                                <Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                >
                                    SDK
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.progressSection}>
                            <Typography
                                size="md"
                                color="text"
                                colorBrightness="secondary"
                                className={classes.progressSectionTitle}
                            >
                                Integration
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={77}
                                classes={{barColorPrimary: classes.progressBarPrimary}}
                                className={classes.progress}
                            />
                        </div>
                        <div>
                            <Typography
                                size="md"
                                color="text"
                                colorBrightness="secondary"
                                className={classes.progressSectionTitle}
                            >
                                SDK
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={73}
                                classes={{barColorPrimary: classes.progressBarWarning}}
                                className={classes.progress}
                            />
                        </div>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                    <BigStat product="All purchase" total={{
                        monthly: 4232,
                        weekly: 1465,
                        daily: 199,
                        percent: {value: 3.7, profit: false}
                    }}
                             color="primary"
                             registrations={ {
                        monthly: { value: 830, profit: false },
                        weekly: { value: 215, profit: true },
                        daily: { value: 33, profit: true }
                    }}
                    bounce={ {
                    monthly: { value: 4.5, profit: false },
                    weekly: { value: 3, profit: true },
                    daily: { value: 3.25, profit: true }
                }}
                    />
                </Grid>
                {mock.bigStat.map(stat => (
                    <Grid item md={4} sm={6} xs={12} key={stat.product}>
                        <BigStat {...stat} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    var array = new Array(length).fill();
    let lastValue;

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1);

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
            ) {
            randomValue = Math.floor(Math.random() * multiplier + 1);
        }

        lastValue = randomValue;

        return {value: randomValue};
    });
}

function getMainChartData() {
    var resultArray = [];
    var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
    var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
    var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < tablet.length; i++) {
        resultArray.push({
            tablet: tablet[i].value,
            desktop: desktop[i].value,
            mobile: mobile[i].value,
        });
    }

    return resultArray;
}
