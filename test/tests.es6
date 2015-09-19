var expect = require('chai').expect;
var dedent = require('../lib/index');

function tag (strings, ...values) {
	let string = strings[0];

	for (let i = 0; i < values.length; i++) {
		string += 2 * values[i] + strings[i + 1];
	}

	return string;
}

describe('dedent tag', () => {
	it('should work with tabs', () => {
		expect(dedent`Line #1
			Line #2
			Line #3`).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent`Line #${1}
			Line #${2}
			Line #${3}`).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent`${1}. line #${1}
			${2}. line #${2}
			${3}. line`).to.equal('1. line #1\n2. line #2\n3. line');
	});

	it('should work with spaces', () => {
		expect(dedent`Line #1
            Line #2
            Line #3`).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent`Line #${1}
            Line #${2}
            Line #${3}`).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`).to.equal('1. line #1\n2. line #2\n3. line');
	});

	it('should remove leading/trailing line break', () => {
		expect(
			dedent`
			Line #1
			Line #2
			Line #3
			`
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			dedent`
			Line #${1}
			Line #${2}
			Line #${3}
			`
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			dedent`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`
		).to.equal('1. line #1\n2. line #2\n3. line');
	});

	it('should not remove more than one leading/trailing line break', () => {
		expect(
			dedent`

			Line #1
			Line #2
			Line #3

			`
		).to.equal('\nLine #1\nLine #2\nLine #3\n');

		expect(
			dedent`

			Line #${1}
			Line #${2}
			Line #${3}

			`
		).to.equal('\nLine #1\nLine #2\nLine #3\n');

		expect(
			dedent`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`
		).to.equal('\n1. line #1\n2. line #2\n3. line\n');
	});

	it('should remove the same number of tabs/spaces from each line', () => {
		expect(
			dedent`
			Line #1
				Line #2
					Line #3
			`
		).to.equal('Line #1\n\tLine #2\n\t\tLine #3');

		expect(
			dedent`
			Line #${1}
				Line #${2}
					Line #${3}
			`
		).to.equal('Line #1\n\tLine #2\n\t\tLine #3');

		expect(
			dedent`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`
		).to.equal('1. line #1\n\t2. line #2\n\t\t3. line');
	});

	it('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
		expect(
			function () {
				return dedent`
					Line #1
					Line #2
					Line #3
				`;
			}()
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			function () {
				return dedent`
					Line #${1}
					Line #${2}
					Line #${3}
				`;
			}()
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			function () {
				return dedent`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`;
			}()
		).to.equal('1. line #1\n2. line #2\n3. line');
	});
});

describe('dedent() function', () => {
	it('should work with tabs', () => {
		expect(dedent(`Line #1
			Line #2
			Line #3`)).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent(`Line #${1}
			Line #${2}
			Line #${3}`)).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent(`${1}. line #${1}
			${2}. line #${2}
			${3}. line`)).to.equal('1. line #1\n2. line #2\n3. line');
	});

	it('should work with spaces', () => {
		expect(dedent(`Line #1
            Line #2
            Line #3`)).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent(`Line #${1}
            Line #${2}
            Line #${3}`)).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent(`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`)).to.equal('1. line #1\n2. line #2\n3. line');
	});

	it('should remove leading/trailing line break', () => {
		expect(
			dedent(`
			Line #1
			Line #2
			Line #3
			`)
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			dedent(`
			Line #${1}
			Line #${2}
			Line #${3}
			`)
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			dedent(`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`)
		).to.equal('1. line #1\n2. line #2\n3. line');
	});

	it('should not remove more than one leading/trailing line break', () => {
		expect(
			dedent(`

			Line #1
			Line #2
			Line #3

			`)
		).to.equal('\nLine #1\nLine #2\nLine #3\n');

		expect(
			dedent(`

			Line #${1}
			Line #${2}
			Line #${3}

			`)
		).to.equal('\nLine #1\nLine #2\nLine #3\n');

		expect(
			dedent(`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`)
		).to.equal('\n1. line #1\n2. line #2\n3. line\n');
	});

	it('should remove the same number of tabs/spaces from each line', () => {
		expect(
			dedent(`
			Line #1
				Line #2
					Line #3
			`)
		).to.equal('Line #1\n\tLine #2\n\t\tLine #3');

		expect(
			dedent(`
			Line #${1}
				Line #${2}
					Line #${3}
			`)
		).to.equal('Line #1\n\tLine #2\n\t\tLine #3');

		expect(
			dedent(`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`)
		).to.equal('1. line #1\n\t2. line #2\n\t\t3. line');
	});

	it('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
		expect(
			function () {
				return dedent(`
					Line #1
					Line #2
					Line #3
				`);
			}()
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			function () {
				return dedent(`
					Line #${1}
					Line #${2}
					Line #${3}
				`);
			}()
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			function () {
				return dedent(`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`);
			}()
		).to.equal('1. line #1\n2. line #2\n3. line');
	});
});

