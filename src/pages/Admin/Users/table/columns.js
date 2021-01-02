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
            field: "name",
            title: "Nombre",
        },
        {
            field: "password",
            title: "Contraseña",
        },
        {
            field: "email",
            title: "Correo electrónico",
        },
        {
            field: "roles",
            title: "El papel",
        },
    ]);
}