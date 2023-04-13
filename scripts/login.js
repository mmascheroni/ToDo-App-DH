window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */

    const form = document.querySelector('form')
    const email = document.querySelector('#inputEmail')
    const password = document.querySelector('#inputPassword')

    const divError = document.createElement('div')

    const BASE_URL = 'https://todo-api.ctd.academy/v1'
    const PATH_LOGIN = '/users/login'

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const settings = {
            email: '',
            password: ''
        }


        if (validarEmail(email.value)) {
            settings.email = email.value
        }



        if (validarContrasenia(password.value)) {
            settings.password = password.value;
        }



        if (validarEmail(email.value) && validarContrasenia(password.value)) {
            console.log(settings)
            // Activar el loader
            document.querySelector('.btn-login').innerHTML = 'Cargando...';

            realizarLogin(settings)
        } else {
            divError.innerHTML = `
                        <p class="error">⚠️ La contrasenia o el email no son validos</p>
                    `
            form.appendChild(divError)
        }

    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        fetch(`${BASE_URL}${PATH_LOGIN}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.jwt) {
                    localStorage.setItem("jwt", responseData.jwt)
                    location.replace('mis-tareas.html')
                } else {
                    console.log('error')
                    divError.innerHTML = `
                        <p class="error">⚠️ La contrasenia o el email no son validos</p>
                    `

                    form.appendChild(divError)
                }
            })
            .catch(error => {
                console.log(error)

            })
    };


});