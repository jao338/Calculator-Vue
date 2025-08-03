describe('test_special_operations', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'))
  })
  it('Must click on a number, on "x²", on "=" and check the result.', () => {
    cy.fixture('test_special_operations').then((json) => {
        json.powerButtons.forEach((button) => {
            cy.selectByAttribute(button).click();
        });
        cy.selectByAttribute('result').should('have.text', json.resultPower);
    });
  })
  it('Must click on a number, on "√", on "=" and check the result', () => {
    cy.fixture('test_special_operations').then((json) => {
      json.sqrtButtons.forEach((button) => {
        cy.selectByAttribute(button).click();
      });
      cy.selectByAttribute('result').should('have.text', json.resultSQRT);
    });
  })
})
