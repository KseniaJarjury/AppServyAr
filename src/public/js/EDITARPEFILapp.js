
// $(document).ready(function () {
//   var readURL = function (input) {
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();

//       reader.onload = function (e) {
//         $('.avatar').attr('src', e.target.result);
//       }

//       reader.readAsDataURL(input.files[0]);
//     }
//   }

//   $(".file-upload").on('change', function () {
//     readURL(this);
//   });
// });

////////////////CONTRASEÑA//////////////
//Validar contraseña



function validarForm(event) {
  event.preventDefault();

    let pass1 = document.querySelector("#password").value
    let pass2 = document.querySelector("#password2").value

   //Validaciones realizadas
   validarContraseña(pass1,pass2);

   this.reset();
}

function validarContraseña(pass1,pass2) {

    if(pass1 != pass2){
      //si las contraseñas no coinciden
      alert("¡Las contraseñas son distintas!");
      pass1.focus();
    } else {
      //Si todo esta correcto 
      if(pass1 = pass2){
      alert("¡Perfil editado correctamente!");
      }
    }
  
  
}

function inicio() {
  // Configuro el comportamiento del botón submit del formulario
  let elForm = document.getElementById("myform");
  elForm.addEventListener("submit", validarForm);

  
}

// Cuando se termina de cargar la página ejecuta esto.
window.onload = inicio;
