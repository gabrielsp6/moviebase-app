describe("Search Page", () => {
  it('Test of adding 5 results into watchlist, check pie chart existence', () => {

    cy.visit("http://localhost:3000/search");

    cy.get('[data-testid="search-input"]').type("harry potter");

    cy.get('[data-testid="search-input"]').type("{enter}");


    for (let i = 0; i < 7; i++) {
      // Click on the i-th search result
      cy.get(`[data-testid="search-result-${i}"]`).first().click();

      // Add to watchlist
      cy.get('[data-testid="toggle-watchlist-button"]').click();

      // Go back to the search results
      
      cy.go("back");

      cy.get('[data-testid="search-input"]').type("harry potter");

      cy.get('[data-testid="search-input"]').type("{enter}");
    }
    cy.visit("http://localhost:3000/watchlist");
    cy.wait(2000)

    for (let i = 0; i < 7; i++) {
      cy.get(`[data-testid^="watchlist-card-${i}"]`).should("exist");
    }
    
    cy.get('[data-testid="pie-chart"]').should("be.visible")

  });
});
