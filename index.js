const core = require('@actions/core')
const github = require('@actions/github')

try {
  const version = github.context.ref.replace('refs/tags/', '')

  let versionWithoutV = version
  if (version.startsWith('v')) {
    versionWithoutV = version.substr(1)
  }

  core.setOutput('version', version)
  core.setOutput('version-without-v', versionWithoutV)
} catch (error) {
  core.setFailed(error.message);
}
