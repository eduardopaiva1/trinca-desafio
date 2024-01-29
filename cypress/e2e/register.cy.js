describe('Desafio Trinca', () => {

  beforeEach (() => {
    // Site Trinca    
    cy.visit('https://trinca-app-bbq.vercel.app/');
    // Entrar na Página de Cadastro
    cy.get('[href="/cadastro"]').click();
  });

  it('Deverá ser possível Cadastrar uma Nova Conta com Sucesso', () => {
    criarConta("eduardo.paiva", "tester123");

    // Asserção que verifica se o cadastro foi realizado com sucesso
    cy.get('.go2072408551')
      .should('be.visible')
      .and('contain', 'Cadastro realizado com sucesso. Faça seu login!');

    cy.wait(3000);
  });
    
  it('Não permitir cadastrar uma conta existente', () => {
    
    // Email com uma conta registrada
    const emailExistente = 'eduardo.racovski@gmail.com';

    criarContaExist(emailExistente, "tester123");
    
    // Assertion que verifica se irá alertar o usuário caso o email seja existente
    cy.get('.go2072408551')
      .should('be.visible')
      .and('contain', 'Falha ao realizar cadastro');

    });
  
  it('Campo de cadastro obrigatório e informação exibida ao usuário', () => {

     // Cadastrar sem Preencher os Campos Obrigatórios
    cy.contains('button', 'Criar conta').click();

    // Verifica se a Mensagem de campo Obrigatório está sendo exibida
    cy.get(':nth-child(3) > .text-md')
      .should('be.visible')
      .and('contain', 'Required field');
  });

  // Função que itera um número aleatório para sempre criar uma conta nova
  function criarConta(prefixoEmail, senha) {
      const iteracao = Math.floor(Math.random() * (20 - 2 + 1) + 60);
      const email = `${prefixoEmail}${iteracao}@gmail.com`;
  
      // Preenchendo os campos do Cadastro
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(senha);
  
      // Clicar no Botão de cadastro
      cy.get('button[type="submit"]').click();
  }

  function criarContaExist(email, senha) {
    // Preenchendo os campos de email e senha do Cadastro
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);

    // Clicar no Botão de cadastro
    cy.get('button[type="submit"]').click();
  }
});

