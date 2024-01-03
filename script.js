const formulario = document.getElementById('miFormulario');

const patronesValidacion = {
    dni: /^\d{8}$/,
    tel: /^9\d{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      validarFormulario();
    });

    formulario.addEventListener('input', function (evento) {
      const input = evento.target;

      if (input.tagName === 'INPUT' && input.hasAttribute('required')) {
        const esValido = validarCampo(input);

        if (!esValido) {
          mostrarError(input);
        } else {
          quitarError(input);
        }
      }
    });

    function validarFormulario() {
      for (const input of formulario.elements) {
        if (input.tagName === 'INPUT' && input.hasAttribute('required')) {
          const esValido = validarCampo(input);

          if (!esValido) {
            mostrarError(input);
          } else {
            quitarError(input);
          }
        }
      }
    }

    function validarCampo(input) {
      const valorInput = input.value.trim();
      const nombreCampo = input.name;

      if (!patronesValidacion[nombreCampo].test(valorInput)) {
        return false;
      }

      return true;
    }

    function mostrarError(input) {
      const mensajeError = document.createElement('p');
      mensajeError.className = 'mensaje-error';
      mensajeError.textContent = input.title;

      const errorExistente = input.nextElementSibling;
      if (errorExistente && errorExistente.classList.contains('mensaje-error')) {
        errorExistente.textContent = mensajeError.textContent;
      } else {
        input.insertAdjacentElement('afterend', mensajeError);
      }
    }

    function quitarError(input) {
      const errorExistente = input.nextElementSibling;
      if (errorExistente && errorExistente.classList.contains('mensaje-error')) {
        errorExistente.remove();
      }
    }