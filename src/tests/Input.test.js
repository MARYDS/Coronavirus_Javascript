import React from 'react'
import { shallow } from 'enzyme'
import Input from '../components/Input'

describe("Input", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Input />)
  })
})