/* eslint-env jest */

const State = {
  ref: '',
  output: {},
  setOutput (key, value) {
    this.output[key] = value
  },
  clear () {
    this.ref = ''
    this.output = {}
  }
}

jest.mock('@actions/github', () => {
  return {
    context: {
      get ref () {
        return State.ref
      }
    }
  }
})

jest.mock('@actions/core', () => {
  return {
    setOutput (key, value) {
      State.setOutput(key, value)
    }
  }
})

const getVersionAction = require('../src')

describe('get-version', () => {
  beforeAll(() => {
    State.clear()
  })

  test('should only set version and version-without-v if the ref does not end in valid semver', () => {
    // Given
    State.ref = 'a/b/v1.0'

    // When
    getVersionAction()

    // Then
    expect(State.output.version).toBe('v1.0')
    expect(State.output['version-without-v']).toBe('1.0')
    expect(State.output['is-semver']).toBeUndefined()
  })

  test('should set all outputs if the ref ends in a valid semver version', () => {
    // Given
    State.ref = 'a/b/v1.2.3-ALPHA.0+456.7'

    // When
    getVersionAction()

    // Then
    expect(State.output.version).toBe('v1.2.3-ALPHA.0+456.7')
    expect(State.output['version-without-v']).toBe('1.2.3-ALPHA.0+456.7')
    expect(State.output.major).toBe('1')
    expect(State.output.minor).toBe('2')
    expect(State.output.patch).toBe('3')
    expect(State.output.prerelease).toBe('ALPHA.0')
    expect(State.output.build).toBe('456.7')
    expect(State.output['is-semver']).toBe('true')
  })
})
