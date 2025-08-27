import os
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        base_url = "http://localhost:8000"

        # Go to home page
        page.goto(f"{base_url}/")
        expect(page).to_have_title("Client Cascade")
        page.screenshot(path="jules-scratch/verification/home.png", full_page=True)

        # Go to benefits page
        page.get_by_role("link", name="Benefits").click()
        expect(page).to_have_url(f"{base_url}/benefits/")
        page.screenshot(path="jules-scratch/verification/benefits.png", full_page=True)

        # Go to pricing page
        page.get_by_role("link", name="Pricing").click()
        expect(page).to_have_url(f"{base_url}/pricing/")
        page.screenshot(path="jules-scratch/verification/pricing.png", full_page=True)

        # Go to contact page
        page.get_by_role("link", name="Contact").click()
        expect(page).to_have_url(f"{base_url}/contact/")
        page.screenshot(path="jules-scratch/verification/contact.png", full_page=True)

        # Go back to home page
        page.get_by_role("link", name="Home").click()
        expect(page).to_have_url(f"{base_url}/")

        browser.close()

if __name__ == '__main__':
    run()
