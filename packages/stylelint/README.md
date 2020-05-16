[![Betterer](https://raw.githubusercontent.com/phenomnomnominal/betterer/master/docs/logo.png)](https://phenomnomnominal.github.io/betterer/)

# `@betterer/stylelint`

[![npm version](https://img.shields.io/npm/v/@betterer/stylelint.svg)](https://www.npmjs.com/package/@betterer/stylelint)

[**StyleLint**](https://stylelint.io/) test for [**`Betterer`**](https://github.com/phenomnomnominal/betterer).

## Description

Use this test to incrementally introduce StyleLint configuration to your codebase!

## Usage

```typescript
import { stylelintBetterer } from '@betterer/stylelint';

export default {
  'no empty line before rule': stylelintBetterer('./docs/**/*.css', ['rule-empty-line-before', 'always'])
};
```

### Skip

Skip a test by calling `.skip()`:

```typescript
import { stylelintBetterer } from '@betterer/stylelint';

export default {
  'no empty line before rule': stylelintBetterer(...).skip()
};
```

### Only

Run a test by itself by calling `.only()`:

```typescript
import { stylelintBetterer } from '@betterer/stylelint';

export default {
  'no empty line before rule': stylelintBetterer(...).only()
};
```

### Exclude

Exclude files from a test by calling `.exclude()`:

```typescript
import { stylelintBetterer } from '@betterer/stylelint';

export default {
  'no empty line before rule': stylelintBetterer(...).exclude(/excluded-file-regexp/)
};
```
