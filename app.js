let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", `Escolha um número de 1 a ${numeroMaximo}`);
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
  let quantidadeDeNumerosSorteados = listaDeNumerosSorteados.length;

  if (quantidadeDeNumerosSorteados === numeroMaximo) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function verificarChute() {
  let chute = Number(document.querySelector("input").value);

  if (chute === numeroSecreto) {
    exibirTextoNaTela("h1", "Parabéns, você acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("iniciar").setAttribute("disabled", "true");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("h1", "Errou!");
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("h1", "Errou!");
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  exibirMensagemInicial();
  limparCampo();
  document.getElementById("reiniciar").setAttribute("disabled", "true");
  document.getElementById("iniciar").removeAttribute("disabled");
}
