import { Page, Locator, expect, chromium } from '@playwright/test';
import { setTimeout } from 'timers/promises';
import { BrowserContext } from './EngagementPage';
import dotenv from 'dotenv'
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export class utility {
    private page: Page;
    private iframe: string;
    private elementInsideIframe: string;
    private emailToLogin: string;

    constructor(page: Page) {
        this.page = page;
        this.iframe = (`//iframe[$iframeLocator]`);
        this.elementInsideIframe = (`$elementInsideFrame`);
        this.emailToLogin = (`//small[text()="$emailID"]`);
    }

    async openBrowserInNormalMode(url: string) {
        const browser = await chromium.launchPersistentContext('', { channel: 'chrome' })
        const pages = browser.pages();
        this.page = pages[0];
        await this.page.goto(url);
        return this.page;
    }

    async getTestDataFormCSV(Testcase_ID: string) {
        dotenv.config({ path: `./.env.${process.env.setenv}` });
        const testDataName = process.env.testData as string
        const testSuiteName = process.env.testSheetName as string
        const records = parse(fs.readFileSync(path.join('../Data/', testSuiteName + testDataName.replaceAll("\"", "").replaceAll(";", ""))), {
            columns: true,
            skip_empty_lines: true
        });
        const dataRow = records.find(record => record.TC_ID === Testcase_ID);
        return dataRow;
     }

    async getTestDataFormCSVBasedOnTestcaseIDandEnv(Testcase_ID: string, environment: string) {
        dotenv.config({ path: './.env.${process.env.setenv}' });
        const testDataName = process.env.testData as string
        const testSuiteName = process.env.testSheetName as string
        const records = parse(fs.readFileSync(path.join('../Data/', testSuiteName.replaceAll("\"", "").replaceAll(";", ""))), {
            
            columns: true,
            skip_empty_lines: true
        });
        const dataRow = records.find(record => record.TC_ID === Testcase_ID && record.ENV === environment);
        return dataRow;
    }
    
    
    
   
}
module.exports = { utility }