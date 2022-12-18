const testUrl = 'http://localhost:3000';

describe("Страница Стэк отображается правильно", () => {
    const testingArray = [1, 2, 3, 4]

    beforeEach(() => {
        cy.visit(`${testUrl}/stack`)
        cy.get("input").should('have.value', '');
        cy.contains("button", "Добавить").as("addButton")
        cy.contains("button", "Удалить").as("deleteButton")
        cy.contains("button", "Очистить").as("clearButton")
    })
    it("Кнопки отключены при первоначальном открытии", () => {
        cy.get("input").should("be.empty")
        cy.get("@addButton").should("be.disabled")
        cy.get("@deleteButton").should("be.disabled")
        cy.get("@clearButton").should("be.disabled")
    })
    it("Правильность добавления элемента в стек", () => {
        for (let i = 0; i < testingArray.length; i++) {
            cy.clock()
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.get('[data-testid="circle div"]')
            cy.tick(500)

            cy.get('div[data-testid="circle div"]')
                .eq(i)
                .should("have.text", testingArray[i])
                 cy.get('[class*=circle_content]').eq(i).find('[class*=circle_changing]')
                .parent()
                .should("contain", "top")
            cy.tick(500)
            cy.get('[class*=circle_content]').eq(0).find('[class*=circle_default]');
        }
    })
    it("Правильность удаления элемента из стека", () => {
        cy.clock()
        for (let i = 0; i < testingArray.length; i++) {
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.tick(1000)
        }
        cy.get('[data-testid="circle div"]').as("circles")
        for (let j = 0; j <= testingArray.length; j++) {
            cy.get("@deleteButton").click()
            cy.tick(500)
            cy.get("body").then(($body) => {
                if ($body.text().includes('div[data-testid="circle div"]')) {
                    cy.get('div[data-testid="circle div"]')
                        .eq(testingArray.length - 1 - j)
                    cy.get('[class*=circle_content]').eq(1).find('[class*=circle_changing]');
                }
            })
        }
    })
    it("Правильность очистки из стека", () => {
        cy.clock()
        for (let i = 0; i < testingArray.length; i++) {
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.tick(1000)
        }
        cy.get("@clearButton").should("not.be.disabled").click()
        cy.tick(500)

        cy.get('[data-testid="circle div"]').should("have.length", 0)
    })
})
