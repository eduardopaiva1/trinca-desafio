describe('Desafio Trinca', () => {

  beforeEach (() => {
    // Site Trinca    
    cy.visit('https://trinca-app-bbq.vercel.app/');
    // Entrar na Página de Cadastro
    cy.get('[href="/cadastro"]').click();
  });

  it('Deverá ser possível Cadastrar uma Nova Conta com Sucesso', () => {
    criarConta("eduardo.racovski@gmail.com", "tester123")
  });
    
  it('Não permitir cadastrar uma conta existente', () => {
    
    // Email cadastrado para validação do desafio de conta existente
    const emailExistente = 'eduardo.racovski@gmail.com';

    criarConta(emailExistente, "tester123");
    
    // Asserção para verificar se houve uma falha no cadastro
    cy.get('.go2072408551')
      .should('not.be.visible')
      .and('not.contain', 'Falha ao realizar cadastro');

    });
  
  it('Campo de cadastro obrigatório e informação exibida ao usuário', () => {

     // Cadastrar sem Preencher os Campos Obrigatórios
    cy.contains('button', 'Criar conta').click();

    // Verifica se a Mensagem de campo Obrigatório está sendo exibida
    cy.get(':nth-child(3) > .text-md')
      .should('be.visible')
      .and('contain', 'Required field');
  });

  function criarConta(email, senha) {
    // Preenchendo os campos de email e senha do Cadastro
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);

    // Clicar no Botão de cadastro
    cy.get('button[type="submit"]').click();
  }
});

