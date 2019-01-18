import React from 'react';
import renderer from 'react-test-renderer';
import Timer from '../src/components/timer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Timer timer="5" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
