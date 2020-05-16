import { BettererFileTest, BettererFileIssuesMapRaw } from '@betterer/betterer';
import * as stack from 'callsite';
import { promises as fs } from 'fs';
import * as glob from 'glob';
import LinesAndColumns from 'lines-and-columns';
import * as minimatch from 'minimatch';
import * as path from 'path';
import { lint } from 'stylelint';
import { promisify } from 'util';

import { FILE_GLOB_REQUIRED, RULE_OPTIONS_REQUIRED } from './errors';

const globAsync = promisify(glob);

type StyleLintRuleConfig = [string, null | unknown | Record<string, unknown>];

export function stylelintBetterer(globs: string | ReadonlyArray<string>, rule: StyleLintRuleConfig): BettererFileTest {
  if (!globs) {
    throw FILE_GLOB_REQUIRED();
  }
  if (!rule) {
    throw RULE_OPTIONS_REQUIRED();
  }

  const [, callee] = stack();
  const cwd = path.dirname(callee.getFileName());
  const globsArray = Array.isArray(globs) ? globs : [globs];
  const resolvedGlobs = globsArray.map((glob) => path.resolve(cwd, glob));

  const [ruleName, ruleOptions] = rule;

  return new BettererFileTest(async (files) => {
    let testFiles: Array<string> = [];
    if (files.length !== 0) {
      testFiles = files.filter((filePath) => resolvedGlobs.find((currentGlob) => minimatch(filePath, currentGlob)));
    } else {
      await Promise.all(
        resolvedGlobs.map(async (currentGlob) => {
          const globFiles = await globAsync(currentGlob);
          testFiles.push(...globFiles);
        })
      );
    }

    const { results } = await lint({
      files: testFiles,
      config: {
        rules: { [ruleName]: ruleOptions }
      }
    });

    const fileIssuesMap: BettererFileIssuesMapRaw = {};
    await Promise.all(
      results.map(async (issue) => {
        const filePath = issue.source;
        const source = await fs.readFile(filePath, 'utf-8');
        const issues = issue.warnings.map((warning) => {
          const { line, column, text } = warning;
          const lc = new LinesAndColumns(source);
          const startLocation = lc.indexForLocation({
            line: line - 1,
            column: column - 1
          });
          return {
            message: text,
            filePath: filePath,
            fileText: source,
            start: startLocation as number,
            end: startLocation as number
          };
        });
        fileIssuesMap[filePath] = issues;
      })
    );
    return fileIssuesMap;
  });
}
