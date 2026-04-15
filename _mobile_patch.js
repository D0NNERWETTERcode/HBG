const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the start of the block
    let startStr = /const mobileMenuBtn = document\.getElementById\('mobile-menu-btn'\);([\s\S]*?)mobileMenu\.querySelectorAll\('a'\)\.forEach\(link => \{([\s\S]*?)document\.body\.style\.overflow = '';\s*\}\);\s*\}\);/;
    
    if (startStr.test(content)) {
        let newBlock = `// Mobile Menu (Event Delegation)
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

        content = content.replace(startStr, newBlock);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched ${file}`);
    } else {
        console.log(`Block not found in ${file}`);
    }
}
