import test from 'ava';
import minimal from '../reporters/minimal';
import credits from './fixtures/credits.spec.json';
import chalk from 'chalk';

chalk.enabled = false;

test( 'minimal reporter', t => {
  let result = minimal( 'foo', credits ).split( '\n' );

  t.deepEqual( result[ 0 ], 'Credits for foo' );
  t.deepEqual( result[ 1 ], 'foo relies on the work of 9 people:' );
  t.deepEqual( result[ 4 ], 'npm' );
  t.deepEqual( result[ 5 ], 'Alice Bobson (3 packages)' );
  t.deepEqual( result[ 6 ], 'Bob Calsow bob@calsow.io (2 packages)' );
  t.deepEqual( result[ 7 ], 'Jonny John (1 package)' );
} );
