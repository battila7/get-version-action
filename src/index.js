const core = require('@actions/core')
const github = require('@actions/github')

const { extractVersionFromRef } = require('./extract')

const OUTPUTS = {
  version: 'version',
  versionWithoutV: 'version-without-v',
  major: 'major',
  minor: 'minor',
  patch: 'patch',
  prerelease: 'prerelease',
  build: 'build'
}

try {
  const result = extractVersionFromRef(github.context.ref)

  Object.keys(result).forEach(key => {
    core.setOutput(OUTPUTS[key], result[key])
  })

  if (Object.prototype.hasOwnProperty.call(result, 'major')) {
    core.setOutput('is-semver', 'true')
  }
} catch (error) {
  core.setFailed(error.message)
}
