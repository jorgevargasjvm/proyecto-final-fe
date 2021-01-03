import React from "react";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import {columns} from "./table/columns";
import {Grid} from "@material-ui/core";
import {addUser, deleteUser, editUser, getAllUsers} from "../../../service/API";
import {parseError} from "../../../utils/Parser";
import {useSnackbar} from "notistack";

const options = {
    exportButton: true,
    actionsColumnIndex: -1,
    emptyRowsWhenPaging: false,
    draggable: false
}

export default function UsersPage() {
    const {enqueueSnackbar} = useSnackbar();
    const [userList, setUserList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        if (userList.length === 0) {
            getAllUsers().then(response => {
                setUserList(response?.data);
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

    const handleAddUser = (newData, resolve, reject) => {
        addUser(newData).then(response => {
            const newList = userList;
            newList.push(response?.data);
            setUserList(newList);
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

    const handleEditUser = (newData, oldData, resolve, reject) => {
        editUser(newData).then(response => {
            const dataUpdate = [...userList];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setUserList([...dataUpdate]);
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

    const handleRemoveUser = (oldData, resolve, reject) => {
        deleteUser(oldData?.id).then(response => {
            const dataDelete = [...userList];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setUserList([...dataDelete]);
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
            <PageTitle title="Usuarios"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Table
                        title="Lista de usuariosa"
                        data={userList}
                        columns={cols}
                        isLoading={loading}
                        options={options}
                        handleTableAdd={handleAddUser}
                        handleTableDelete={handleRemoveUser}
                        handleTableEdit={handleEditUser}
                    />
                </Grid>
            </Grid>
        </>
    );
}