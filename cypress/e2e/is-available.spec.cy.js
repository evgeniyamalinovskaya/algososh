const testUrl = 'http://localhost:3000/';

describe("Сервис загружен", () => {
    it("Сервис доступен по localhost:3000",  () => {
        cy.visit(testUrl);
    });
});
