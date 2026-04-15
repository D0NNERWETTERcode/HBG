import os
import glob

html_files = glob.glob("*.html")

old_text = """    // Mobile Menu – BUNKER-FIX 6.0: CSS-only icon, class-based toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenuBtn.classList.toggle('menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });"""

new_text = """    // Mobile Menu – BUNKER-FIX 6.0 (Event Delegation)
    const mobileMenu = document.getElementById('mobile-menu');
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#mobile-menu-btn');
        if (btn) {
            const isOpen = mobileMenu.classList.toggle('open');
            btn.classList.toggle('menu-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    });
    // Close menu on link click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            mobileMenu.classList.remove('open');
            const btns = document.querySelectorAll('#mobile-menu-btn');
            btns.forEach(b => b.classList.remove('menu-open'));
            document.body.style.overflow = '';
        }
    });"""

count = 0
for file in html_files:
    if file == 'index.html':
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Patched {file}")
    else:
        print(f"Text not found in {file}")

print(f"Total patched: {count}")
