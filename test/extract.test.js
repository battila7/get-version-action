const { extractVersionFromRef } = require('../src/extract')

describe('extractVersionFromRef', () => {
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
        expect(versionWithoutV).toBeUndefined()
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
        expect(versionWithoutV).toBeUndefined()
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
