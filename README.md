# Extract JIRA issue keys from PR commits

- This action extracts JIRA issue keys from commits on pull request

## Inputs

| Name          | Required | Description                                      | Default |
| ------------- | -------- | ------------------------------------------------ | ------- |
| `githubToken` | ✅       | Github Token that has right to access repository | -       |

## Outputs

| Name        | DataType | Description                                        | Example             |
| ----------- | -------- | -------------------------------------------------- | ------------------- |
| `issueKeys` | `string` | Extracted JIRA issue keys (comma separated string) | `ABC-0001,ABC-0003` |

## Example Usage

```yaml
on:
  pull_request:
    types: [closed]
    branches: [main]

jobs:
  if: ${{ github.event.pull_request.merged }}
  runs-on: ubuntu-latest
  steps:
    - name: Extract JIRA issue keys
      id: jira-issue-keys
      uses: dramancompany/extract-jira-issue-keys@v1.0.0
      with:
        githubToken: ${{ secrets.GITHUB_TOKEN }}

    - name: Do something with the keys
      run: |
        echo ${{ steps.jira-issue-keys.outputs.issueKeys }}
```
