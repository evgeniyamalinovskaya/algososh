import React from 'react';
import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {StringComponent} from "./string";
import userEvent from '@testing-library/user-event';

// Тестирование алгоритма разворота строки
jest.setTimeout(10000)
describe('Корректно разворачивает строку',() => {
    it('Строка с чётным количеством символов', async () => {

        //переходим на страницу String
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');  // data-атрибут testId и использовать это значение при поиске элемента
        const button = screen.getByTestId('button');
        const testString = "string";
        //Предоставляет набор методов для взаимодействия с элементами (Элемент с которым взаимодействует)
        userEvent.type(input, testString)
        expect(input).toBe(testString)
        //Может нажать на кнопку (Элемент с которым взаимодействует)
        fireEvent.click(button)
        //Использование waitFor для ожидания элементов
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join('')).toBe(Array(testString).reverse().join(''))
        }, {timeout: 1000})

    })

    it('Строка с нечетным количеством символов', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = 'world';
        userEvent.type(input, testString)
        expect(input).toBe(testString)
        fireEvent.click(button)
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join('')).tobe(Array(testString).reverse().join(''))
        }, {timeout: 1000})

    })

    it('Строка с одним символом', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = "S";
        userEvent.type(input, testString)
        expect(input).toBe(testString)
        fireEvent.click(button)
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join('')).toBe(testString)
        }, {timeout: 1000})
    })

    it('Строка c пустой строкой', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        userEvent.type(input, '')
        //Использование неправильных утверждений (полученный элемент не отключен)
        expect(button).toBeDisabled()
    })
})
