const semver = require('semver')

const REF_SEPARATOR = '/'
const PRERELEASE_SEPARATOR = '.'
const BUILD_SEPARATOR = '.'

function extractVersionFromRef (ref) {
  if (!ref) {
    return {}
  }

  const segments = ref.split(REF_SEPARATOR)

  const version = segments.pop()
  const versionWithoutV = version.startsWith('v')
    ? version.substring(1)
    : version

  return {
    version,
    versionWithoutV,
    ...parseSemver(version)
  }
}

function parseSemver (version) {
  const sv = semver.parse(version)

  if (!sv) {
    return {}
  }

  const result = {
    major: sv.major.toString(),
    minor: sv.minor.toString(),
    patch: sv.patch.toString()
  }

  if (sv.prerelease.length > 0) {
    result.prerelease = sv.prerelease.join(PRERELEASE_SEPARATOR)
  }

  if (sv.build.length > 0) {
    result.build = sv.build.join(BUILD_SEPARATOR)
  }

  return result
}

module.exports = {
  extractVersionFromRef
}
