import { regexpBetterer } from '@betterer/regexp';
import { stylelintBetterer } from '@betterer/stylelint';
import { tsqueryBetterer } from '@betterer/tsquery';

export default {
  'no hack comments': regexpBetterer('./packages/**/src/**/*.ts', /(\/\/\s*HACK)/i),
  'no raw console.log': tsqueryBetterer(
    './tsconfig.json',
    'CallExpression > PropertyAccessExpression[expression.name="console"][name.name="log"]'
  ).exclude(/logger\/src/, /betterer\/src\/reporters/),
  'no empty line before rule': stylelintBetterer('./docs/**/*.css', ['rule-empty-line-before', 'always'])
};
