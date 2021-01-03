import React from "react";
import MaterialTable from "material-table";
import {
    ArrowDropUp,
    ArrowForwardIos,
    Cancel,
    Clear,
    DeleteForever,
    Edit,
    FirstPage,
    ImportExport,
    LastPage,
    NavigateBefore,
    NavigateNext,
    Queue,
    Remove,
    Search
} from "@material-ui/icons";
import CheckIcon from '@material-ui/icons/Check';

const localization = {
    pagination: {
        labelDisplayedRows: '{from}-{to} del total {count}',
        labelRowsSelect: "filas",
        labelRowsPerPage: "Filas por página:",
        firstAriaLabel: "Primera página",
        firstTooltip: "Primera página",
        previousAriaLabel: "Pagina anterior",
        previousTooltip: "Pagina anterior",
        nextAriaLabel: "Siguiente página",
        nextTooltip: "Siguiente página",
        lastAriaLabel: "Última página",
        lastTooltip: "Última página"
    },
    toolbar: {
        nRowsSelected: '{0} filas seleccionadas',
        exportTitle: "Exportar",
        exportAriaLabel: "Exportar",
        exportName: "Exportar cómo {scv}",
        searchTooltip: "Buscar",
        searchPlaceholder: "Buscar",
    },
    header: {
        actions: 'Comportamiento'
    },
    body: {
        emptyDataSourceMessage: 'No hay resultados',
        addTooltip: "Añadir",
        deleteTooltip: "Eliminar",
        editTooltip: "Editar",
        editRow: {
            deleteText: "¿Estas seguro que quieres borrarlo?",
            cancelTooltip: "Solo déjalo ir",
            saveTooltip: "Guárdalo"
        },
        filterRow: {
            filterTooltip: 'Filtrar'
        },
    }
}

const icons = {
    Add: Queue,
    Check: CheckIcon,
    Clear: Clear,
    Delete: DeleteForever,
    Edit: Edit,
    Export: ImportExport,
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: NavigateNext,
    PreviousPage: NavigateBefore,
    Search: Search,
    ResetSearch: Cancel,
    SortArrow: ArrowDropUp,
    DetailPanel: ArrowForwardIos,
    ThirdStateCheck: Remove,
}

export default function OnlyDeleteTable({data, title, isLoading, handleTableAdd, handleTableEdit, handleTableDelete, columns, options, ...props}) {
    return (
        <MaterialTable
            isLoading={isLoading}
            title={title}
            localization={localization}
            data={data}
            columns={columns}
            editable={{
                isEditable: rowData => false,
                isEditHidden: rowData => true,
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        handleTableDelete(oldData, resolve, reject);
                    }),
            }}
            options={options}
            icons={icons}
            {...props}
        />
    );
}