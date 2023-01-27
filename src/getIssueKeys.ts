import { colors } from './const';
import { getInput, info } from '@actions/core';
import { context, getOctokit } from '@actions/github';

const ISSUE_KEY_REGEX = /[A-Z]{2,}-\d+/;

export default async function getIssueKeys() {
  const githubToken = getInput('githubToken', { required: true });
  const octokit = getOctokit(githubToken);
  const payload = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: Number(context.payload.pull_request?.number),
    per_page: 100,
  };

  let shouldFetchMore = true;
  let page = 1;
  let issueKeys: string[] = [];

  info(`${colors.white}⏳ Extracting issue keys from commits...`);

  while (shouldFetchMore) {
    const res = await octokit.rest.pulls.listCommits({ ...payload, page });
    const filtered = res.data
      .map(({ commit }) => ISSUE_KEY_REGEX.exec(commit.message)?.[0])
      .filter(Boolean) as string[];
    issueKeys = [...issueKeys, ...filtered];
    if (res.data?.length !== 100) {
      shouldFetchMore = false;
    } else {
      page += 1;
    }
  }

  const uniqueIssueKeys = [...new Set(issueKeys)].sort();

  info(
    `${colors.green}✅ Found ${uniqueIssueKeys.length} issue keys: ${uniqueIssueKeys.join(', ')}`,
  );

  return uniqueIssueKeys;
}
