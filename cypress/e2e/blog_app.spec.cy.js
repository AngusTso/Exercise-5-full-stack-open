describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/blogs/reset')
    const user = {
      username: 'Angusking',
      password: 'Angus2=best',
      name:'AngusTso'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Angusking')
      cy.get('#password').type('Angus2=best')
      cy.get('#login_button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Ashley')
      cy.get('#password').type('hello=best')
      cy.get('#login_button').click()
      cy.get('.error').should('contain', 'wrong username').and('have.css', 'color', 'rgb(139, 0, 0)')
      cy.contains('wrong username')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Angusking')
      cy.get('#password').type('Angus2=best')
      cy.get('#login_button').click()
    })

    it('A blog can be created', function() {
      cy.get('#Create_Blog').click()
      cy.get('#title').type('end_to_end_testing')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('https://fullstackopen.com/en/part5/end_to_end_testing#testing-new-note-form')
      cy.get('#blogSubmit').click()
      cy.contains('end_to_end_testing')
    })

    it('A blog can liked', function() {
      cy.get('#Create_Blog').click()
      cy.get('#title').type('end_to_end_testing')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('https://fullstackopen.com/en/part5/end_to_end_testing#testing-new-note-form')
      cy.get('#blogSubmit').click()
      cy.get('#view').click()
      cy.get('#likeButton').click()
      cy.contains('Liked Blog')
    })

    it('A blog can liked', function() {
      cy.get('#Create_Blog').click()
      cy.get('#title').type('end_to_end_testing')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('https://fullstackopen.com/en/part5/end_to_end_testing#testing-new-note-form')
      cy.get('#blogSubmit').click()
      cy.get('#view').click()
      cy.get('#deleteButton').click()
      cy.contains('Deleted Blog')
    })
  })
})