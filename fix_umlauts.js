const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const map = {
  'ä': '&auml;', 'Ä': '&Auml;',
  'ö': '&ouml;', 'Ö': '&Ouml;',
  'ü': '&uuml;', 'Ü': '&Uuml;',
  'ß': '&szlig;'
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  for (const [char, entity] of Object.entries(map)) {
    content = content.split(char).join(entity);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed umlauts in ${file}`);
  }
}
console.log('Done.');
