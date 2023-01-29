//Criar Variavel para armazenar lista de contas
let contas = [
  {
    nome: 'Thais Bertoldo',
    cpf: '999.999.999.99',
    celular: '(99) 99999-9999',
    senha: '1',
    conta: 1,
    saldo: 10000,
  },
];

//Obter formulario para adicionar evento
const formulario = document.getElementById('form-cadastro');

//Criar função para ser executada no envio do formulário
const enviarFormulario = (event) => {
  //Evitar o comportamento padrão do evento de submit do form
  event.preventDefault();

  //Obter os campos de Senha para Validar se são iguais
  const senha = event.target.senha.value;
  const confirmacaoSenha = event.target.confrimacaoSenha.value;

  if (senha !== confirmacaoSenha) {
    alert('Senhas são Divergentes!');
    return;
  }

  //Adcionar a conta no array
  const nome = event.target.nome.value;
  const cpf = event.target.cpf.value;
  const celular = event.target.celular.value;
  const id = new Date().getTime();
  const saldo = 0;

  //Cria Objeto para o cadastro da conta
  const conta = {
    conta: id,
    nome,
    cpf,
    celular,
    senha,
    saldo,
  };

  //Adiciona conta no Array
  contas.push(conta);
  //Exibe informção ao usuario
  alert(`Conta criada com sucesso \n
  Seu número da conta é: ${id}`);
};

//Vincular função ao evento de submit do formulario
formulario.addEventListener('submit', enviarFormulario);

//OPERAÇÕES
//Obter formulário de operações
const formOperacao = document.getElementById('form-operacao');

//Função de saque
const sacar = (conta, valor) => {
  //Verifica se o valor é maior que 0
  if (valor > 0) {
    //Verifica se tem saldo disponivel
    if (conta.saldo >= valor) {
      const novoSaldo = conta.saldo - valor;
      conta.saldo = novoSaldo;
      alert(`Saque efetuado com sucesso !   Novo saldo de: ${novoSaldo}`);
      return;
    }
    alert(`Saldo insuficiente!!`);
    return;
  }
  alert(`Não foi possivel fazer a Operação`);
};
//Função de depósito
const depositar = (conta, valor) => {
  if (valor > 0) {
    const novoSaldo = conta.saldo + valor;
    conta.saldo = novoSaldo;

    alert(`Deposito efetuado com sucesso ! Novo saldo : ${novoSaldo}`);
    return;
  }
  alert(`Não foi possivel depositar o depósito`);
};

const consultarSaldo = (conta) => {
  alert(`Saldo Atual: ${conta.saldo}`);
};

//enviar formulario de operacao
const enviarFormularioOperacao = (event) => {
  event.preventDefault();

  //Obetr valores digitados no formulário
  const conta = parseInt(event.target.conta.value);
  const operacao = event.target.operacao.value;
  const valor = parseFloat(event.target.valor.value);
  const senha = event.target.senhaOperacao.value;

  //Validar a conta
  const contaAtual = contas.find((c) => c.conta === conta);
  if (!contaAtual) {
    alert('Conta inválida');
    return;
  }
  //Validando a senha
  if (contaAtual.senha !== senha) {
    alert('Senha inválida');
  }

  //Chamar a função correta da operação
  switch (operacao) {
    case 'saque':
      sacar(contaAtual, valor);
      break;
    case 'deposito':
      depositar(contaAtual, valor);
      break;
    case 'saldo':
      consultarSaldo(contaAtual);
      break;
    default:
      alert('Operação Inválida');
      break;
  }
};

//Vinculando função ao evento de submit do form operação
formOperacao.addEventListener('submit', enviarFormularioOperacao);

//Desabilitar / Habilitar campo de valor

//Obter select para adicionar evento de onchange
const operacao = document.getElementById('operacao');
operacao.addEventListener('change', (event) => {
  //Obtem o campo de valor do HTML
  const inputValor = document.getElementById('valor');

  //Verifica se o valor selecionado é 'saldo'
  if (event.target.value === 'saldo') {
    //Desabilitar o campo
    inputValor.disabled = true;
    //Limpa o valor digitado
    inputValor.value = '';
    return;
  }

  inputValor.disabled = false;
});
