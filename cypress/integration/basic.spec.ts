/// <reference types="cypress" />

describe('Smoke Test', () => {
  it('should render', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-test="source-h1"]').contains(
      'This is where we send content from'
    )
  })
})
