import test from 'ava';
import markdown from '../reporters/markdown';
import credits from './fixtures/credits.spec.json';
import chalk from 'chalk';

chalk.enabled = false;

test( 'markdown reporter', t => {
  let result = markdown( 'foo', credits ).split( '\n' );

  t.deepEqual( result[ 0 ], '# Credits for foo' );
  t.deepEqual( result[ 1 ], '## foo relies on the work of 9 people:' );
  t.deepEqual( result[ 4 ], '## npm' );
  t.deepEqual( result[ 6 ], '- **Alice Bobson** (3 packages)' );
  t.deepEqual( result[ 7 ], '- **Bob Calsow** *bob@calsow.io* (2 packages)' );
  t.deepEqual( result[ 8 ], '- **Jonny John** (1 package)' );
} );
