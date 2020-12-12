import React from 'react'
import { mount } from 'enzyme'
import { render, fireEvent, screen, queryByAttribute } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import Title from '../pages/title'
import Home from '../pages/index'

// use testing-library
describe('Home', () => {
  test('displays Edit button', async ()=> {
    render(<Home/>)
    const titles = screen.getAllByRole('button')
    expect(titles[0]).toHaveTextContent('Edit')
  })
  test('displays Clear button', async ()=> {
    render(<Home/>)
    const titles = screen.getAllByRole('button')
    expect(titles[1]).toHaveTextContent('Clear')
  })
  test('click Edit button to remove readonly attribute', async ()=> {
    const getById = queryByAttribute.bind(null, 'id')
    const dom = render(<Home/>)
    fireEvent.click(screen.getByText('Edit'))
    const inputs = getById(dom.container, 'tsmonthlite')
    expect(inputs.hasAttribute('readOnly')).toBeFalsy()
  })
})

describe('Dummy title component', () => {
  it('Should render', () => {
    const wrapper = mount(<Title label="test" />)
    expect(wrapper.find('h1')).toHaveLength(1)
  })
})
