import React from 'react';
import { render, screen, waitFor} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {StringComponent} from "./string";
import userEvent from "@testing-library/user-event";

// Тестирование алгоритма разворота строки
jest.setTimeout(10000)
describe('Корректно разворачивает строку',() => {
    it('Строка с чётным количеством символов', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = "Тест";
        userEvent.type(input, testString)
        expect(input).toHaveValue(testString)
        userEvent.click(button)
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join("")).toBe(Array(testString).reverse().join(""))
        }, {timeout: 1000})

    })
})
