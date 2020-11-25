/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline());
var inputs = readline().split(' ');
inputs = inputs.map(x => parseInt(x));
let max = 0,
    min = 0,
    result = 0;

for ( let i =0; i < inputs.length ; i++){
    if ( inputs[i] > inputs[i+1]){
        max = inputs[i];         
        min = max;        
        while ( inputs[i+1] < max ){
            i++;
            min = inputs[i];  
            if ( ( max - min ) > result){
            result = ( max - min );
            }          
        }      
      
    }    
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

result === -0 ?  console.log(0) : console.log(result * -1);
