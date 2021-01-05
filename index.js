const core = require('@actions/core')
const github = require('@actions/github')

try {
  const pattern = /refs\/tags\/|refs\/heads\/release\//;
  const version = github.context.ref.replace(pattern, '')

  let versionWithoutV = version
  if (version.startsWith('v')) {
    versionWithoutV = version.substr(1)
  }

  core.setOutput('version', version)
  core.setOutput('version-without-v', versionWithoutV)
} catch (error) {
  core.setFailed(error.message);
}
