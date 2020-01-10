export function dedent(literals: string): string;
export function dedent(
  literals: TemplateStringsArray | string[],
  ...values: any[]
): string;
export function dedent(
  literals: string | string[] | TemplateStringsArray,
  ...values: any[]
): string {
  let matches = [];
  let strings =
    typeof literals === 'string'
      ? [literals]
      : literals.slice();

  // 1. Remove trailing whitespace.
  strings[strings.length - 1] = strings[strings.length - 1].replace(
    /\r?\n([\t ]*)$/,
    ''
  );
  // 2. Find all line breaks to determine the highest common indentation level.
  strings.forEach((str, i) => {
    let match;
    if ((match = str.match(/\n[\t ]+/g))) {
      matches.push(...match);
      // 3. Determine if dedent is required
    } else if (!matches.length && str.match(/\n[\w\d-]/g)) {
      matches.push({ length: 1 }) // no dedent
    }
  })
  // 4. Remove the common indentation from all strings.
  if (matches.length) {
    let size = Math.min(...matches.map((value) => value.length - 1));
    let pattern = new RegExp(`\n[\t ]{${size}}`, 'g');
    strings.forEach(str => { str = str.replace(pattern, '\n') })
  }
  // 5. Remove leading whitespace.
  strings[0] = strings[0].replace(/^\r?\n/, '');
  // 6. Perform interpolation.
  let result = strings[0];
  values.forEach((value, i) => {
    result += value + strings[i + 1];
  });
  return result;
}
