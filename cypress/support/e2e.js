import 'cypress-mochawesome-reporter/register';

// Impede que erros de scripts externos interrompam a execução dos testes
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});