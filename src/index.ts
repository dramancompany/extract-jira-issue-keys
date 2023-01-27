import { error, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { colors } from './const';
import getIssueKeys from './getIssueKeys';

(async () => {
  try {
    if (context.eventName !== 'pull_request' || !context.payload.pull_request) {
      throw new Error('🚫 This action only works on pull requests');
    }
    const issueKeys = await getIssueKeys();
    setOutput('issueKeys', issueKeys.join(','));
  } catch (e: any) {
    error(`${colors.red}${e?.message}`);
    setFailed(e?.message);
  }
})();
