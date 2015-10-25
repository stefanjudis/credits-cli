#!/usr/bin/env node
'use strict';

const credits = require( 'credits' );
const chalk   = require( 'chalk' );
const path    = require( 'path' );
const meow    = require( 'meow' );
const cli     = meow( `
  Usage
    $ credits <path>

  Options
    -i, --include-packages  Show packages maintained by person

  Examples
    $ credits /projects/foo
    $ credits /projects/foo --include-packages
`, {
  alias : {
    i : 'includePackages'
  }
} );

if ( ! cli.input.length ) {
  throw new Error( 'Project path is not defined' );
}

let creditPath = path.resolve( process.cwd(), process.argv[ 2 ] );

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

  console.log( chalk.blue( `-> Credits for ${projectName}` ) );
  console.log( `${projectName} relies on the work of ${credits.length} people.\n` );

  credits.forEach( function( credit ) {
    let columns = [
      chalk.blue( credit.name )
    ];

    if ( credit.email ) {
      columns.push( chalk.red( credit.email || '' ) );
    }

    columns.push( `(${credit.packages.length} package(s))` );

    if ( cli.flags.includePackages ) {
      columns.push( `[ ${credit.packages.join( ', ' )} ]` );
    }

    console.log( columns.join( ' ' ) );
  } );
}
