import {testUrl, dataTestCircle, dataTestContentCircle, dataTestChanging, dataTestDefault} from '../../src/utils/constants';

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
            cy.get(dataTestCircle)
            cy.tick(500)

            cy.get(dataTestCircle)
                .eq(i)
                .should("have.text", testingArray[i])
                 cy.get(dataTestContentCircle).eq(i).find(dataTestChanging)
                .parent()
                .should("contain", "top")
            cy.tick(500)
            cy.get(dataTestContentCircle).eq(0).find(dataTestDefault);
        }
    })
    it("Правильность удаления элемента из стека", () => {
        cy.clock()
        for (let i = 0; i < testingArray.length; i++) {
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.tick(1000)
        }
        cy.get(dataTestCircle).as("circles")
        for (let j = 0; j <= testingArray.length; j++) {
            cy.get("@deleteButton").click()
            cy.tick(500)
            cy.get("body").then(($body) => {
                if ($body.text().includes(dataTestCircle)) {
                    cy.get(dataTestCircle)
                        .eq(testingArray.length - 1 - j)
                    cy.get(dataTestContentCircle).eq(1).find(dataTestChanging);
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

        cy.get(dataTestCircle).should("have.length", 0)
    })
})
