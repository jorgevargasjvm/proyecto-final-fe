import React from "react";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import {columns} from "./table/columns";
import {Grid} from "@material-ui/core";
import {addEvent, deleteEvent, editEvent, getAllEvents} from "../../../service/API";

const options = {
    exportButton: true,
    actionsColumnIndex: -1,
    emptyRowsWhenPaging: false,
    draggable: false
}

export default function EventsPage() {
    const [eventList, setEventList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        if (eventList.length === 0) {
            getAllEvents().then(response => {
                setEventList(response?.data);
                setLoading(false);
            }).catch(error => {
                setLoading(false);
            })
        }
    }, [])

    const cols = columns();

    const handleAddEvent = (newData, resolve, reject) => {
        addEvent(newData).then(response => {
            const newList = eventList;
            newList.push(response?.data);
            setEventList(newList);
            if (resolve)
                resolve();
        }).catch(error => {
            console.log("ERROR ADD USER", error);
            reject();
        });
    };

    const handleEditEvent = (newData, oldData, resolve, reject) => {
        editEvent(newData).then(response => {
            const dataUpdate = [...eventList];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setEventList([...dataUpdate]);
            if (resolve)
                resolve();
        }).catch(error => {
            console.log("ERROR ADD USER", error);
            reject();
        });
    };

    const handleRemoveEvent = (oldData, resolve, reject) => {
        deleteEvent(oldData?.id).then(response => {
            const dataDelete = [...eventList];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setEventList([...dataDelete]);
            if (resolve)
                resolve();
        }).catch(error => {
            console.log("ERROR ADD USER", error);
            reject();
        });
    };

    return (
        <>
            <PageTitle title="Eventos"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Table
                        title="Lista de eventos"
                        data={eventList}
                        columns={cols}
                        isLoading={loading}
                        options={options}
                        handleTableAdd={handleAddEvent}
                        handleTableDelete={handleRemoveEvent}
                        handleTableEdit={handleEditEvent}
                    />
                </Grid>
            </Grid>
        </>
    );
}