# Get Version Action

A GitHub Action which extracts the version from `github.ref`.

Finally, you can reliably get the pushed version on every platform. Now includes support for semver!

## Outputs

### `version`

The pushed version. If `github.ref` was `refs/tags/v1.2.7` or `refs/heads/release/v1.2.7` then the value of this output will be `v1.2.7`.

### `version-without-v`

The pushed version with the leading `v` stripped. If `github.ref` was `refs/tags/v1.2.7` then the value of this output will be `1.2.7`.

If the version does not start with a leading `v` character, then the value of this output is the same as that of `version`.

### `is-semver`

Set to `true` if the pushed version is a valid [semver](https://semver.org/) value. If it's not, then this output will not be set.

### `major`

The semver major version, for example `1` in the case of `v1.2.3-ALPHA.0+BUILD.1`.

### `minor`

The semver minor version, for example `2` in the case of `v1.2.3-ALPHA.0+BUILD.1`.

### `patch`

The semver patch version, for example `3` in the case of `v1.2.3-ALPHA.0+BUILD.1`.

### `prerelease`

The semver prerelease version, for example `ALPHA.0` in the case of `v1.2.3-ALPHA.0+BUILD.1`.

### `build`

The semver build version, for example `BUILD.1` in the case of `v1.2.3-ALPHA.0+BUILD.1`.

## Example usage

~~~~YML
steps:
    - id: get_version
      uses: battila7/get-version-action@v2

    - run: echo ${{ steps.get_version.outputs.version }}

    - run: echo ${{ steps.get_version.outputs.version-without-v }}
~~~~
