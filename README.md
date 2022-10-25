# GitHub Action for Changie

Run Changie in GitHub actions.

Full inputs and outputs can be seen in the [action.yaml](./action.yaml).

## Examples

### Generate next release pull request
```yaml
on:
  workflow_dispatch:
    inputs:
      next-version:
        description: 'Next version use vX.Y.Z, patch, minor or major'
        default: 'patch'
        required: true

jobs:
  generate-pr:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Batch changes
      uses: miniscruff/changie-action@main
      with:
        version: latest
        args: batch ${{ github.event.inputs.next-version }}
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    - name: Merge changes
      uses: miniscruff/changie-action@main
      with:
        version: latest
        args: merge
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    - name: Get the latest version
      id: latest
      uses: miniscruff/changie-action@main
      with:
        version: latest
        args: latest
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v4
      with:
        title: Release ${{ steps.latest.outputs.output }}
        branch: release/${{ steps.latest.outputs.output }}
        commit-message: Release ${{ steps.latest.outputs.output }}
```
