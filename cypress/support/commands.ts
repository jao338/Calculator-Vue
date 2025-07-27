Cypress.Commands.add('selectByAttribute', (field: string, notExist = false) => {
    notExist ? cy.get(`[data-cy='${field}']`).should('not.be.visible') : cy.get(`[data-cy='${field}']`).should('be.visible')
});

export {}
