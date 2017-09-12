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

      var contents = fs.readFileSync(abs_file_path, 'utf8');
      console.log(contents);

      var gcode_array = contents.split('\n').filter(Boolean); //filter for truthy values
      console.log(gcode_array);

      var gcommand_array = gcode_array.map(function(n) {
             return getGCommandFromGCode(n);
          } )
}

function getGCommandFromGCode(gcode_line)
{
    let gcommand = {};
      var gcodeSegments = gcode_line.split(' ');
    //  console.log(gcodeSegments)

      let segment_array =  gcodeSegments.map(function(seg) {
             return {letter:seg.substring(0,1).toLowerCase() , value: seg.substring(1) };
          } )

          for (seg of segment_array)
          {
            if(seg.letter == 'g')
            {
              gcommand[seg.letter] = parseInt(seg.value)
            }else {
              gcommand[seg.letter] = seg.value
            }

          }


          console.log(gcommand)

    return gcommand;
}




function throwInvalidArgsError()
{
  console.log('Please add a valid command line argument (or use "help")')

}
