import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import { parse } from 'csv-parse/sync';

import { LoginPage } from '../../Pages/login';
import { ProductValidation } from '../../Pages/ProductValidation.ts';


dotenv.config({ path: `./.env.${process.env.setenv}` });
console.log(process.env.setenv + " env name")

test('001_ProductValidation', async ({ page, context }) => {
  test.setTimeout(1500000);

  const records = parse(
    fs.readFileSync(path.join(process.cwd(), 'Data', 'ProductValidationData.csv'),
      'utf-8'
    ),
    {
      columns: true,
      skip_empty_lines: true
    }
  );

const loginPage = new LoginPage(page);
await loginPage.navigateToLoginPage(records[0].URL);
await loginPage.login(records[0].Username, records[0].Password);


//tc-01  Verify "Roadster Mens Running Shoes" is available on home page
const ProductValidationPage = new ProductValidation(page);
await ProductValidationPage.verifyShoeProduct();
//tc-02  Verify "Roadster Mens Running Shoes" image is displayed on home page
await ProductValidationPage.verifyShoeProductImage();
//tc-03  Verify "Roadster Mens Running Shoes" name is displayed on home page
await ProductValidationPage.verifyShoeProductName();
//tc-04  Verify "Roadster Mens Running Shoes" price is displayed on home page
await ProductValidationPage.verifyShoeProductPrice();
//tc-05  Verify "Roadster Mens Running Shoes" ratings is displayed on home page
await ProductValidationPage.verifyShoeProductRatings();
//tc-06  Verify "Add to cart" button is displayed for "Roadster Mens Running Shoes"
await ProductValidationPage.verifyAddToCartButtonVisibility();
//tc-07  Click on "Add to cart" button for "Roadster Mens Running Shoes"
await ProductValidationPage.clickAddToCartButton();
await page.pause();
});