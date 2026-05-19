import { setWorldConstructor, IWorldOptions, World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;

  currentUserEmail?: string;

  user?: {
    name: string;
    email: string;
    password: string;
  };

  productName1?: string;
  productName2?: string;

  constructor(options: IWorldOptions) {
    super(options); 
  }
}

setWorldConstructor(CustomWorld);


