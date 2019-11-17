describe('Test Selection Form Features', ()=> {


  it('display correct errorMessage when future date is entered', () => {

    cy.server()
    cy.route({
      method:'POST',
      url:'https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto',
      response:'{"errorMessage":"dateisGreaterThanToday"}',
      status:200
    })

    cy.visit('http://localhost:3000')
    cy.get('[data-cy-currecy-select]').should('exist').select('BTC')
    cy.get('[data-cy-date-select]').should('exist').type('2019-12-15')
    cy.get('[data-cy-submit-button]').should('exist').submit()

      cy.get('[data-cy-errorfuturemessage]:visible')

  })


  it('display correct errorMessage when a date value which has no price data is Entered', () => {

    cy.server()
    cy.route({
      method:'POST',
      url:'https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto',
      response:'{"errorMessage":"dateIsBefore2018"}',
      status:200
    })

    cy.visit('http://localhost:3000')
    cy.get('[data-cy-currecy-select]').should('exist').select('BTC')
    cy.get('[data-cy-date-select]').should('exist').type('2019-12-15')
    cy.get('[data-cy-submit-button]').should('exist').submit()

      cy.get('[data-cy-errorolddatemessage]:visible')

  })

  it('display correct errorMessage when a unkown Error is received', () => {

    cy.server()
    cy.route({
      method:'POST',
      url:'https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto',
      response:'{"errorMessage":"unkown Error could be anything"}',
      status:200
    })

    cy.visit('http://localhost:3000')
    cy.get('[data-cy-currecy-select]').should('exist').select('BTC')
    cy.get('[data-cy-date-select]').should('exist').type('2019-12-15')
    cy.get('[data-cy-submit-button]').should('exist').submit()

      cy.get('[data-cy-errorunkownmessage]:visible')

  })



})
