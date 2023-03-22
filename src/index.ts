import { error, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { colors } from './const';
import getIssueKeys from './getIssueKeys';

(async () => {
  try {
    if (context.eventName !== 'pull_request' || !context.payload.pull_request) {
      throw new Error('🚫 PR에서만 동작하는 액션입니다!');
    }
    const issueKeys = await getIssueKeys();
    setOutput('issueKeys', issueKeys.join(','));
  } catch (e: any) {
    error(`${colors.red}${e?.message}`);
    setFailed(e?.message);
  }
})();
