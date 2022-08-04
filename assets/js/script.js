const form = document.querySelector('#formulario');

//Capturar o evento de submit do formulário.
form.addEventListener('submit', function (e) {
    //Previne o default e não deixa o formulario ser enviado.
    e.preventDefault();
    //Pega os dados dos input peso e altura do html.
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');
    //Converte os valores do input para Number.
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);
    //Se o peso não for avaliado como verdadeiro, ele é setado como 'Peso inválido' e o valor falso é retornado.
    if (!peso) {
        setResultado('Peso inválido', false);
        return;
    }
    //Se a altura não for avaliada como verdadeiro, ela é setada como 'Altura inválida' e o valor falso é retornado.
    if (!altura) {
        setResultado('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura);
    const calculoImc = getCalculoImc(imc);

    const msg = `Seu IMC é ${imc} (${calculoImc})`;

    setResultado(msg, true);
});
//Função que recebe o IMC e avalia em qual categoria o valor se encaixa.
function getCalculoImc(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
        'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) {
        return nivel[5];
    }

    if (imc >= 34.9) {
        return nivel[4];
    }

    if (imc >= 29.9) {
        return nivel[3];
    }

    if (imc >= 24.9) {
        return nivel[2];
    }

    if (imc >= 18.5) {
        return nivel[1];
    }

    if (imc < 18.5) {
        return nivel[0];
    }
}
//Função para fazer o calculo do IMC e retorna o resultado com 1 casa após o ponto.
function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(1);
}
//função para criar um paragráfo com classe inclusa.
function criaP() {
    const p = document.createElement('p');
    p.classList.add('paragrafo-resultado');
    return p;
}
//Função que recebe o resultado do IMC, verifica se é válida e caso seja ela verdadeira 
//o resultado será exibido em marsala escuro e caso seja falso será exibido em marsala claro.
function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultadoImc');
    resultado.innerHTML = '';
    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado-v');
    } else {
        p.classList.add('paragrafo-resultado-f');
    }
    p.innerHTML = msg;
    resultado.appendChild(p);
}