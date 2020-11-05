import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../components/Footer'

describe("Footer", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Footer />)
  })
})