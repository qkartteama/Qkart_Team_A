import {test, Locator, expect} from '@playwright/test';
import {Page} from '@playwright/test';

export class ProductValidation{
    private page: Page;
    private shoeProduct: string;
    private shoeProductImage: string;
    private shoeProductPrice: string;
    private shoeProductRatings: string;
    private addToCartButtonVisibility: string;
    private addToCartButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.shoeProduct = ("//p[text()='Roadster Mens Running Shoes']");
        this.shoeProductImage = ("//img[@alt='Roadster Mens Running Shoes']");
        this.shoeProductPrice = ("//p[text()='Roadster Mens Running Shoes']/following-sibling::p");
        this.shoeProductRatings = ("//p[text()='Roadster Mens Running Shoes']/following-sibling::span[@aria-label='5 Stars']");
        this.addToCartButton = page.locator("//p[text()='Roadster Mens Running Shoes']/ancestor::div[contains(@class,'card')]//button[contains(.,'Add to cart')]");
        this.addToCartButtonVisibility = ("//p[text()='Roadster Mens Running Shoes']/ancestor::div[contains(@class,'card')]//button[contains(.,'Add to cart')]");
    
    }

    async GoToURL(url: string) {
        await this.page.goto(url);
    }
    async verifyShoeProduct() {
       await expect(this.page.locator(this.shoeProduct)).toBeVisible();
    }
    async verifyShoeProductName() {
       await expect(this.page.locator(this.shoeProduct)).toHaveText("Roadster Mens Running Shoes");
    }
    async verifyShoeProductImage(){
        await expect(this.page.locator(this.shoeProductImage)).toBeVisible();
    }
    async verifyShoeProductPrice(){
        await expect(this.page.locator(this.shoeProductPrice)).toHaveText("$30");
        console.log("Price of the product is: " + await this.page.locator(this.shoeProductPrice).textContent());
    }
    async verifyShoeProductRatings(){
        await expect(this.page.locator(this.shoeProductRatings)).toBeVisible();
        console.log("Ratings of the product is: " + await this.page.locator(this.shoeProductRatings).getAttribute('aria-label'));
    }
    async clickAddToCartButton(){
        await this.addToCartButton.click();
    }
    async verifyAddToCartButtonVisibility(){
        await expect(this.page.locator(this.addToCartButtonVisibility)).toBeVisible();
    }

}
//module.exports = { ProductValidation }