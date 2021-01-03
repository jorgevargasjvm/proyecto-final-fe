export function purchaseValidation(purchase) {
    if (purchase?.username.trim() === "" || purchase?.username === null)
        return "Este campo de texto no puede estar vacío";
    if (purchase?.comentarios.trim() === "" || purchase?.comentarios === null)
        return "Este campo de texto no puede estar vacío";
    if (purchase?.email.trim() === "" || purchase?.email === null)
        return "Este campo de texto no puede estar vacío";
    if (!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(purchase?.email))
        return "El correo no es válido\n."
    if (purchase?.estado.trim() === "" || purchase?.estado === null)
        return "Este campo de texto no puede estar vacío";
    if (purchase?.direccion.trim() === "" || purchase?.direccion === null)
        return "Este campo de texto no puede estar vacío";
    return "";
}