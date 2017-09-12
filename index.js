const gparser= require('gcode-parser')
const fs= require('fs')
const path = require('path');
//console.log('hello parser')
//console.log(gparser)

let primary_arg = process.argv[2];
let secondary_arg = process.argv[3];

if (typeof primary_arg == 'undefined')
{
  throwInvalidArgsError();
  return
}

switch (primary_arg.toLowerCase()) {
  case 'help':
    let help_text = 'Valid commands:'

    console.log(help_text)
    break;
  case 'parse':

    parseGCodeAtPath(secondary_arg)
    //Statements executed when the result of expression matches value2
    break;


  default:
    //Statements executed when none of the values match the value of the expression
      throwInvalidArgsError();
      break;
}

function parseGCodeAtPath(file_path)
{
    let abs_file_path = require('path').resolve(__dirname, file_path);

    console.log( abs_file_path )
}


function throwInvalidArgsError()
{
  console.log('Please add a valid command line argument (or use "help")')

}
