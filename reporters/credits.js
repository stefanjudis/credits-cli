'use strict';

const chalk = require( 'chalk' );
const plur  = require( 'plur' );
const stringWidth = require( 'string-width' );
const sliceAnsi = require( 'slice-ansi' );

const padding = Array( 60 ).join( ' ' );

module.exports = function( name, credits ) {
  let report = center( chalk.blue.bold( `Credits for ${name}` ) ) + '\n';

  let len = 0;
  for ( let pack in credits ) {
    len += credits[ pack ].length;
  }

  report += center( `${name} relies on the work of ${len} people` );

  for ( let pack in credits ) {
    if ( credits[ pack ].length > 0 ) {
      report += `\n\n${center( chalk.underline( pack ) )}\n\n`;
    }
    report += credits[ pack ].map( credit => {
      const lhs = chalk.blue( credit.name || 'Unknown' );
      let rhs = '  ';
      rhs += chalk.red( credit.email ? credit.email + ' ' : '' );

      const pkgCount = credit.packages.length;

      rhs += `${pkgCount} ${plur( 'package', pkgCount )}`;
      return pad( padding, lhs, true ) + pad( padding, rhs, false );
    } ).join( '\n' );
  }

  return report;
};

function center ( str ) {
  const p = padding + padding.slice( 0, Math.floor( stringWidth( str ) / 2 ) + 2 );
  return pad( p, str, true );
}

function pad( pad, str, padLeft ) {
  if ( typeof str === 'undefined' )
    return pad;
  if ( padLeft ) {
    str = pad + str;
    return sliceAnsi( str, stringWidth( str ) - pad.length );
  } else {
    return sliceAnsi( str + pad, 0, pad.length );
  }
}
