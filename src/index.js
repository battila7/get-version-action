const core = require('@actions/core')
const github = require('@actions/github')

const { extractVersionFromRef } = require('./extract')

try {
  const { version, versionWithoutV } = extractVersionFromRef(github.context.ref)

  if (version) {
    core.setOutput('version', version)
  }

  if (versionWithoutV) {
    core.setOutput('version-without-v', versionWithoutV)
  }
} catch (error) {
  core.setFailed(error.message)
}
