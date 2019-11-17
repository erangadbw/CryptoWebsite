describe('Test BasicDisplayStatsFeatures', ()=> {

  it('Displayes Expected Outputs', () => {

    cy.fixture('response').as('response')
    cy.server()
    cy.route({
      method:'POST',
      url:'https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto',
      response:'@response',
      status:200
    })

    cy.visit('http://localhost:3000')
    cy.get('[data-cy-currecy-select]').should('exist').select('Bitcoin')
    cy.get('[data-cy-date-select]').should('exist').type('2019-10-15')
    cy.get('[data-cy-submit-button]').should('exist').submit()

    cy.get('[data-cy-errormessage]:visible').should('not.exist')
    cy.contains('$14350.56');
    cy.contains('$14466.43');
    cy.contains('10:00:00 AM');
    cy.contains('6:00:00 PM');
    cy.contains('$115.87');

  })

})
