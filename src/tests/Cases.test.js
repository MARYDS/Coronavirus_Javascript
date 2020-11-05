import React from 'react'
import { shallow } from 'enzyme'
import Cases from '../components/Cases'

describe("Cases", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Cases />)
  })
})