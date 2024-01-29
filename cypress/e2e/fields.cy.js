describe('Desafio Trinca', () => {

    beforeEach (() => {  
        cy.visit('https://trinca-app-bbq.vercel.app/');
        cy.get('[href="/acesso"]').click();
    });
  
  it('A aplicação deve permitir cadastrar um novo Evento.', () => {

    logarConta("eduardo.racovski@gmail.com", "tester123")

    // Entrar em Eventos
    cy.get('[href="/eventos"]').click();

    cy.contains('Cadastrar novo evento').click();

    // Função para Preenchimento dos campos do Evento
    function preencherEvento(title, price, date, observations) {
      cy.get('input[name="title"]').type(title);
      cy.get('input[name="price"]').clear().type(price);
      cy.get('input[name="date"]').type(date);
      cy.get('textarea[name="observations"]').type(observations);
    }

    // Opções para preencher o formulário de Evento
    const opcoes = [
      { title: 'Cerveja', price: 50, date: '2024-01-29', observations: 'De preferência uma caixa de Original' },
      { title: 'Vinho', price: 30, date: '2024-01-30', observations: 'Vinho de qualidade duvidosa' },
      { title: 'CocaCola', price: 10, date: '2024-01-31', observations: 'Para os não alcoólicos' },
    ];

    // Escolhe aleatoriamente uma opção do array
    const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
    const opcaoEscolhida = opcoes[indiceAleatorio];

    // Preenche o formulário do Evento com a opção escolhida
    preencherEvento(opcaoEscolhida.title, opcaoEscolhida.price, opcaoEscolhida.date, opcaoEscolhida.observations);

    cy.contains('Salvar evento').click();
  });

  it('Todos os campos do formulário de cadastro de eventos devem ser obrigatórios, com exceção do campo "Observações".', () => {

    logarConta("eduardo.racovski@gmail.com", "tester123")

    cy.get('[href="/eventos"]').click();
    cy.contains('Cadastrar novo evento').click();

    // Ação para salvar um novo evento sem adicionar as informações obrigatórias
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

    // Alteração de um Evento usado .clear() zerar o valor setado
    cy.get('input[name="title"]').clear().type('Picanha')
    cy.get('input[name="price"]').clear().type(200)
    cy.get('input[name="date"]').clear().type("2024-01-30")
    cy.get('textarea[name="observations"]').clear().type('3 Kgs de Picanha, para assar no capricho')

    // Asserção para que o custo nunca seja 0
    cy.get('input[name="price"]').should('not.have.value', '0');

    cy.contains('Salvar evento').click();
   })

   // Função para Acessar a Conta
   function logarConta(email, senha) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('button[type="submit"]').click();
  }
});