# GitHub Action for Changie

Run Changie in GitHub actions.

Full inputs and outputs can be seen in the [action.yml](./action.yml).

## Examples

### Generate next release pull request using auto mode
```yaml
on:
  workflow_dispatch:

jobs:
  generate-pr:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Batch changes
      uses: miniscruff/changie-action@v1
      with:
        version: latest
        args: batch auto

    - name: Merge changes
      uses: miniscruff/changie-action@v1
      with:
        version: latest
        args: merge

    - name: Get the latest version
      id: latest
      uses: miniscruff/changie-action@v1
      with:
        version: latest
        args: latest

    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v4
      with:
        title: Release ${{ steps.latest.outputs.output }}
        branch: release/${{ steps.latest.outputs.output }}
        commit-message: Release ${{ steps.latest.outputs.output }}
```