describe('dedent() function with custom tag', () => {
	it('should work with tabs', () => {
		expect(dedent(tag`Line #1
			Line #2
			Line #3`)).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent(tag`Line #${1}
			Line #${2}
			Line #${3}`)).to.equal('Line #2\nLine #4\nLine #6');

		expect(dedent(tag`${1}. line #${1}
			${2}. line #${2}
			${3}. line`)).to.equal('2. line #2\n4. line #4\n6. line');
	});

	it('should work with spaces', () => {
		expect(dedent(tag`Line #1
            Line #2
            Line #3`)).to.equal('Line #1\nLine #2\nLine #3');

		expect(dedent(tag`Line #${1}
            Line #${2}
            Line #${3}`)).to.equal('Line #2\nLine #4\nLine #6');

		expect(dedent(tag`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`)).to.equal('2. line #2\n4. line #4\n6. line');
	});

	it('should remove leading/trailing line break', () => {
		expect(
			dedent(tag`
			Line #1
			Line #2
			Line #3
			`)
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			dedent(tag`
			Line #${1}
			Line #${2}
			Line #${3}
			`)
		).to.equal('Line #2\nLine #4\nLine #6');

		expect(
			dedent(tag`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`)
		).to.equal('2. line #2\n4. line #4\n6. line');
	});

	it('should not remove more than one leading/trailing line break', () => {
		expect(
			dedent(tag`

			Line #1
			Line #2
			Line #3

			`)
		).to.equal('\nLine #1\nLine #2\nLine #3\n');

		expect(
			dedent(tag`

			Line #${1}
			Line #${2}
			Line #${3}

			`)
		).to.equal('\nLine #2\nLine #4\nLine #6\n');

		expect(
			dedent(tag`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`)
		).to.equal('\n2. line #2\n4. line #4\n6. line\n');
	});

	it('should remove the same number of tabs/spaces from each line', () => {
		expect(
			dedent(tag`
			Line #1
				Line #2
					Line #3
			`)
		).to.equal('Line #1\n\tLine #2\n\t\tLine #3');

		expect(
			dedent(tag`
			Line #${1}
				Line #${2}
					Line #${3}
			`)
		).to.equal('Line #2\n\tLine #4\n\t\tLine #6');

		expect(
			dedent(tag`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`)
		).to.equal('2. line #2\n\t4. line #4\n\t\t6. line');
	});

	it('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
		expect(
			function () {
				return dedent(tag`
					Line #1
					Line #2
					Line #3
				`);
			}()
		).to.equal('Line #1\nLine #2\nLine #3');

		expect(
			function () {
				return dedent(tag`
					Line #${1}
					Line #${2}
					Line #${3}
				`);
			}()
		).to.equal('Line #2\nLine #4\nLine #6');

		expect(
			function () {
				return dedent(tag`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`);
			}()
		).to.equal('2. line #2\n4. line #4\n6. line');
	});
});
