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
            field: "type",
            title: "Tipo",
        },
        {
            field: "recipient",
            title: "Destinataria",
        },
        {
            field: "sender",
            title: "Remitente",
        },
        {
            field: "dateTime",
            title: "Fecha y hora",
            type: "datetime"
        },
        {
            field: "delivered",
            title: "Adjective",
            type: "boolean",
        },
    ]);
}