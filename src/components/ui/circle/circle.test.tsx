import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from "../../../types/element-states";

//Проверяем при помощи снэпшотов корректную отрисовку элемента:
describe('Тестирование компонента Circle', () => {
    it('Circle без буквы', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с буквами (Snapshot)', () => {
        const tree = renderer.create(<Circle letter={'test text'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с head (Snapshot)', () => {
        const tree = renderer.create(<Circle head={'24'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с react-элементом в head', () => {
        const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с tail', () => {
        const tree = renderer.create(<Circle tail={'24'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с react-элементом в tail', () => {
        const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с индексом', () => {
        const tree = renderer.create(<Circle index={24} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с пропсом isSmall === true', () => {
        const tree = renderer.create(<Circle isSmall />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle в состоянии default', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle в состоянии changing', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle в состоянии modified', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
