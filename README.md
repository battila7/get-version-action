# Get Version Action

A GitHub Action which extracts the version from `github.ref`.

Finally, you can reliably get the pushed version on every platform.

## Outputs

### `version`

The pushed version. If `github.ref` was `/refs/tags/v1.2.7` then the value of this output will be `v1.2.7`.

### `version-without-v`

The pushed version with the leading `v` stripped. If `github.ref` was `/refs/tags/v1.2.7` then the value of this output will be `1.2.7`.

If the version does not start with a leading `v` character, then the value of this output is the same as that of `version`.

## Example usage

~~~~YML
steps:
    - id: get_version
      uses: battila7/get-version-action@v2

    - run: echo ${{ steps.get_version.outputs.version }}

    - run: echo ${{ steps.get_version.outputs.version-without-v }}
~~~~
