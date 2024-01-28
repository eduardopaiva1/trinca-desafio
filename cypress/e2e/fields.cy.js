describe('Desafio Trinca', () => {

    beforeEach (() => {  
        cy.visit('https://trinca-app-bbq.vercel.app/');
        cy.get('[href="/acesso"]').click();
    });
  
  it('A aplicação deve permitir cadastrar um novo Evento.', () => {

    logarConta("eduardo.racovski@gmail.com", "tester123")

    cy.get('[href="/eventos"]').click();
    cy.contains('Cadastrar novo evento').click();
    
    cy.get('input[name="title"]').type('Cerveja')
    cy.get('input[name="price"]').type(50)
    cy.get('input[name="date"]').type("2024-01-29")
    cy.get('textarea[name="observations"]').type('De preferência uma caixa de Original')

    cy.contains('Salvar evento').click();
   })

  it('Todos os campos do formulário de cadastro de eventos devem ser obrigatórios, com exceção do campo "Observações".', () => {

    logarConta("eduardo.racovski@gmail.com", "tester123")

    cy.get('[href="/eventos"]').click();
    cy.contains('Cadastrar novo evento').click();

    cy.contains('Salvar evento').click();

    //Título obrigatório
    cy.get(':nth-child(2) > .text-md')
    .should('be.visible')
    .and('contain', 'Campo obrigatório');

    //Data obrigatória
    cy.get(':nth-child(4) > .text-md')
    .should('be.visible')
    .and('contain', 'Campo obrigatório')
   })

  it('Deve ser possível editar um evento cadastrado.',() => {

    logarConta("eduardo.racovski@gmail.com", "tester123")

    cy.get('[href="/eventos"]').click();

    cy.contains('Editar').click();

    cy.get('input[name="title"]').clear().type('Picanha')
    cy.get('input[name="price"]').clear().type(200)
    cy.get('input[name="date"]').clear().type("2024-01-30")
    cy.get('textarea[name="observations"]').clear().type('3 Kgs de Picanha, para assar no capricho')

    cy.contains('Salvar evento').click();
   })

   function logarConta(email, senha) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('button[type="submit"]').click();
  }
});