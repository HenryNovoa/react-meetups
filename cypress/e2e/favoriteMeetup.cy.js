describe('Favorite Meetup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should add and remove a meetup from favorites', () => {
    cy.get('[data-testid="meet-up-item"]').first().within(() => {
      cy.get('button').contains('Add to favorites').click();
    });

    cy.get('nav').contains('My Favorites').click();

    cy.get('[data-testid="meet-up-item"]').should('have.length', 1);

    cy.get('[data-testid="meet-up-item"]').first().within(() => {
      cy.get('button').contains('Remove from favorites').click();
    });

    cy.get('[data-testid="meet-up-item"]').should('have.length', 0);
  });
});
