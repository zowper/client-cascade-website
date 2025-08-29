import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Listen for console events and print them
        page.on("console", lambda msg: print(f"Browser console: {msg.text()}"))

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('index.html')

        await page.goto(f'file://{file_path}')

        # Verify logo slider
        await page.evaluate("document.querySelector('.social-proof').scrollIntoView()")
        await page.wait_for_selector('.social-proof.is-visible')
        await page.wait_for_timeout(2000) # Increased wait time

        try:
            await page.wait_for_selector('.logos-slide', timeout=5000)
        except:
            print("Could not find .logos-slide. Page content:")
            print(await page.content())

        await page.screenshot(path='jules-scratch/verification/logo_slider.png')

        # Verify testimonials
        await page.evaluate("document.querySelector('.testimonials-new').scrollIntoView()")
        await page.wait_for_selector('.testimonials-new.is-visible')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='jules-scratch/verification/animated_testimonials_initial.png')

        await page.click('.next-btn')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='jules-scratch/verification/animated_testimonials_after_next.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
