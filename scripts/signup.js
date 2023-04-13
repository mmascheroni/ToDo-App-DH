window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form')
    const nombre = document.querySelector('#inputNombre')
    const apellido = document.querySelector('#inputApellido')
    const email = document.querySelector('#inputEmail')
    const password = document.querySelector('#inputPassword')
    const passwordRepetida = document.querySelector('#inputPasswordRepetida')

    let divError = document.createElement('div')

    const BASE_URL = 'https://todo-api.ctd.academy/v1'
    const PATH_USERS = '/users'


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        divError.innerHTML = ''

        const settings = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }


        if (validarTexto(nombre.value)) {
            settings.firstName = normalizarTexto(nombre.value)
        } else {
            divError.innerHTML += `
                <p class="error">⚠️ El nombre ingresado no es valido</p>
            `
            form.appendChild(divError)
        }

        if (validarTexto(apellido.value)) {
            settings.lastName = normalizarTexto(apellido.value)
        } else {
            divError.innerHTML += `
                <p class="error">⚠️ El apellido ingresado no es valido</p>
            `
            form.appendChild(divError)
        }

        if (validarEmail(email.value)) {
            settings.email = normalizarEmail(email.value)
        } else {
            divError.innerHTML += `
                <p class="error">⚠️ El email ingresado no es valido</p>
            `
            form.appendChild(divError)
        }

        if (validarContrasenia(password.value)) {
            if (compararContrasenias(password.value, passwordRepetida.value)) {
                settings.password = password.value
            } else {
                divError.innerHTML += `
                <p class="error">⚠️ Las contrasenias no son iguales </p>
            `
                form.appendChild(divError)
            }
        } else {
            divError.innerHTML += `
                <p class="error">⚠️ La contrasenia debe tener mas de 4 caracteres</p>
            `
        }


        if (settings.firstName.length > 1 && settings.lastName.length > 1 && settings.email.length > 1 && settings.password.length > 1) {
            realizarRegister(settings)
        }

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        fetch(`${BASE_URL}${PATH_USERS}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        })
            .then(response => response.json())
            .then(data => {
                const jwt = data.jwt;
                if (jwt) {
                    location.replace('index.html')
                }
            }).catch(error => console.log(error))
    };
});