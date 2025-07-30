declare namespace Cypress {
    interface Chainable<Subject = any> {
        selectByAttribute(field: string, notExist?: boolean): Chainable<Subject>
    }
}
