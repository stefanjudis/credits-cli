'use strict';

let chalk = require( 'chalk' );
let plur  = require( 'plur' );

module.exports = function( name, credits ) {
  let report = chalk.blue( `Credits for ${name}\n` );

  report += `${name} relies on the work of ${credits.length} people:\n\n`;

  credits.forEach( function( credit ) {
    var columns = [
      chalk.blue( credit.name )
    ];

    if ( credit.email ) {
      columns.push( chalk.red( credit.email || '' ) );
    }

    var pkgCount = credit.packages.length;

    columns.push( `(${pkgCount } ${plur( 'package', pkgCount )})` );

    report += `${columns.join( ' ' )}\n`;
  } );

  return report;
};
