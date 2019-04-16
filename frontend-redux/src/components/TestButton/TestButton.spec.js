import React from 'react';
import Button from './TestButton';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TestComponent from 'helpers/testHelper';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <TestComponent>
        <Button type='button'>Button</Button>
      </TestComponent>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Button receive type and class', () => {
  const button = shallow(
    <TestComponent>
      <Button className='test' type='button'>Button</Button>
    </TestComponent>
  );
  expect(button.children().props().type).toEqual('button');
  expect(button.children().props().className).toEqual('test');
});
