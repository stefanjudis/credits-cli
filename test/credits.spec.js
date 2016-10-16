import test from 'ava';
import minimal from '../reporters/credits';
import credits from './fixtures/credits.spec.json';
import chalk from 'chalk';

chalk.enabled = false;

test( 'minimal reporter', t => {
  let result = minimal( 'foo', credits ).split( '\n' );

  t.deepEqual( result[ 0 ].trim(), 'Credits for foo' );
  t.deepEqual( result[ 1 ].trim(), 'foo relies on the work of 9 people' );
  t.deepEqual( result[ 3 ].trim(), 'npm' );
  t.deepEqual( result[ 5 ].trim(), 'Alice Bobson  3 packages' );
  t.deepEqual( result[ 6 ].trim(), 'Bob Calsow  bob@calsow.io 2 packages' );
  t.deepEqual( result[ 7 ].trim(), 'Jonny John  1 package' );
} );
