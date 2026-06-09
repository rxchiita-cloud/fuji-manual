const fs = require('fs');
const content = fs.readFileSync('/constants.tsx', 'utf8');
const lines = content.split('\n');

// Remove lines 748 to 845 (0-indexed: 747 to 844)
// And remove the comma at line 747 (0-indexed: 746)
lines[746] = lines[746].replace(',', '');
lines.splice(747, 845 - 748 + 1);

fs.writeFileSync('/constants.tsx', lines.join('\n'));
