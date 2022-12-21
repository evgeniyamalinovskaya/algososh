import {testUrl, dataTestCircle, dataTestModified, dataTestDefault, dataTestChanging} from '../../src/utils/constants';

describe("Страница Строки отображается правильно", () => {
    beforeEach(() => {
        cy.visit(`${testUrl}/recursion`)
        cy.get("input").as("input")
        cy.get("input").should('have.value', '');
        cy.get("button").as("button")
    })
    it("Кнопка отключена при первоначальном открытии", () => {
        cy.get("@button").should("be.disabled")
    })
    it("Строка разворачивается корректно", () => {
        cy.get("input").type('12345');
        cy.get("button").eq(1).click();

        cy.get(dataTestCircle)
            .should('have.length', 5)
            .each((el, index) => {
                cy.wrap(el => expect(el).contains(index + 1));
                if (index === 0 || index === 4) {
                    cy.wrap(el).get(dataTestChanging);
                }
                if (index === 1) {
                    cy.wrap(el).get(dataTestDefault);
                }
            });

        cy.get(dataTestCircle)
            .should('have.length', 5)
            .each((el, index) => {
                cy.wrap(el).contains(5 - index);
                cy.wrap(el).get(dataTestModified);
            });
    });
    })

