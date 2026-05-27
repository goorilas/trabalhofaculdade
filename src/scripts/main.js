import { DataComponent } from './data-storage.js';

// cria a tag <app-data> para usar no html
customElements.define('app-data', DataComponent);
// pega o componente para poder usar nossos comandos
const appData = document.getElementById("appData");

// pega os dados do formulario de contatos e salva no navegador antes de mandar para o PHP
const contatoForm = document.getElementById("contatoForm");
contatoForm.addEventListener('submit', function(event) {
  // impede de enviar para o PHP
  event.preventDefault(); 
  const contatoNome = document.getElementById('contatoNome').value
  const contatoEmail = document.getElementById('contatoEmail').value
  const contatoMensagem = document.getElementById('contatoMensagem').value
  // salva o contato no componente
  appData.inserir({
    nome: contatoNome,
    email: contatoEmail,
    mensagem: contatoMensagem,
  })
  // envia para o PHP
  event.target.submit()
})

// #############################################################################

const titulo = document.getElementById("titulo-animado");
const texto = titulo.innerText;
titulo.innerHTML = "";
texto.split("").forEach((letra, index) => {
    const span = document.createElement("span");
    span.classList.add("letra");
    span.style.animationDelay = `${index * 0.05}s`;
    span.innerText = letra;
    titulo.appendChild(span);
});