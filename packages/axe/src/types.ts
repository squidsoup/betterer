import { Spec } from 'axe-core';
import { LaunchOptions } from 'puppeteer';

export type BettererAxeOptions = {
  axeOptions?: Spec;
  puppeteerOptions?: LaunchOptions;
};
