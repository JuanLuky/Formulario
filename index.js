class ValidaFormulario {
  constructor() {
      this.formulario = document.querySelector('.formulario');
      this.events();
  }

  events() {
    this.formulario.addEventListener('submit', e => {
        this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
      e.preventDefault();
      const camposValidos = this.camposSaoValidos();
      const senhasValidas = this.senhasSaoValidas();

      if(camposValidos && senhasValidas) {
        alert("Formulário enviado.");
        this.formulario.submit();
      }
  }
  
  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.criaError(senha, 'Campos senha e repetir senha precisam ser iguais');

      this.criaError(repetirSenha, 'Campos senha e repetir senha precisam ser iguais')
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaError(senha, 'Senha precisar conter entre 6 ou 12 caracteres');
    }

    return valid;
  }

  camposSaoValidos() {
      let valid = true;

      for(let errorText of this.formulario.querySelectorAll('.error-text')) {
        errorText.remove();
      }

      for(let campo of this.formulario.querySelectorAll('.validar')) {

          const label = campo.previousElementSibling.innerHTML;

          if (!campo.value) {
            this.criaError(campo, `Campo ${label} está em banco.`)
            valid = false;
          }

          if(campo.classList.contains('cpf')) {
            if(!this.validaCPF(campo)) valid = false;
          }

          if(campo.classList.contains('usuário')) {
            if(!this.validaUsuario(campo)) valid = false;
          }
      }

      return valid;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.criaError(campo, 'CPF is invalid');
      return false
    }

    return true;
  }

  validaUsuario(campo) {
    let valid = true;
    const usuario = campo.value;

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaError(campo, 'Usúario precisar ter entre 3 e 12 caracteres');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaError(campo, 'Nome do usuario precisar conter apenas letras ou números');
      valid = false;
    }
    return valid;
  }

  criaError(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');

    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaFormulario();