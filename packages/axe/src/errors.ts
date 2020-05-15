import { registerError } from '@betterer/errors';

export const URL_REQUIRED = registerError(
  () => "For `@betterer/axe` to work, you need to provide the url to a website, e.g. `'https://www.google.com'`. ❌"
);
