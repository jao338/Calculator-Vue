describe('test_functional', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'))
  })
  it('Must click all the button on the screen', () => {
    cy.fixture('test_functional').then((json) => {
      json.clickableButtons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      });
      cy.selectByAttribute('result').should('have.text', json.result);
    })
  })
  it('Must click some buttons and then click backspace ', () => {
    cy.fixture('test_functional').then((json) => {
      json.functions.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('button-backspace').click();
      cy.selectByAttribute('result').should('have.text', json.functions.resultDeleteLastDigit)
    })
  })
  it('Must click some buttons and then click "CE" ', () => {
    cy.fixture('test_functional').then((json) => {
      json.functions.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('button-CE').click();
      cy.selectByAttribute('result').should('have.text', json.functions.resultDeleteEntry)
    })
  })
  it('Must click some buttons and then click "C" ', () => {
    cy.fixture('test_functional').then((json) => {
      json.functions.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('button-C').click();
      cy.selectByAttribute('result').should('not.have.text', json.functions.resultNotExpected)
    })
  })
})
