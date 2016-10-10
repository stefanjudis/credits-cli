import test from 'ava';
import extended from '../reporters/extended';
import credits from './fixtures/credits.spec.json';
import chalk from 'chalk';

chalk.enabled = false;

test( 'extended reporter', t => {

  let result = extended( 'foo', credits ).split( '\n' );

  t.deepEqual( result[ 0 ], 'Credits for foo' );
  t.deepEqual( result[ 1 ], 'foo relies on the work of 9 people:' );
  t.deepEqual( result[ 3 ], 'npm' );
  t.deepEqual( result[ 5 ], 'Alice Bobson' );
  t.deepEqual( result[ 6 ], '3 packages: foo, bar, baz' );
  t.deepEqual( result[ 7 ], '' );
  t.deepEqual( result[ 8 ], 'Bob Calsow' );
  t.deepEqual( result[ 9 ], 'Mail: bob@calsow.io' );
  t.deepEqual( result[ 10 ], '2 packages: foo, bar' );
  t.deepEqual( result[ 11 ], '' );
  t.deepEqual( result[ 12 ], 'Jonny John' );
  t.deepEqual( result[ 13 ], 'GitHub: johnyjohn Twitter: @johnnyjohn' );
  t.deepEqual( result[ 14 ], '1 package: foo' );
} );
