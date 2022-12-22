import {testUrl, dataTestContentCircle, dataTestChanging, dataTestDefault} from '../../src/utils/constants';

describe("Страница Очереди отображается правильно", () => {
    beforeEach(() => {
        cy.visit(`${testUrl}/queue`);
        cy.get("input").should('have.value', '');
        cy.get("button").eq(1).should('be.disabled');
    })
    it("Кнопки отключены при первоначальном открытии", () => {
        cy.get("input").should("be.empty")
        cy.get("button").eq(1).should('be.disabled');
    })
    it("Правильность добавления элемента в очередь курсоры head и tail отрисовываются корректно", () => {

        cy.get("input").type('1');
        cy.get("button").eq(1).click();

        cy.get(dataTestContentCircle).eq(0).find(dataTestChanging);
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);
        cy.get(dataTestContentCircle).eq(0).contains('1');
        cy.get(dataTestContentCircle).eq(0).contains('head');
        cy.get(dataTestContentCircle).eq(0).contains('tail');
        cy.get(dataTestContentCircle).eq(0).find(dataTestDefault);

        cy.get("input").type('2');
        cy.get("button").eq(1).click();

        cy.get(dataTestContentCircle).eq(1).find(dataTestChanging);
        cy.get(dataTestContentCircle).eq(1).contains('tail');
        cy.get(dataTestContentCircle).eq(0).contains('tail').should('not.exist');
        cy.get(dataTestContentCircle).eq(0).contains('head');

        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);

        cy.get("input").type('3');
        cy.get("button").eq(1).click();

        cy.get(dataTestContentCircle).eq(2).find(dataTestChanging);
        cy.get(dataTestContentCircle).eq(2).contains('tail');
        cy.get(dataTestContentCircle).eq(1).contains('tail').should('not.exist');
        cy.get(dataTestContentCircle).eq(0).contains('head');

    })

    it("Правильность удаления элемента из очереди", () => {
        cy.get("input").type('4');
        cy.get("button").eq(1).click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);

        cy.get("input").type('5');
        cy.get("button").eq(1).click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);

        cy.get("input").type('6');
        cy.get("button").eq(1).click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);

        cy.get("button").eq(2).click();

        cy.get(dataTestContentCircle)
            .each((el, index) => {
                if (index === 0) cy.wrap(el).find(dataTestChanging);
                if (index !== 0) cy.wrap(el).find(dataTestDefault);
            });

        cy.get(dataTestContentCircle)
            .each((el, index) => {
                if (index === 0) cy.wrap(el).find(dataTestDefault);
                if (index === 1) cy.wrap(el).contains('head');
            });

        cy.get("button").eq(2).click();

        cy.get(dataTestContentCircle)
            .each((el, index) => {
                if (index === 1) cy.wrap(el).find(dataTestChanging);
                if (index !== 1) cy.wrap(el).find(dataTestDefault);
            });

        cy.get(dataTestContentCircle)
            .each((el, index) => {
                if (index === 1) cy.wrap(el).find(dataTestDefault);
                if (index === 2) cy.wrap(el).contains('head');
            });
    });

    it('Кнопка Очистить работает корректно', () => {
        cy.get("input").type('1');
        cy.get("button").eq(1).click();

        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);
        cy.get("input").type('2');
        cy.get("button").eq(1).click();

        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(500);
        cy.get("button").eq(3).click();

        cy.get(dataTestContentCircle).eq(0).contains('1').should('not.exist');
        cy.get(dataTestContentCircle).eq(1).contains('2').should('not.exist');
    });

})
