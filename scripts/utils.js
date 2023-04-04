/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    if (isNaN(texto) && texto.length > 2) {
        return texto
    }
}

function normalizarTexto(texto) {

    const textoNormalizado = texto.toLowerCase().trim()

    return textoNormalizado

}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (validEmailRegex.test(email)) {
        return email
    } else {
        console.log('El email ingresado es incorrecto')
    }
}

function normalizarEmail(email) {
    const emailNormalizado = email.toLowerCase().trim()

    return emailNormalizado
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if (contrasenia.length > 4) {
        return contrasenia
    } else {
        console.log('La contrasenia no puede ser menor a 5 caracteres')
    }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_1 == contrasenia_2) {
        return contrasenia_1
    } else {
        console.log('Las contrasenias no son iguales')
    }
}

