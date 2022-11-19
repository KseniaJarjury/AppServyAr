const imagenes=document.querySelectorAll('.img-galeria')
const imagenesLight = document.querySelectorAll('.agregar-imagen')
const contenedorLight = document.querySelector('.imagen-light')

 imagenes.forEach(imagen=>{
    imagen.addEventListener('click',()=>{
        aparecerImagen(imagen.getAttribute('src'))
       
    })

 })
 contenedorLight.addEventListener('click',(e)=>{
    if(e.target !== imagenesLight){
        contenedorLight.classList.toggle('show')
        imagenesLight.classList.toggle('showImage')
    }
 })
 const aparecerImagen =(imagen)=>{
    imagenesLight.src = imagen;
    contenedorLight.classList.toggle('show')
    imagenesLight.classList.toggle('showImage')
 }
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