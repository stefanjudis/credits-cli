#!/usr/bin/env node
'use strict';

var credits = require( 'credits' );
var chalk   = require( 'chalk' );
var path    = require( 'path' );
var meow    = require( 'meow' );
var cli     = meow(
  '  Usage\n' +
  '    $ credits <path>\n' +
  '\n' +
  '  Options\n' +
  '    -i, --include-packages  Show packages maintained by person\n' +
  '\n' +
  '  Examples\n' +
  '    $ credits /projects/foo\n' +
  '    $ credits /projects/foo --include-packages\n',
  {
    alias : {
      i : 'includePackages'
    }
  }
);

if ( ! cli.input.length ) {
  throw new Error( 'Project path is not defined' );
}

var creditPath = path.resolve( process.cwd(), process.argv[ 2 ] );

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
  var projectName = creditPath.split( path.sep ).pop();

  console.log( chalk.blue( '-> Credits for ' + projectName ) );
  console.log( projectName + ' relies on the work of ' + credits.length +' people.\n' );

  credits.forEach( function( credit ) {
    var columns = [
      chalk.blue( credit.name )
    ];

    if ( credit.email ) {
      columns.push( chalk.red( credit.email || '' ) );
    }

    columns.push( '(' + credit.packages.length + ' package(s))' );

    if ( cli.flags.includePackages ) {
      columns.push( '[ ' + credit.packages.join( ', ' ) + ' ]' );
    }

    console.log( columns.join( ' ' ) );
  } );
}
