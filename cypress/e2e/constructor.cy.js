import {getCookie} from '../../src/utils/utils'
const testUrl = 'http://localhost:3000';

function rootVisit() {
  cy.viewport(1300, 800);
  cy.visit(testUrl);
} 

const bunIngredientSel = '[data-cy=ingredient643d69a5c3f7b9001cfa093c]'
const openBunIngredientSel = '[data-cy=openingredient643d69a5c3f7b9001cfa093c]'
const sauceIngredientSel = '[data-cy=ingredient643d69a5c3f7b9001cfa0942]';
const constructorSel = '[data-cy=constructor]';

describe('select ingredient', () => {
  before(rootVisit);

  it('Should click ingredient', { defaultCommandTimeout: 10000 }, function() {
    cy.get(bunIngredientSel).should('exist');
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get(bunIngredientSel).click();
    cy.get(openBunIngredientSel).should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  })
})

describe('drag buh and sauce', () => {
  before(rootVisit);

  it('Should click ingredient', { defaultCommandTimeout: 10000 }, function() {
    cy.get(bunIngredientSel).trigger('dragstart');
    cy.get(constructorSel).trigger('drop');
    cy.get(sauceIngredientSel).trigger('dragstart');
    cy.get(constructorSel).trigger('drop');

    cy.get(constructorSel)
      .contains('Краторная булка')
      .should('exist')
    cy.get(constructorSel)
      .contains('Соус')
      .should('exist')
  })
})

describe('order submit', () => {
  before(rootVisit);

  it('Should click ingredient', { defaultCommandTimeout: 100000 }, function() {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken === '' || refreshToken === undefined || refreshToken === null) 
    {
        cy.visit(testUrl + '/login');

        cy.get('*').contains('E-mail').parent().within(() => {
          cy.get("input").type("vera142@yandex.ru");
        });

        cy.get('*').contains('Пароль').parent().within(() => {
          cy.get("input").type("aaaaaaaa");
        });

        cy.contains("Войти").click();
    }

    cy.get(bunIngredientSel).trigger('dragstart');
    cy.get(constructorSel).trigger('drop');
    cy.get(sauceIngredientSel).trigger('dragstart');
    cy.get(constructorSel).trigger('drop');

    cy.contains('Ваш заказ начали готовить').should('not.exist');
    cy.get('[data-cy=order-submit]').click();
    cy.contains('Ваш заказ начали готовить').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Ваш заказ начали готовить').should('not.exist');
  })
})