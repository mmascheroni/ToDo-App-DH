/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    if (isNaN(texto) && texto.length > 2) {
        return texto
    }
}

function normalizarTexto(texto) {
    return texto.trim()
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


    if (validEmailRegex.test(email)) {
        return email
    }
}

function normalizarEmail(email) {
    return email.trim().toLowerCase()
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if (contrasenia.length > 4) {
        return contrasenia
    }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_1 == contrasenia_2) {
        return contrasenia_1
    }
}

