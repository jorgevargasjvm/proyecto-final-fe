export const columns = () => {
    return ([
        {
            title: "id",
            hidden: true,
            field: "Id",
            export: false,
            type: 'numeric',
        },
        {
            field: "comentarios",
            title: "Comentarios",
        },
        {
            field: "fechaHora",
            title: "Fecha Hora",
            type: "datetime"
        },
        {
            field: "nombreCliente",
            title: "Nombre Cliente",
        },
        {
            field: "direccion",
            title: "Direccion",
        },
        {
            field: "estado",
            title: "Estado",
        },
        {
            field: "tipoEvento.id",
            title: "Tipo evento id",
            hidden: true,
            export: false,
            type: 'numeric',
        },
        {
            field: "tipoEvento.name",
            title: "Tipo evento nombre",
        },
        {
            field: "tipoEvento.amount",
            title: "Tipo evento cantidad",
            type: 'numeric',
        },
    ]);
}
