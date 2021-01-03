import React, {useState} from "react";
import {Grid, LinearProgress} from "@material-ui/core";
import mock from "./mock";
import PageTitle from "../../../components/PageTitle";
import BigStat from "./components/BigStat/BigStat";

const TABS = {
    today: 0,
    week: 1,
    month: 2,
    year: 3
};

export default function DashboardPage(props) {
    const [selectedTab, setSelectedTab] = useState(TABS.today);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    }
    return (
        <>
            <PageTitle title="Index" showTabs={true} handleChangeTab={handleChangeTab} selectedTab={selectedTab}/>
            <Grid container spacing={4}>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                    <BigStat product="Pre-boda" total={{
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


