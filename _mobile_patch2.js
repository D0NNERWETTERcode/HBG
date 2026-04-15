const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the current block
    let currentBlock = `// Mobile Menu (Event Delegation)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#mobile-menu-btn');
        if (btn) {
            const isOpen = mobileMenu.classList.toggle('open');
            btn.classList.toggle('menu-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    });
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            mobileMenu.classList.remove('open');
            document.querySelectorAll('#mobile-menu-btn').forEach(b => b.classList.remove('menu-open'));
            document.body.style.overflow = '';
        }
    });`;

    let newBlock = `// Mobile Menu (Event Delegation)
    const mobileMenu = document.getElementById('mobile-menu');
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#mobile-menu-btn');
        if (btn) {
            const isOpen = mobileMenu.classList.toggle('open');
            btn.classList.toggle('menu-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    });
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            mobileMenu.classList.remove('open');
            document.querySelectorAll('#mobile-menu-btn').forEach(b => b.classList.remove('menu-open'));
            document.body.style.overflow = '';
        }
    });`;

    if (content.includes(currentBlock)) {
        content = content.replace(currentBlock, newBlock);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched ${file}`);
    } else {
        console.log(`Current block not found in ${file}`);
    }
}
