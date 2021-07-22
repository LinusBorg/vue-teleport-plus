/// <reference types="cypress" />

describe('SingleTeleport)', () => {
  it('Basic Functionality', function () {
    cy.visit('http://localhost:3000/single')

    cy.get('[data-test-content] > p').contains(
      'This is a component with test content'
    )

    cy.get('[data-test-btn="toggle"]').as('toggler')
    cy.get('[data-test-btn="count"]').as('counter')
    cy.get('[data-test="source1"]').as('sourceWrapper')
    cy.get('[data-test-outlet-wrapper]').as('outletWrapper')

    cy.get('@counter').contains(0)
    cy.get('@counter').click()
    cy.get('@counter').contains(1)

    cy.get('@toggler').click()

    cy.get('@outletWrapper').get('[data-teleport-plus]').should('exist')
    cy.get('@outletWrapper').get('[data-teleport-plus]').should('be.visible')
    cy.get('@counter').contains(1)

    cy.get('@toggler').click()

    cy.get('@counter').contains(1)
    cy.get('@outletWrapper')
      .get('[data-teleport-plus]')
      .should('not.be.visible')
  })
})
