/* eslint-env jest */

const { extractVersionFromRef } = require('../src/extract')

describe('extractVersionFromRef', () => {
  describe('raw version', () => {
    test('should return undefined results if the ref is null', () => {
      // Given
      const ref = null

      // When
      const { version, versionWithoutV } = extractVersionFromRef(ref)

      // Then
      expect(version).toBeUndefined()
      expect(versionWithoutV).toBeUndefined()
    })

    test('should return the ref itself, if it\'s a single segment', () => {
      // Given
      const ref = '1.2.3'

      // When
      const { version, versionWithoutV } = extractVersionFromRef(ref)

      // Then
      expect(version).toBe(ref)
      expect(versionWithoutV).toBe(ref)
    })

    test('should return the ref itself and it\'s v-stripped version, if the ref is a single segment', () => {
      // Given
      const ref = 'v1.2.3'

      // When
      const { version, versionWithoutV } = extractVersionFromRef(ref)

      // Then
      expect(version).toBe(ref)
      expect(versionWithoutV).toBe('1.2.3')
    })

    test('should strip leading segments', () => {
      // Given
      const ref = 'ref/tags/release/1.2.3'

      // When
      const { version, versionWithoutV } = extractVersionFromRef(ref)

      // Then
      expect(version).toBe('1.2.3')
      expect(versionWithoutV).toBe('1.2.3')
    })

    test('should strip leading segments and remove the v-prefix', () => {
      // Given
      const ref = 'ref/tags/release/v1.2.3'

      // When
      const { version, versionWithoutV } = extractVersionFromRef(ref)

      // Then
      expect(version).toBe('v1.2.3')
      expect(versionWithoutV).toBe('1.2.3')
    })
  })

  describe('semver', () => {
    test('should return no semver parts if the ref is null', () => {
      // Given
      const ref = null

      // When
      const { major, minor, patch } = extractVersionFromRef(ref)

      // Then
      expect(major).toBeUndefined()
      expect(minor).toBeUndefined()
      expect(patch).toBeUndefined()
    })

    test('should return no semver parts if the ref is does not end in valid semver', () => {
      // Given
      const ref = 'not-semver'

      // When
      const { major, minor, patch } = extractVersionFromRef(ref)

      // Then
      expect(major).toBeUndefined()
      expect(minor).toBeUndefined()
      expect(patch).toBeUndefined()
    })

    test('should return major-minor-patch semver parts if the ref ends in valid semver', () => {
      // Given
      const ref = 'a/b/v1.2.3'

      // When
      const { major, minor, patch, prerelease, build, isPrerelease } = extractVersionFromRef(ref)

      // Then
      expect(major).toBe('1')
      expect(minor).toBe('2')
      expect(patch).toBe('3')
      expect(prerelease).toBeUndefined()
      expect(build).toBeUndefined()
      expect(isPrerelease).toBe(false)
    })

    test('should return prerelease semver part if the ref ends in valid semver and contains prerelease', () => {
      // Given
      const ref = 'a/b/v1.2.3-ALPHA.0'

      // When
      const { major, minor, patch, prerelease, build } = extractVersionFromRef(ref)

      // Then
      expect(major).toBe('1')
      expect(minor).toBe('2')
      expect(patch).toBe('3')
      expect(prerelease).toBe('ALPHA.0')
      expect(build).toBeUndefined()
    })

    test('should return build semver part if the ref ends in valid semver and contains build', () => {
      // Given
      const ref = 'a/b/v1.2.3+456.1'

      // When
      const { major, minor, patch, prerelease, build } = extractVersionFromRef(ref)

      // Then
      expect(major).toBe('1')
      expect(minor).toBe('2')
      expect(patch).toBe('3')
      expect(prerelease).toBeUndefined()
      expect(build).toBe('456.1')
    })

    test('should return prerelease and build semver part if the ref ends in valid semver and contains prerelease and build', () => {
      // Given
      const ref = 'a/b/v1.2.3-ALPHA.0+456.1'

      // When
      const { major, minor, patch, prerelease, build } = extractVersionFromRef(ref)

      // Then
      expect(major).toBe('1')
      expect(minor).toBe('2')
      expect(patch).toBe('3')
      expect(prerelease).toBe('ALPHA.0')
      expect(build).toBe('456.1')
    })

    test('should return is_prerelease as true if the ref ends in valid semver and contains prerelease', () => {
      // Given
      const ref = 'a/b/v1.2.3-ALPHA.0+456.1'

      // When
      const { major, minor, patch, prerelease, isPrerelease } = extractVersionFromRef(ref)

      // Then
      expect(major).toBe('1')
      expect(minor).toBe('2')
      expect(patch).toBe('3')
      expect(prerelease).toBe('ALPHA.0')
      expect(isPrerelease).toBe(true)
    })
  })
})
