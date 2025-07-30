describe('test_basic_operations', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'))
  })
  it('Must add two numbers and check the result.', () => {
    cy.fixture('test_basic_operations').then((json) => {
      json.sum.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('result').contains(json.sum.result)
    })
  })
  it('Must subtract three numbers and check the result.', () => {
    cy.fixture('test_basic_operations').then((json) => {
      json.subtract.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('result').contains(json.subtract.result)
    })
  })
  it('Must multiple four numbers and check the result.', () => {
    cy.fixture('test_basic_operations').then((json) => {
      json.multiple.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('result').contains(json.multiple.result)
    })
  })
  it('Must divide five numbers and check the result.', () => {
    cy.fixture('test_basic_operations').then((json) => {
      json.divide.buttons.forEach((val: string) => {
        cy.selectByAttribute(val).click();
      })
      cy.selectByAttribute('result').contains(json.divide.result)
    })
  })
})
