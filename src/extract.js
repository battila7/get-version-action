const REF_SEPARATOR = '/'

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
    versionWithoutV
  }
}

module.exports = {
  extractVersionFromRef
}
