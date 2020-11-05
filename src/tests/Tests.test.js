import React from 'react'
import { shallow } from 'enzyme'
import Tests from '../components/Tests'

describe("Tests", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Tests />)
  })
})