describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to tuesday", () => {
    cy.visit("/")
    cy.get('li').contains('Tuesday').click()
  })
});