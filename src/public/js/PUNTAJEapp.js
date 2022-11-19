

const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient
})




function validarForm(event) {
  event.preventDefault();

    let punt = document.getElementById('puntuacion');
    let fecha = document.querySelector("#fechaFin").value;
    let today = getDate();
   //Validaciones realizadas
   validarPuntuacion(punt,fecha,today);

   this.reset();
}
//si fecha es distinto de vacio, y el boton hacerlo en css
//tambien validar que no se pueda puntuar mas de una vez

function validarPuntuacion(punt,fecha,today); {

    if(fecha >= today ){
      punt.removeAttribute('disabled');
          } else {
      punt.setAttribute('disabled', "true");
    }
  
  
}

function inicio() {
  // Configuro el comportamiento del botón submit del formulario
  let elForm = document.getElementById("myform");
  elForm.addEventListener("submit", validarForm);

  
}

// Cuando se termina de cargar la página ejecuta esto.
window.onload = inicio;
