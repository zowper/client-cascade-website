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

        # Verify logo slider
        await page.wait_for_timeout(5000) # Wait for 5 seconds
        await page.screenshot(path='jules-scratch/verification/logo_slider_fix_attempt.png', full_page=True)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
