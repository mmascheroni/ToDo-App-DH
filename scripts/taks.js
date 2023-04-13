// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.jwt) {
  location.replace("./index.html")
}


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  AOS.init();
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp')
  const formCrearTarea = document.querySelector('.nueva-tarea')
  const pUserName = document.querySelector('.user-info > p')
  const nuevaTarea = document.querySelector('#nuevaTarea')



  const TOKEN = localStorage.getItem('jwt')
  const BASE_URL = 'https://todo-api.ctd.academy/v1'
  const PATH_USER = '/users/getMe'
  const PATH_TASKS = '/tasks'

  obtenerNombreUsuario()
  consultarTareas()


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      // text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Hasta luego!',
          'Te esperamos.',
          'success'
        )
        localStorage.clear()
        location.replace("index.html")
      }
    })
    // localStorage.clear()
    // location.replace('../index.html')
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    fetch(`${BASE_URL}${PATH_USER}`, {
      method: 'GET',
      headers: {
        "Authorization": `${TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        pUserName.innerHTML = ''
        const firstName = data.firstName
        pUserName.innerHTML = firstName
      })
      .catch(error => console.log(error))
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {

    fetch(`${BASE_URL}${PATH_TASKS}`, {
      method: 'GET',
      headers: {
        "Authorization": `${TOKEN}`
      }
    })
      .then(response => response.json())
      .then(tasks => {
        console.log(tasks)
        renderizarTareas(tasks)
        botonesCambioEstado()
        botonBorrarTarea()
      })
      .catch(error => console.log(error))

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()

    const payload = {
      description: nuevaTarea.value.trim()
    }
    console.log(JSON.stringify(payload))

    console.log(`${nuevaTarea.value.trim()}`)
    fetch(`${BASE_URL}${PATH_TASKS}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${TOKEN}`
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        consultarTareas()
      })
      .catch(error => console.log(error))

    formCrearTarea.reset()

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {

    const tareasPendientes = document.querySelector('.tareas-pendientes');
    const tareasFinalizadas = document.querySelector('.tareas-terminadas');
    tareasPendientes.innerHTML = "";
    tareasFinalizadas.innerHTML = "";

    // buscamos el numero de finalizadas
    const numeroFinalizadas = document.querySelector('#cantidad-finalizadas');
    let contador = 0;
    numeroFinalizadas.innerText = contador;

    listado.forEach(task => {
      let fecha = new Date(task.createdAt)

      if (task.completed) {
        contador++

        tareasFinalizadas.innerHTML += `
        <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${task.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${task.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${task.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `
      } else {
        tareasPendientes.innerHTML += `
          <li class="tarea">
            <button class="change" id="${task.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${task.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
          `
      }

      numeroFinalizadas.innerText = contador;

    })

  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {

    const btnChange = document.querySelectorAll('.change')
    console.log(btnChange)

    btnChange.forEach(btn => {

      btn.addEventListener('click', e => {
        console.log('Click' + e)
        const id = e.target.id
        const url = `${BASE_URL}${PATH_TASKS}/${id}`
        const payload = {}

        if (e.target.classList.contains('incompleta')) {
          payload.completed = false
        } else {
          payload.completed = true
        }

        fetch(url, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${TOKEN}`
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            console.log(response)
            consultarTareas()
          })
      })

    })


  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {

    const btnBorrar = document.querySelectorAll('.borrar')
    console.log(btnBorrar)

    btnBorrar.forEach(btn => {

      btn.addEventListener('click', e => {
        console.log('Click' + e)
        const id = e.target.id
        const url = `${BASE_URL}${PATH_TASKS}/${id}`


        fetch(url, {
          method: 'DELETE',
          headers: {
            "Authorization": `${TOKEN}`
          }
        })
          .then(response => {
            console.log(response)
            consultarTareas()
          })
      })

    })



  };

});