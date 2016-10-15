'use strict';

let plur    = require( 'plur' );

module.exports = function( name, credits ) {
  let report = `# Credits for ${name}\n`;

  let len = 0;
  for ( let pack in credits ) {
    len += credits[ pack ].length;
  }

  report += `## ${name} relies on the work of ${len} people:\n\n`;

  for ( let pack in credits ) {
    if ( credits[ pack ].length > 0 ) {
      report += `\n## ${pack}\n\n`;
    }
    credits[ pack ].forEach( function( credit ) {
      let columns = [ '-' ];

      if ( credit.name ) {
        columns.push( `**${ credit.name || '' }**` );
      }

      if ( credit.email ) {
        columns.push( `*${ credit.email || '' }*` );
      }

      if ( columns.length === 1 ) {
        columns.push( 'Unknown' );
      }

      let pkgCount = credit.packages.length;

      columns.push( `(${pkgCount} ${plur( 'package', pkgCount )})` );

      report += `${columns.join( ' ' )}\n`;

    } );
  }

  return report;
};
