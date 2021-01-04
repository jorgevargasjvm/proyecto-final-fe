import React, {useEffect, useState} from "react";
import {Grid, LinearProgress} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import useStyles from "./styles";
import Widget from "../../../components/Admin/Widget";
import PageTitle from "../../../components/PageTitle";
import {Typography} from "../../../components/Admin/Wrappers";
import {LargeDot} from "../../../components/Dot";
import AllProducts from "./components/AllProducts";
import {
    allEventsPastMonth,
    allEventsPastWeek,
    allEventsPastYear,
    allEventsToday,
    filterByCategory
} from "../../../service/Statistics";
import {deleteEvent, getAllEventsSync, getPendingRequests} from "../../../service/API";
import {parseError} from "../../../utils/Parser";
import OnlyDeleteTable from "../../../components/Tables/OnlyDeleteTable";
import {useSnackbar} from "notistack";
import {columns} from "./components/table/columns";
import {Area, ComposedChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

const TABS = {
    today: 0,
    week: 1,
    month: 2,
    year: 3
};

const mainChartData = getMainChartData();

const options = {
    exportButton: true,
    actionsColumnIndex: -1,
    emptyRowsWhenPaging: false,
    draggable: false
}

export default function DashboardPage(props) {
    const {enqueueSnackbar} = useSnackbar();
    const [selectedTab, setSelectedTab] = useState(TABS.today);
    const [eventList, setEventList] = useState(null);
    const [loading, setLoading] = React.useState(true);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState(null);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        if (eventList === null) {
            getAllEventsSync().then(response => {
                let events = response?.data;
                setEventList(events);
                setSelectedEvents(allEventsToday(events));
            }).catch(error => {
                let err = parseError(error);
                throw new Error(err);
            })
        }
        if (pendingRequests?.length === 0) {
            getPendingRequests().then(response => {
                setPendingRequests(response?.data);
                setLoading(false);
            }).catch(error => {
                let err = parseError(error);
                enqueueSnackbar(err, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                });
                setLoading(false);
            })
        }
    }, [])

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
        switch (newValue) {
            case TABS.today:
                setSelectedEvents(allEventsToday(eventList));
                break;
            case TABS.week:
                setSelectedEvents(allEventsPastWeek(eventList));
                break;
            case TABS.month:
                setSelectedEvents(allEventsPastMonth(eventList));
                break;
            case TABS.year:
                setSelectedEvents(allEventsPastYear(eventList));
                break
            default:
                setSelectedEvents(0);
                break;
        }
    }
    const cols = columns();

    const handleRemoveEvent = (oldData, resolve, reject) => {
        deleteEvent(oldData?.id).then(response => {
            const dataDelete = [...eventList];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setEventList([...dataDelete]);
            if (resolve)
                resolve();
        }).catch(error => {
            let err = parseError(error);
            enqueueSnackbar(err, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            });
            reject();
        });
    };
    return (
        <>
            <PageTitle title="Index" showTabs={true} handleChangeTab={handleChangeTab} selectedTab={selectedTab}/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <OnlyDeleteTable
                        title="PENDING REQUEST"
                        data={pendingRequests}
                        columns={cols}
                        isLoading={loading}
                        options={options}
                        handleTableDelete={handleRemoveEvent}
                    />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        title="Visitas hoy"
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
                                    Inscripciones
                                </Typography>
                                <Typography size="md">860</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="text" colorBrightness="secondary" noWrap>
                                    Desconectar
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
                        title="
Rendimiento de la aplicación"
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
                                    Integración
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
                    <AllProducts
                        title="Compra total"
                        profit="true"
                        profitValue={3.7}
                        total={selectedEvents?.length}
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <AllProducts
                        title="Pre-Boda"
                        profit={false}
                        profitValue={2.1}
                        total={filterByCategory(selectedEvents, "Pre-Boda")?.length}
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <AllProducts
                        title="Boda"
                        profit={false}
                        profitValue={2.1}
                        total={filterByCategory(selectedEvents, "Boda")?.length}
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <AllProducts
                        title="Cumpleaños"
                        profit={false}
                        profitValue={2.1}
                        total={filterByCategory(selectedEvents, "Cumpleaños")?.length}
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <AllProducts
                        title="Video de evento"
                        profit={false}
                        profitValue={2.1}
                        total={filterByCategory(selectedEvents, "Video de Evento")?.length}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Widget
                        bodyClass={classes.mainChartBody}
                        header={
                            <div className={classes.mainChartHeader}>
                                <Typography
                                    variant="h5"
                                    color="text"
                                    colorBrightness="secondary"
                                >
                                    Ganancias
                                </Typography>
                            </div>
                        }
                    >
                        <ResponsiveContainer width="100%" minWidth={500} height={350}>
                            <ComposedChart
                                margin={{top: 0, right: -15, left: -15, bottom: 0}}
                                data={mainChartData}
                            >
                                <YAxis
                                    ticks={[0, 2500, 5000, 7500]}
                                    tick={{fill: theme.palette.text.hint + "80", fontSize: 14}}
                                    stroke={theme.palette.text.hint + "80"}
                                    tickLine={false}
                                />
                                <XAxis
                                    tickFormatter={i => i + 1}
                                    tick={{fill: theme.palette.text.hint + "80", fontSize: 14}}
                                    stroke={theme.palette.text.hint + "80"}
                                    tickLine={false}
                                />
                                <Area
                                    type="natural"
                                    dataKey="desktop"
                                    fill={theme.palette.background.light}
                                    strokeWidth={0}
                                    activeDot={false}
                                />
                                <Line
                                    type="natural"
                                    dataKey="mobile"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={false}
                                />
                                <Line
                                    type="linear"
                                    dataKey="tablet"
                                    stroke={theme.palette.warning.main}
                                    strokeWidth={2}
                                    dot={{
                                        stroke: theme.palette.warning.dark,
                                        strokeWidth: 2,
                                        fill: theme.palette.warning.main,
                                    }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </Widget>
                </Grid>
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
