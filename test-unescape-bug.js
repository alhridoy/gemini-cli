// Test to reproduce the character loss bug in unescapeStringForGeminiBug

function unescapeStringForGeminiBug(inputString) {
  return inputString.replace(
    /\\+(n|t|r|'|"|`|\\|\n)/g,
    (match, capturedChar) => {
      switch (capturedChar) {
        case 'n':
          return '\n'; // This is the problem!
        case 't':
          return '\t';
        case 'r':
          return '\r';
        case "'":
          return "'";
        case '"':
          return '"';
        case '`':
          return '`';
        case '\\':
          return '\\';
        case '\n':
          return '\n';
        default:
          return match;
      }
    },
  );
}

// Test cases that demonstrate the bug
console.log('Testing character loss bug:');

// Test 1: "monorepo" -> "monopo" (the 'r' gets lost)
const test1 = 'monorepo root';
console.log(`Input: "${test1}"`);
console.log(`Output: "${unescapeStringForGeminiBug(test1)}"`);
console.log('Expected: Same as input (no change)');
console.log('');

// Test 2: Path with \\name -> \name (newline character)
const test2 = 'C:\\\\Users\\\\name';
console.log(`Input: "${test2}"`);
console.log(`Output: "${unescapeStringForGeminiBug(test2)}"`);
console.log('This should show character corruption');
console.log('');

// Test 3: The specific case from the bug report
const test3 = 'monorepo root (and then exempting cached files)';
console.log(`Input: "${test3}"`);
console.log(`Output: "${unescapeStringForGeminiBug(test3)}"`);
console.log('');

// Test 4: Another problematic case
const test4 = 'import banner from';
console.log(`Input: "${test4}"`);
console.log(`Output: "${unescapeStringForGeminiBug(test4)}"`);
console.log('');

// Test 5: Ternary operator case
const test5 = "command === 'serve' ? 'src' : 'dist'";
console.log(`Input: "${test5}"`);
console.log(`Output: "${unescapeStringForGeminiBug(test5)}"`);
