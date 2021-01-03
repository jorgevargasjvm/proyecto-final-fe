import React from "react";
import PageTitle from "../../../components/PageTitle";
import {columns} from "./table/columns";
import {Grid} from "@material-ui/core";
import { deleteEvent, getAllEvents} from "../../../service/API";
import {parseError} from "../../../utils/Parser";
import {useSnackbar} from "notistack";
import OnlyDeleteTable from "../../../components/Tables/OnlyDeleteTable";

const options = {
    exportButton: true,
    actionsColumnIndex: -1,
    emptyRowsWhenPaging: false,
    draggable: false
}

export default function EventsPage() {
    const {enqueueSnackbar} = useSnackbar();
    const [eventList, setEventList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        if (eventList.length === 0) {
            getAllEvents().then(response => {
                setEventList(response?.data);
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
            <PageTitle title="Eventos"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <OnlyDeleteTable
                        title="Lista de eventos"
                        data={eventList}
                        columns={cols}
                        isLoading={loading}
                        options={options}
                        // handleTableAdd={handleAddEvent}
                        handleTableDelete={handleRemoveEvent}
                        // handleTableEdit={handleEditEvent}
                    />
                </Grid>
            </Grid>
        </>
    );
}