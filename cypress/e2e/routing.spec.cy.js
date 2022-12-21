import {testUrl} from '../../src/utils/constants';

describe('Проверка маршрутизации приложений', function() {
    it('Посещение МБОУ АЛГОСОШ', function() {
        cy.visit(testUrl);
    });

    it('Посещение страницы Строка', () => {
        cy.visit(`${testUrl}/recursion`);
    });

    it('Посещение страницы последовательности Фибоначчи', () => {
        cy.visit(`${testUrl}/fibonacci`);
    });

    it('Посещение страницы сортировки массива', () => {
        cy.visit(`${testUrl}/sorting`);
    });

    it('Посещение страницы Стэк', () => {
        cy.visit(`${testUrl}/stack`);
    });

    it('Посещение страницы очередь', () => {
        cy.visit(`${testUrl}/queue`);
    });

    it('Посещение страницы связный список', () => {
        cy.visit(`${testUrl}/list`);
    });
});
