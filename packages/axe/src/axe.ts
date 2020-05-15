import { BettererTest } from '@betterer/betterer';
import { smaller } from '@betterer/constraints';
import { AxePuppeteer } from 'axe-puppeteer';
import { launch } from 'puppeteer';

import { URL_REQUIRED } from './errors';
import { BettererAxeOptions } from './types';

export function axeBetterer(url: string, options: BettererAxeOptions = {}): BettererTest<number> {
  if (!url) {
    throw URL_REQUIRED();
  }

  const { axeOptions, puppeteerOptions } = options;

  return new BettererTest<number>({
    async test(): Promise<number> {
      let results = null;
      const browser = await launch(puppeteerOptions || {});
      const [page] = await browser.pages();

      let error = null;
      try {
        await page.goto(url);
        const axe = new AxePuppeteer(page);
        axe.configure(axeOptions || {});
        results = await new AxePuppeteer(page).analyze();
      } catch (e) {
        error = e;
      }

      const pages = await browser.pages();
      await Promise.all(pages.map((page) => page.close()));

      await browser.close();

      if (!results) {
        throw error;
      }

      return results.violations.length;
    },
    constraint: smaller
  });
}
