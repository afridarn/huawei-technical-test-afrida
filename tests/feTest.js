const puppeteer = require("puppeteer");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("http://localhost:8000");

  await page.type("#name", "Afrida Rohmatin");
  await page.type("#email", "afrida@gmail.com");
  await page.type("#phone", "081547123069");

  await page.click("#submit-button");

  await delay(1500);

  await page.waitForSelector("#get-data-button");
  await page.click("#get-data-button");

  await page.waitForSelector("#registered-data");

  const registeredData = await page.evaluate(() => {
    return document.querySelector("#registered-data").innerText;
  });

  console.log("Registered Data:", registeredData);

  await browser.close();
})();
