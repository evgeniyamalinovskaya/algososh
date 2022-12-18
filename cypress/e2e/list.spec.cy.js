const testUrl = 'http://localhost:3000';

describe("Страница Связный список отображается правильно", () => {

    beforeEach(() => {
        cy.visit(`${testUrl}/list`)
        cy.get('[data-testid="input"]').clear().should("have.value", "");
        cy.get('[data-testid="input-index"]').clear().should("have.value", 0);

        cy.contains("button", "Добавить в head").as("addButtonHead").should("be.disabled");
        cy.contains("button", "Добавить в tail").as("addButtonTail").should("be.disabled");
        cy.contains("button", "Удалить из head").as("deleteButtonHead").should("not.be.disabled");
        cy.contains("button", "Удалить из tail").as("deleteButtonTail").should("not.be.disabled");
        cy.contains("button", "Добавить по индексу").as("addButtonIndex").should("be.disabled");
        cy.contains("button", "Удалить по индексу").as("deleteButtonIndex").should("be.disabled");
    })
    it("Проверьте корректность отрисовки дефолтного списка", () => {
        cy.get('[data-testid="circle div"]')
            .each((el, index) => {
                cy.wrap(el).filter('[class*=circle_default]');

                if (index === 0)
                    cy.wrap(el => expect(el).contains("head"));
                if (index === index.length - 1)
                    cy.wrap(el => expect(el).contains("tail"));
            });
    });
    it("Проверьте корректность добавления элемента в head", () => {
        cy.get('[data-testid="input"]').type("6");
        cy.get("@addButtonHead").should("not.be.disabled").click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500)

        cy.get('[data-testid="circle div"]')
            .should("have.length", 5)
            .each((el, index) => {

                if (index === 0)
                    cy.wrap(el => expect(el).contains("6"));
                if (index === 0)
                    cy.wrap(el => expect(el).contains("head"))

            });
    })

    it("Проверьте корректность добавления элемента в tail", () => {
        cy.get('[data-testid="input"]').type("12");
        cy.get("@addButtonTail").should("not.be.disabled").click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500)

        cy.get('[data-testid="circle div"]')
            .should("have.length", 5)
            .each((el, index) => {

                if (index === 0)
                    cy.wrap(el => expect(el).contains("12"));
                if (index === 0)
                    cy.wrap(el => expect(el).contains("tail"))

            });
    })
    it("Проверьте корректность добавления элемента по индексу", () => {
        cy.get('[data-testid="input"]').type("5");
        cy.get('[data-testid="input-index"]').type("1");
        cy.get("@addButtonIndex").click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500 * 4);

        cy.get('[data-testid="input"]').should("have.length", 1);
        cy.get('[data-testid="input"]')
            .each((el, index) => {
                if (index === 1) cy.wrap(el => expect(el).contains("5"));
            });


    });
    it("Проверьте корректность удаления элемента из head", () => {
        cy.get("@deleteButtonHead").click();
        cy.get('[data-testid="input"]').should("have.length", 1);
        cy.get('[data-testid="input"]')
            .each((el, index) => {
                if (index === 0) cy.wrap(el => expect(el).contains("head"));

                if (index === 5) cy.wrap(el => expect(el).contains("tail"));
            });
    });

    it('Проверьте корректность удаления элемента из tail', () => {
        cy.get("@deleteButtonTail").click();
        cy.get('[data-testid="input"]').should("have.length", 1);
        cy.get('[data-testid="input"]')
            .each((el, index) => {
                if (index === 0) cy.wrap(el => expect(el).contains("head"));

                if (index === 4) cy.wrap(el => expect(el).contains("tail"));
            });
    });

    it("Проверьте корректность удаления элемента по индексу", () => {
        cy.get('[data-testid="input-index"]').type("2");
        cy.get("@deleteButtonIndex").click();

        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500 * 4);

        cy.get('[data-testid="input"]').should("have.length", 1);
        cy.get('[data-testid="input"]')
            .each((el, index) => {
                if (index === 0) cy.wrap(el => expect(el).contains("head"));

                if (index === 3) cy.wrap(el => expect(el).contains("tail"));
            });
    });

})
