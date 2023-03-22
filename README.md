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

## 배포 순서

### 1. package.json의 버전 수정

### 2. 빌드

```bash
$ pnpm build
```

### 3. main 브랜치에 merge 혹은 push

### 4. 버전 태그 생성

```
$ git tag -am "v1.0.0" v1.0.0
$ git push --follow-tags
```

### 5. Github Release 생성

![image](https://user-images.githubusercontent.com/28733869/226802590-c4e23c60-85ad-4147-b369-c80e30a0f217.png)
![image](https://user-images.githubusercontent.com/28733869/226802836-4ce59161-5254-4fd5-962b-1c2e94771bcb.png)
