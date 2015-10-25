import childProcess from 'child_process';
import test from 'ava';
import tmp from 'tmp';
import fs from 'fs';

function createDummyProject( callback ) {
  tmp.dir( { unsafeCleanup : true }, ( error, path, cleanUpCb ) => {
    fs.mkdirSync( `${path}/node_modules` );

    fs.mkdirSync( `${path}/node_modules/foo` );
    fs.writeFileSync(
      `${path}/node_modules/foo/package.json`,
      JSON.stringify( { author : 'Bob Calsow' } ),
      'utf8'
    );


    fs.mkdirSync( `${path}/node_modules/bar` );
    fs.writeFileSync(
      `${path}/node_modules/bar/package.json`,
      JSON.stringify( { author : 'Alice Bobson' } ),
      'utf8'
    );

    fs.mkdirSync( `${path}/node_modules/bar/node_modules` );
    fs.mkdirSync( `${path}/node_modules/bar/node_modules/boom` );

    fs.writeFileSync(
      `${path}/node_modules/bar/node_modules/boom/package.json`,
      JSON.stringify( { author : { name : 'Alice Bobson' } } ),
      'utf8'
    );

    fs.mkdirSync( `${path}/node_modules/baz` );
    fs.writeFileSync(
      `${path}/node_modules/baz/package.json`,
      JSON.stringify( {
        author      : 'Alice Bobson',
        maintainers : [
          'Randy Ran',
          {
            name  : 'Bobby Bob',
            email : 'bobby@bob.io'
          }
        ]
      } ),
      'utf8'
    );

    fs.mkdirSync( `${path}/node_modules/baz/node_modules` );
    fs.mkdirSync( `${path}/node_modules/baz/node_modules/boing` );

    fs.writeFileSync(
      `${path}/node_modules/baz/node_modules/boing/package.json`,
      JSON.stringify( { author : 'Bob Calsow <bob@calsow.io>' } ),
      'utf8'
    );

    callback( path, cleanUpCb );
  } );
}


test( 'credits - folder exists - without included packages', t => {
  createDummyProject( ( path, callback ) => {
    childProcess.execSync(
      `./cli.js ${path} > ${path}/test.txt`,
      { cwd : __dirname }
    );

    let result = fs.readFileSync( `${path}/test.txt`, { encoding : 'utf8' } ).split( '\n' );

    t.same( result[ 3 ], 'Alice Bobson (3 package(s))' );
    t.same( result[ 4 ], 'Bob Calsow bob@calsow.io (2 package(s))' );
    t.same( result[ 5 ], 'Randy Ran (1 package(s))' );
    t.same( result[ 6 ], 'Bobby Bob bobby@bob.io (1 package(s))' );
    t.end();

    callback();
  } );
} );

test( 'credits - folder exists - with included packages', t => {
  createDummyProject( ( path, callback ) => {
    childProcess.execSync(
      `./cli.js ${path} -i > ${path}/test.txt`,
      { cwd : __dirname }
    );

    let result = fs.readFileSync( `${path}/test.txt`, { encoding : 'utf8' } ).split( '\n' );

    t.same( result[ 3 ], 'Alice Bobson (3 package(s)) [ bar, boom, baz ]' );
    t.same( result[ 4 ], 'Bob Calsow bob@calsow.io (2 package(s)) [ boing, foo ]' );
    t.same( result[ 5 ], 'Randy Ran (1 package(s)) [ baz ]' );
    t.same( result[ 6 ], 'Bobby Bob bobby@bob.io (1 package(s)) [ baz ]' );
    t.end();

    callback();
  } );
} );

test( 'credits - folder does not exists', t => {
  try {
    childProcess.execSync(
      `./cli.js /path/does/not/exist > /dev/null 2>&1`,
      { cwd : __dirname }
    );
  } catch( error ) {
    t.end();
  }
} );
