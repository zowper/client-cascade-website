import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('index.html')

        await page.goto(f'file://{file_path}')

        # Give everything time to load
        await page.wait_for_timeout(3000)

        # Take final screenshot
        await page.screenshot(path='jules-scratch/verification/final_screenshot.png', full_page=True)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
