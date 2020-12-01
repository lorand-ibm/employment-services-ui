describe('The /en home page', function() {
  it('mobile menu item can send to /en/see-and-do/sights', function() {
    cy.viewport('iphone-6', 'portrait');
    cy.visit('http://127.0.0.1:8080/en');
    cy.get('.top-navigation__open').click();
    cy.contains('.top-navigation__links a', 'See & Do').click();
    cy.contains('.top-navigation-submenu__links a', 'Sights').click();
    cy.url().should('match', /\/en\/see-and-do\/sights$/);
    cy.title().should('eq', 'Sights | My Helsinki');
  });

  it('has search menu, but /en/search does not', function() {
    cy.visit('http://127.0.0.1:8080/en');
    cy.get('.search-bar__search-menu')
      .children()
      .should('length.greaterThan', 0);
    cy.visit('http://127.0.0.1:8080/en/search');
    cy.get('.search-bar__search-menu')
      .children()
      .should('have.length', 0);
  });
});

describe('The /en/see-and-do page', function() {
  it('mobile menu home button can send to /en', function() {
    cy.viewport('iphone-6', 'portrait');
    cy.visit('http://127.0.0.1:8080/en/see-and-do');
    cy.get('.top-navigation__open').click();
    cy.get('.user-menu-link--home-link').click();
    cy.url().should('match', /\/en$/);
    cy.title().should('eq', 'Your local guide to Helsinki | My Helsinki');
  });
});
