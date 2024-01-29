
describe('Desafio Trinca', () => {

  beforeEach (() => {
      // Site Trinca    
      cy.visit('https://trinca-app-bbq.vercel.app/');
      // Entrar na Página de Login
      cy.get('[href="/acesso"]').click();
  });

  it('Deve ser possível logar na aplicação com uma conta cadastrada.', () => {

    logarConta("eduardo.racovski@gmail.com", "tester123")
    cy.wait(3000);
 });

 it('Campo de login deve ser obrigatório e exibir esta informação para o usuário.', () => {

  // Regex para validação do Email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const campoEmail = 'input[name="email"]';

  // Função com os parâmetros de uma conta registrada
  ValidarContaExist("eduardo.racovski@gmail.com", "tester123")

  // Expect que valida se o e-mail foi digitado corretamente
  cy.get(campoEmail).invoke('val').then(email => {
    expect(email).to.match(emailRegex);
  });

  cy.wait(2000);

  cy.get('input[name="email"]').clear()
  cy.get('input[name="password"]').clear()

   // Login sem Preencher os Campos Obrigatórios
   cy.contains('button', 'Acessar conta').click();

   // Asserção para verificar se possui os Campos Obrigatórios
   cy.get(':nth-child(3) > .text-md')
      .should('be.visible')
      .and('contain', 'Campo obrigatório');
});
   
  function logarConta(email, senha) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);

    // Clicar no Botão de cadastro
    cy.get('button[type="submit"]').click();
  }

  function ValidarContaExist(email, senha) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);

  }
});