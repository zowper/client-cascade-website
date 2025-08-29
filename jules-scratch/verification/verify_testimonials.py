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

        # Scroll to the testimonials section
        await page.evaluate("document.querySelector('.testimonials').scrollIntoView()")

        # Wait for the testimonials section to be visible
        await page.wait_for_selector('.testimonial-container')

        # Take a screenshot of the initial state
        await page.screenshot(path='jules-scratch/verification/testimonials_initial.png', full_page=True)

        # Click the next button
        await page.click('.next')

        # Wait for the transition to complete
        await page.wait_for_timeout(1000)  # 1 second for transition

        # Take a screenshot after clicking next
        await page.screenshot(path='jules-scratch/verification/testimonials_after_next.png', full_page=True)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
