#!/usr/bin/env node
'use strict';

let credits = require( 'credits' );
let path    = require( 'path' );
let meow    = require( 'meow' );
let fs      = require( 'fs' );
let cli     = meow( `
  Usage
    $ credits <path>

  Options
    -r, --reporter Choose reporter to format output [ minimal, extended, markdown ]

  Examples
    $ credits /projects/foo
    $ credits /projects/foo --reporter extended
    $ credits /projects/foo --reporter markdown > THANKS.md`,
  {
    alias : {
      r : 'reporter'
    }
  }
);


let reporters = fs.readdirSync( path.resolve( __dirname, 'reporters' ) ).reduce(
  function( reporters, reporter ) {
    if ( ! /spec.js/.test( reporter ) ) {
      reporter = reporter.replace( '.js', '' );
      reporters[ reporter ] = require( './reporters/' + reporter );
    }

    return reporters;
  },
  {}
);

let reporter = reporters[ cli.flags.reporter ] || reporters.minimal;

let creditPath = path.resolve( process.cwd(), cli.input[ 0 ] || '.' );

credits( creditPath )
  .then( printCredits )
  .catch( function( error ) {
    throw error;
  } );


/**
 * Print the credits in a nice way
 *
 * @param  {Array} credits credits
 */
function printCredits( credits ) {
  let projectName = creditPath.split( path.sep ).pop();

  console.log( reporter( projectName, credits ) );
}
