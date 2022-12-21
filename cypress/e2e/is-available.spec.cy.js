import {testUrl} from '../../src/utils/constants';

describe("Сервис загружен", () => {
    it("Сервис доступен по localhost:3000", () => {
        cy.visit(testUrl);
    });
});
