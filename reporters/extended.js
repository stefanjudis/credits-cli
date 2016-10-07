'use strict';

let chalk = require( 'chalk' );
let plur  = require( 'plur' );

module.exports = function( name, credits ) {

  let report = chalk.blue( `Credits for ${name}\n` );

  let len = 0;
  for (let pack in credits) {
    len += pack.length;
  }

  report += `${name} relies on the work of ${len} people:\n\n`;

  for (let pack in credits) {
    report += `## ${pack}\n\n`
    credits[pack].forEach( function( credit ) {
      let columns = [
        [ chalk.blue( credit.name ) ],
        [],
        []
      ];

      if ( credit.email ) {
        columns[ 1 ].push( 'Mail: ' + chalk.red( credit.email ) );
      }

      if ( credit.github ) {
        columns[ 1 ].push( 'GitHub: ' + chalk.red( credit.github ) );
      }

      if ( credit.twitter ) {
        columns[ 1 ].push( 'Twitter: ' + chalk.red( '@' + credit.twitter ) );
      }

      let pkgCount = credit.packages.length;

      columns[ 2 ].push( `${pkgCount } ${plur( 'package', pkgCount )}:` );
      columns[ 2 ].push( credit.packages.join( ', ' ) );

      columns = columns.reduce( ( columns, column ) => {
        if ( column.length ) {
          columns.push( column.join( ' ' ) );
        }

        return columns;
      }, [] );

      report += `${columns.join( '\n' )}\n\n`;
    } );
  }

  return report;
};
