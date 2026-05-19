import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  ITestCaseHookParameter
} from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "./world";
import * as fs from "fs";
import * as path from "path";

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });
});

AfterAll(async () => {
  if (browser) await browser.close();
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    viewport: null,
    recordVideo: { dir: "videos/" } // Playwright video directory
  });
  this.page = await this.context.newPage();
});

After(async function (
  this: CustomWorld,
  scenario: ITestCaseHookParameter
) {

  // Get video path BEFORE closing the page/context
  const videoPath = await this.page.video()?.path();

  // Ensure report folder exists
  const reportDir = path.join(process.cwd(), "test-result", "report");
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  // Screenshot on failure
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    const screenshotPath = path.join(reportDir, `${scenario.pickle.name}.png`);
    fs.writeFileSync(screenshotPath, screenshot);
    await this.attach(screenshot, "image/png");
  }

  // Attach video
  if (videoPath && fs.existsSync(videoPath)) {
    // Read video into a buffer
    const videoBuffer = fs.readFileSync(videoPath);

    // Attach buffer directly to report
    await this.attach(videoBuffer, "video/webm");

    // Optional: copy to report folder for manual access
    const videoDest = path.join(reportDir, `${scenario.pickle.name}.webm`);
    fs.copyFileSync(videoPath, videoDest);
  }
  
  // Close page/context
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});
