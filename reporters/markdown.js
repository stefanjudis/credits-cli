'use strict';

let plur    = require( 'plur' );

module.exports = function( name, credits ) {
  let report = `# Credits for ${name}\n`;

  report += `## ${name} relies on the work of ${credits.length} people:\n\n`;

  credits.forEach( function( credit ) {
    let columns = [
      `- **${credit.name}**`
    ];

    if ( credit.email ) {
      columns.push( `*${ credit.email || '' }*` );
    }

    let pkgCount = credit.packages.length;

    columns.push( `(${pkgCount} ${plur( 'package', pkgCount )})` );

    report += `${columns.join( ' ' )}\n`;

  } );

  return report;
};
