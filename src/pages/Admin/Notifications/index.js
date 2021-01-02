import React from "react";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import {columns} from "./table/columns";
import {Grid} from "@material-ui/core";
import {addNotifications, deleteNotifications, editNotifications, getAllNotifications} from "../../../service/API";

const options = {
    exportButton: true,
    actionsColumnIndex: -1,
    emptyRowsWhenPaging: false,
    draggable: false
}

export default function NotificationsPage() {
    const [notificationList, setNotificationList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        if (notificationList.length === 0) {
            getAllNotifications().then(response => {
                setNotificationList(response?.data);
                setLoading(false);
            }).catch(error => {
                setLoading(false);
            })
        }
    }, [])

    const cols = columns();

    const handleAddNotification = (newData, resolve, reject) => {
        addNotifications(newData).then(response => {
            const newList = notificationList;
            newList.push(response?.data);
            setNotificationList(newList);
            if (resolve)
                resolve();
        }).catch(error => {
            console.log("ERROR ADD USER", error);
            reject();
        });
    };

    const handleEditNotification = (newData, oldData, resolve, reject) => {
        editNotifications(newData).then(response => {
            const dataUpdate = [...notificationList];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setNotificationList([...dataUpdate]);
            if (resolve)
                resolve();
        }).catch(error => {
            console.log("ERROR ADD USER", error);
            reject();
        });
    };

    const handleRemoveNotification = (oldData, resolve, reject) => {
        deleteNotifications(oldData?.id).then(response => {
            const dataDelete = [...notificationList];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setNotificationList([...dataDelete]);
            if (resolve)
                resolve();
        }).catch(error => {
            console.log("ERROR ADD USER", error);
            reject();
        });
    };

    return (
        <>
            <PageTitle title="Notificaciones"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Table
                        title="Lista de notificaciones"
                        data={notificationList}
                        columns={cols}
                        isLoading={loading}
                        options={options}
                        handleTableAdd={handleAddNotification}
                        handleTableDelete={handleRemoveNotification}
                        handleTableEdit={handleEditNotification}
                    />
                </Grid>
            </Grid>
        </>
    );
}