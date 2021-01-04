import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {PageHeaderText, PageTitleContainer, TabHeaderContainer} from "./PageTitileElements";

export default function PageTitle({title, selectedTab, handleChangeTab, showTabs}) {
    return (
        <PageTitleContainer>
            <PageHeaderText variant="h1" size="sm">
                {title}
            </PageHeaderText>
            {showTabs ? <TabHeaderContainer square>
                <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeTab}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Hoy"/>
                    <Tab label="Esta semana"/>
                    <Tab label="Este mes"/>
                    <Tab label="Este año"/>
                </Tabs>
            </TabHeaderContainer> : <></>}
        </PageTitleContainer>
    );
}
