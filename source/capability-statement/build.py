"""Render the Nicola Holdings Group capabilities statement.

Usage (from the repository root):
    pip install playwright && python -m playwright install chromium
    python source/capability-statement/build.py            # WOSB shown with "Preview" tag
    python source/capability-statement/build.py --final    # only after SBA awards WOSB

Outputs:
    files/capability-statement.pdf                          (linked from the website)
    source/capability-statement/Nicola-Holdings-Group-Capability-Statement.pdf
    source/capability-statement/capability-statement-preview.png   (300 dpi)
"""
import asyncio
import shutil
import sys
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
SRC = HERE / "capability-statement.html"
PDF_NAMED = HERE / "Nicola-Holdings-Group-Capability-Statement.pdf"
PDF_SITE = ROOT / "files" / "capability-statement.pdf"
PNG = HERE / "capability-statement-preview.png"
FINAL = "--final" in sys.argv


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 816, "height": 1056}, device_scale_factor=3.125)
        await page.goto(SRC.as_uri(), wait_until="networkidle")
        if FINAL:
            await page.evaluate("document.documentElement.classList.add('cert-final')")
        await page.evaluate("document.fonts.ready")

        # Guard: content must fit the single Letter page.
        overflow = await page.evaluate(
            "(() => { const p = document.querySelector('.page'); return p.scrollHeight - p.clientHeight; })()"
        )
        if overflow > 0:
            raise SystemExit(f"Content overflows the page by {overflow}px — tighten before publishing.")

        await page.pdf(path=str(PDF_NAMED), width="8.5in", height="11in", print_background=True,
                       prefer_css_page_size=True, margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
        await page.screenshot(path=str(PNG), full_page=False)
        await browser.close()

    PDF_SITE.parent.mkdir(exist_ok=True)
    shutil.copyfile(PDF_NAMED, PDF_SITE)
    print("Wrote", PDF_NAMED.relative_to(ROOT), PDF_SITE.relative_to(ROOT), PNG.relative_to(ROOT))


asyncio.run(main())
