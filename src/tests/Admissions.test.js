import React from 'react'
import { shallow } from 'enzyme'
import Admissions from '../components/Admissions'

describe("Admissions", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Admissions />)
  })
})