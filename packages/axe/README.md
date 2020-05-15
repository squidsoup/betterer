[![Betterer](https://raw.githubusercontent.com/phenomnomnominal/betterer/master/docs/logo.png)](https://phenomnomnominal.github.io/betterer/)

# `@betterer/axe`

[![npm version](https://img.shields.io/npm/v/@betterer/axe.svg)](https://www.npmjs.com/package/@betterer/axe)

[Axe](https://github.com/dequelabs/axe-core) test for [**`Betterer`**](https://github.com/phenomnomnominal/betterer).

## Description

Use this test to incrementally improve the accessibility of your website!

## Usage

```typescript
import { axeBetterer } from '@betterer/axe';

export default {
  'improve accessibility': axeBetterer('https://phenomnomnominal.github.io/betterer/')
};
```

### Skip

Skip a test by calling `.skip()`:

```typescript
import { axeBetterer } from '@betterer/axe';

export default {
  'improve accessibility': axeBetterer('...').skip()
};
```

### Only

Run a test by itself by calling `.only()`:

```typescript
import { axeBetterer } from '@betterer/axe';

export default {
  'improve accessibility': axeBetterer('...').only()
};
```
