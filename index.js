const github = require('@actions/github')

try {
  const version = github.context.ref.replace('refs/tags/', '')

  core.setOutput('version', version)
} catch (error) {
  core.setFailed(error.message);
}
