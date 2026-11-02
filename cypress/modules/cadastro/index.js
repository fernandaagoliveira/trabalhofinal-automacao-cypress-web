// Mapeamento centralizado dos seletores da tela de cadastro de usuário
const campos = {
  // Primeira etapa: nome e e-mail para iniciar o signup
  nomeInicial: '[data-qa="signup-name"]',
  emailInicial: '[data-qa="signup-email"]',
  btnIniciarCadastro: '[data-qa="signup-button"]',

  // Segunda etapa: formulário completo de dados pessoais
  radioMasculino: '#id_gender1',
  campoSenha: '[data-qa="password"]',
  selectDia: '[data-qa="days"]',
  selectMes: '[data-qa="months"]',
  selectAno: '[data-qa="years"]',
  campoNome: '[data-qa="first_name"]',
  campoSobrenome: '[data-qa="last_name"]',
  campoEndereco: '[data-qa="address"]',
  selectPais: '[data-qa="country"]',
  campoEstado: '[data-qa="state"]',
  campoCidade: '[data-qa="city"]',
  campoCep: '[data-qa="zipcode"]',
  campoCelular: '[data-qa="mobile_number"]',
  btnCriarConta: '[data-qa="create-account"]',

  // Confirmação de conta criada
  confirmacaoCriada: '[data-qa="account-created"]',
  btnContinuar: '[data-qa="continue-button"]'
};

export const registro = {

  // Preenche o formulário inicial de signup com nome e e-mail
  iniciarRegistro(nome, email) {
    cy.get(campos.nomeInicial).type(nome);
    cy.get(campos.emailInicial).type(email);
    cy.get(campos.btnIniciarCadastro).click();
  },

  // Preenche todos os dados pessoais e de endereço do formulário extenso
  preencherDadosCompletos(info) {
    cy.get(campos.radioMasculino).check();
    cy.get(campos.campoSenha).type(info.senha);
    cy.get(campos.selectDia).select(info.dia);
    cy.get(campos.selectMes).select(info.mes);
    cy.get(campos.selectAno).select(info.ano);
    cy.get(campos.campoNome).type(info.nome);
    cy.get(campos.campoSobrenome).type(info.sobrenome);
    cy.get(campos.campoEndereco).type(info.endereco);
    cy.get(campos.selectPais).select(info.pais);
    cy.get(campos.campoEstado).type(info.estado);
    cy.get(campos.campoCidade).type(info.cidade);
    cy.get(campos.campoCep).type(info.cep);
    cy.get(campos.campoCelular).type(info.celular);
    cy.get(campos.btnCriarConta).click();
  },

  // Verifica a mensagem de conta criada e avança para a próxima tela
  confirmarCriacao() {
    cy.get(campos.confirmacaoCriada)
      .should('be.visible')
      .and('contains.text', 'Account Created');
    cy.get(campos.btnContinuar).click();
  }
};