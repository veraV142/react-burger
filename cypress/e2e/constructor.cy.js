describe('select ingredient', () => {
  before(function() {
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('Should click ingredient', { defaultCommandTimeout: 10000 }, function() {
    cy.get('[data-cy=ingredient643d69a5c3f7b9001cfa093c]').should('exist');
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-cy=ingredient643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=openingredient643d69a5c3f7b9001cfa093c]').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  })
})

describe('drag buh and sauce', () => {
  before(function() {
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('Should click ingredient', { defaultCommandTimeout: 10000 }, function() {
    cy.get('[data-cy=ingredient643d69a5c3f7b9001cfa093c]').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=ingredient643d69a5c3f7b9001cfa0942]').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor]')
      .contains('Краторная булка')
      .should('exist')
    cy.get('[data-cy=constructor]')
      .contains('Соус')
      .should('exist')
  })
})

describe('order submit', () => {
  before(function() {
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('Should click ingredient', { defaultCommandTimeout: 10000 }, function() {
    cy.get('[data-cy=ingredient643d69a5c3f7b9001cfa093c]').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=ingredient643d69a5c3f7b9001cfa0942]').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');

    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-cy=order-submit]').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Ваш заказ начали готовить').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  })
})