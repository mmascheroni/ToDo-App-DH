window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form')
    const nombre = document.querySelector('#inputNombre')
    const apellido = document.querySelector('#inputApellido')
    const email = document.querySelector('#inputEmail')
    const password = document.querySelector('#inputPassword')
    const passwordRepetida = document.querySelector('#inputPasswordRepetida')

    const BASE_URL = 'https://todo-api.ctd.academy/v1'
    const PATH_USERS = '/users'


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const settings = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }


        if (validarTexto(nombre.value)) {
            settings.firstName = nombre.value
        }

        if (validarTexto(apellido.value)) {
            settings.lastName = apellido.value
        }

        if (validarEmail(email.value)) {
            settings.email = email.value
        }

        if (validarContrasenia(password.value) && compararContrasenias(password.value, passwordRepetida.value)) {
            settings.password = password.value;
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
                    location.replace('../index.html')
                }
            }).catch(error => console.log(error))
    };
});