import{CustomWorld} from '../../support/world'
import{Given, When,Then} from '@cucumber/cucumber'
import{chromium,Browser,Page,expect} from '@playwright/test'
import { faker } from '@faker-js/faker'

let browser:Browser;
let page:Page;
        Given('I am on homePage',{timeout: 60000 },
          async function () {
           this.browser= await chromium.launch({headless:false});
           this.page=await this.browser.newPage();
           await this.page.goto('https://automationexercise.com/',{ waitUntil: 'networkidle', timeout: 60000 });
           waitUntil:"domontentaded";
           

         });
       
     When('I click on Signup or login button', async function () {
     await this.page.getByRole('link', { name: ' Signup / Login' }).click()
         });
       
         When('I enter name and Email Address', async function () {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            this.user = { name, email };
     await this.page.locator('input[placeholder="Name"]').fill(name);
     await this.page.locator('input[data-qa="signup-email"]').fill(email);
    });
       When('I click on Signup button', async function () {
               await this.page.getByRole('button',{name:'Signup'}).click()
               });
       
         When('I Enter Account Information', async function () {
       await this.page.locator('#id_gender1').check();
       await this.page.locator('#password').fill('vishwambhar@88');
       await this.page.selectOption('#days',{index:27});
       await this.page.selectOption('#months',{label:'March'});
       await this.page.selectOption('#years',{label:'1995'});
       await this.page.locator('#newsletter').check();
       await this.page.locator('#optin').check();
       await this.page.locator('#first_name').fill('Vishwambhar');
       await this.page.locator('#last_name').fill('Vishwambhar');
       await this.page.locator('#company').fill('Vishwambhar');
       await this.page.locator('#address1').fill('Hinjewadi phase1');
       await this.page.locator('#address2').fill('Pune');
       await this.page.selectOption('#country',{label:'India'});
       await this.page.locator('#state').fill('Maharashtra');
       await this.page.locator('#city').fill('Pune');
       await this.page.locator('#zipcode').fill('443322');
       await this.page.locator('#mobile_number').fill('9988998877');
         });
         When('I click on Create Account',async function () {
          await this.page.locator('button[type="submit"]').first().click();
         });
         Then('My account is created Successfully',async function () {
          const message= this.page.locator('[data-qa="account-created"] b');
          await expect(this.page.locator('[data-qa="account-created"] b')).toHaveText('Account Created!');
          await this.page.locator('[data-qa="continue-button"]').click();// click on continue button
         });
       When('I enter name and Email Address of already registered user',  
        { timeout: 30 * 1000 },
        async function () {
             if (!this.user) {
      this.user = {
        name: "vishwambhar",
        email: "vishwambhar.sarsar@globant.com"
      };
    }
    const signupNameInput = this.page.locator('input[data-qa="signup-name"]');
    const signupEmailInput = this.page.locator('input[data-qa="signup-email"]');
    await signupNameInput.waitFor({ state: "visible", timeout: 30000 });
    await signupEmailInput.waitFor({ state: "visible", timeout: 30000 });
    await signupNameInput.fill(this.user.name);
    await signupEmailInput.fill(this.user.email);
    
       });

       Then('System display Error message',async function () {
        await expect(
        this.page.locator("p", { hasText: "Email Address already exist!" })
        ).toBeVisible();

       })

       When ('I add product to cart',{ timeout: 30000 },async function(){
          const firstProduct = this.page.locator('.product-image-wrapper').first();
          await expect(firstProduct).toBeVisible();
          await firstProduct.hover();
          const overlay1=firstProduct.locator('.overlay-content');
          this.productName1 = (await overlay1.locator('p').innerText()).trim()
          const addToCartBtn = firstProduct.locator('.overlay-content a.add-to-cart');
          await addToCartBtn.waitFor({ state: 'visible', timeout: 10000 });
          await addToCartBtn.click();
          const continueBtn = this.page.locator('button[data-dismiss="modal"]');
          await expect(continueBtn).toBeVisible();
           await continueBtn.click();
           const secondProduct = this.page.locator('.product-image-wrapper').nth(2);
          await secondProduct.hover();
          const overlay2=secondProduct.locator('.overlay-content');
          this.productName2 = (await overlay2.locator('p').innerText()).trim()
          const product2=this.page.locator('.overlay-content').first();
          this.productName2 = (await product2.locator('p').innerText()).trim()
          const addToCartBtn2 = secondProduct.locator('.overlay-content a.add-to-cart');
          await addToCartBtn2.waitFor({ state: 'visible', timeout: 10000 });
          await addToCartBtn2.click();
           const viewCartLink = this.page.locator('a').filter({ hasText: 'View Cart' })
           await viewCartLink.waitFor({ state: 'visible', timeout: 10000 });
           await viewCartLink.click();
       })
        When ('I Proceed to checkout', async function(){
          await this.page.getByText('Proceed To Checkout').click();

       })
       When ('I enter comment and place order', async function(){
         await this.page.locator('textarea[name="message"]').click();
         await this.page.locator('textarea[name="message"]').fill('hi i am checking out');
         await this.page.getByRole('link', { name: 'Place Order' }).click();
       })
       When ('I enter card details and confirm order', async function(){
          await this.page.locator('input[name="name_on_card"]').fill('virat');
          await this.page.locator('input[name="card_number"]').click();
          await this.page.locator('input[name="card_number"]').fill('1234 5623 456');
          await this.page.getByRole('textbox', { name: 'ex.' }).fill('211');
          await this.page.getByRole('textbox', { name: 'MM' }).fill('12');
          await this.page.getByRole('textbox', { name: 'YYYY' }).fill('2030');
          await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
       })
       Then ('my order will place successfully',{timeout:30000}, async function(){
           const confirmation = this.page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
           await confirmation.waitFor({ state: 'visible', timeout: 60000 });
           await expect(confirmation).toHaveText('Congratulations! Your order has been confirmed!');
       })
        When('I enter name as {string} and Email as {string} Address', async function (username,email) {
            const uniqueEmail = `test${Date.now()}@gmail.com`;
              this.currentUserEmail = uniqueEmail;

          await this.page.locator('input[placeholder="Name"]').fill(username);
          await this.page.locator('input[data-qa="signup-email"]').fill(uniqueEmail);
         
         });
          When('I Enter Account Information password as {string} and firstname as {string} and lastname as {string} and company as {string} and Address1 as {string} and Address2 as {string} and State as {string} and city as {string} and Zipcode as {string} and mobilenumber as {string}',
  async function (
    password: string,
    firstname: string,
    lastname: string,
    company: string,
    address1: string,
    address2: string,
    state: string,
    city: string,
    zipcode: string,
    mobilenumber: string
  )  {
           await this.page.locator('#id_gender1').check();
           await this.page.locator('#password').fill(password);
           await this.page.selectOption('#days',{index:27});
           await this.page.selectOption('#months',{label:'March'});
           await this.page.selectOption('#years',{label:'1995'});
       await this.page.locator('#newsletter').check();
       await this.page.locator('#optin').check();
       await this.page.locator('#first_name').fill(firstname);
       await this.page.locator('#last_name').fill(lastname);
       await this.page.locator('#company').fill(company);
       await this.page.locator('#address1').fill(address1);
       await this.page.locator('#address2').fill(address2);
       await this.page.selectOption('#country',{label:'India'});
       await this.page.locator('#state').fill(state);
       await this.page.locator('#city').fill(city);
       await this.page.locator('#zipcode').fill(zipcode);
       await this.page.locator('#mobile_number').fill(mobilenumber);
         });

           Then('I click on logout button', async function() {
            if (!this.page || this.page.isClosed()) {
              console.warn('Page already closed, skipping logout');
               return;
                }

             await this.page.click('a[href="/logout"]');
            await this.page.waitForSelector('button[data-qa="login-button"]'); 
});
          

          Then('I successfully logout', async function(){
            const loginHeader = this.page.getByRole('heading', { name: 'Login to your account' });
            await expect(loginHeader).toBeVisible();

          })

          Then('I login with valid {string} and {string}',{ timeout: 60 * 1000 }, async function (this: CustomWorld, _email, password) {
           const loginEmail = this.currentUserEmail;
           await this.page.locator('input[data-qa="login-email"]').fill(loginEmail);
           await this.page.locator('input[data-qa="login-password"]').fill(password);
           await this.page.locator('button[data-qa="login-button"]').click()
         });
         Then('I should be logged in as {string}', async function (username) {
             await expect(
             this.page.getByText(`Logged in as ${username}`)
             ).toBeVisible();
          });

          When ('I Enter Partial name as {string} of product in search box',async function(partialName){
            await this.page.locator('input#search_product').fill(partialName)


          })
          When ('I press search button', async function(){
          await this.page.locator('button#submit_search').click()


          })
          Then ('I will get product with name containg entered {string}',{ timeout: 30 * 1000 }, async function (partialName){
            await this.page.locator('a[href="/product_details/1"]').click()
           const headers = await this.page.locator('.product-information h2').allTextContents();

            const found = headers.some(text => text.toLowerCase().includes(partialName.toLowerCase()));

              if (!found) {
            throw new Error(`No product header contains "${partialName}". Found headers: ${headers.join(', ')}`);
              }

 
          })
          When('I am loggedin',async function(){
            await this.page.locator('input[data-qa="login-email"]').fill("vishwambhar.sarsar@globant.com");
           await this.page.locator('input[data-qa="login-password"]').fill("Vishwambhar@88");
           await this.page.locator('button[data-qa="login-button"]').click()

          })
          When('I click on products button',async function(){
            await this.page.locator('a[href="/products"]').click();

          })

          When('I click on Cart button',async function(){
           await this.page.getByRole('link', { name: /cart/i }).first().click();

          })

          Then('I verify guest cart becomes usercart after login', { timeout: 20000 },async function(){
            const cartItems = this.page.locator('.cart_description h4 a');
            await expect(cartItems).toHaveCount(2, { timeout: 10000 });

    const cartTexts = await cartItems.allTextContents();
    if (!cartTexts.includes(this.productName1)) {
        throw new Error(`Expected product "${this.productName1}" in cart, but got: ${cartTexts}`);
    }
    if (!cartTexts.includes(this.productName2)) {
        throw new Error(`Expected product "${this.productName2}" in cart, but got: ${cartTexts}`);
    }
          })
          Given('I am on homepage of SauceDemo.com',{timeout: 60000 },
          async function () {
           this.browser= await chromium.launch({headless:false});
           this.page=await this.browser.newPage();
           await this.page.goto('https://www.saucedemo.com/inventory.html',{ waitUntil: 'networkidle', timeout: 60000 });
           waitUntil:"domontentaded";
         });

         When('I enter Valid username and password and Click on login button',async function(){
          await this.page.locator('#user-name').fill("standard_user");
          await this.page.locator('#password').fill("secret_sauce");
          await this.page.locator('#login-button').click();
         })

          Then ('I Land to Inventory  homePage',async function(){
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');


          })
          When('I select Filter dropdown as price low to high',async function(){
           await this.page.locator('[data-test="product-sort-container"]').click();
           await this.page.selectOption('.product_sort_container',{ label: 'Price (low to high)' }
           );


          })

          Then('I Verify prices of first 3 items should be ascending order',async function(){
            const priceElements = await this.page
            .locator("[data-test='inventory-item-price']")
           .allTextContents();

            const prices = priceElements.slice(0, 3).map(price => Number(price.replace('$', '')));
             expect(prices[0]).toBeLessThanOrEqual(prices[1]);
             expect(prices[1]).toBeLessThanOrEqual(prices[2]);
          })







         

         




