import React from 'react'
import { mount } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'
import Title from '../pages/title'
import Index from '../pages/index'

// for testing-library
test('loads and displays ui', async ()=> {
})

describe('Title component', () => {
  it('Should render', () => {
    const wrapper = mount(<Title label="test" />);

    expect(wrapper.find('h1')).toHaveLength(1);
  })
})
