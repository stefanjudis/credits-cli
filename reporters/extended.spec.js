import test from 'ava';
import extended from './extended';
import credits from './credits.spec.json';

test( 'extended reporter', t => {

  let result = extended( 'foo', credits ).split( '\n' );

  t.same( result[ 0 ], 'Credits for foo' );
  t.same( result[ 1 ], 'foo relies on the work of 3 people:' );
  t.same( result[ 3 ], 'Alice Bobson' );
  t.same( result[ 4 ], '3 packages: foo, bar, baz' );
  t.same( result[ 5 ], '' );
  t.same( result[ 6 ], 'Bob Calsow' );
  t.same( result[ 7 ], 'Mail: bob@calsow.io' );
  t.same( result[ 8 ], '2 packages: foo, bar' );
  t.same( result[ 9 ], '' );
  t.same( result[ 10 ], 'Jonny John' );
  t.same( result[ 11 ], 'GitHub: johnyjohn Twitter: @johnnyjohn' );
  t.same( result[ 12 ], '1 package: foo' );

  t.end();
} );
