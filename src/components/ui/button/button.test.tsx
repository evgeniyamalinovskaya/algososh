import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

//Проверяем при помощи снэпшотов корректную отрисовку:
describe('Тестирование компонента Button', () => {
    it('Кнопка c текстом', () => {
        //Рендерим Button с текстом
        const tree = renderer.create(<Button text={'test text'} />).toJSON();
        //Проверка, toMatchSnapshot() сравнивает входные данные выходным данным
        expect(tree).toMatchSnapshot();
    });

    it('Кнопка без текста', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Заблокированной кнопки', () => {
        const tree = renderer.create(<Button disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Кнопка с индикацией загрузки', () => {
        const tree = renderer.create(<Button isLoader />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Нажатие на кнопку вызывает alert', () => {
        //Имитация браузерного alert
        window.alert = jest.fn();
        //Рендерим компонент
        render(
            <Button onClick={() => window.alert('text')}
                    text={'test text'}
            />)
        //Находим элемент кнопки
        const button = screen.getByText('test text');
        //Имитируем нажатие на кнопку
        fireEvent.click(button);
        //Проверяем, что alert сработал с правильным текстом предупреждения
        expect(window.alert).toHaveBeenCalledWith('text');
    })
});
