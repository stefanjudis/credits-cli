// eslint "sourceType": "module"

import childProcess from 'child_process';
import test from 'ava';
import tmp from 'tmp';
import fs from 'fs';
import nodePath from 'path';
import execa from 'execa';

// import it so that
// nyc gets it for code coverage check
// import credits from '../cli.js';

const path = nodePath.resolve( './fixtures' );

test( 'credits - folder exists', t => {
  return execa( '../cli.js', [ path ] ).then( res => {
    const result = res.stdout.split( '\n' );
    t.deepEqual( result[ 0 ], 'Credits for credits-cli-test' );
    t.deepEqual( result[ 4 ], 'npm' );
    t.deepEqual( result[ 5 ], 'Alice Bobson (3 packages)' );
    t.deepEqual( result[ 6 ], 'Bob Calsow bob@calsow.io (2 packages)' );
    t.deepEqual( result[ 7 ], 'Randy Ran (1 package)' );
  } );
} );

// for some reason that makes travis crash???
// test( 'credits - folder does not exists', t => {
//   try {
//     childProcess.execSync(
//       `./cli.js /path/does/not/exist > /dev/null 2>&1`,
//       { cwd : __dirname }
//     );
//   } catch( error ) {
//     t.end();
//   }
// } );
