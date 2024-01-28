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

    // Cadastrar sem Preencher os Campos Obrigatórios
   cy.contains('button', 'Acessar conta').click();

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
});