let randomName = 'bro.cs';
let popIt = randomName.split('.').pop();
let arr = ['cs', 'ts', 'ss'];

if ((popIt !== undefined) && (arr.includes(popIt))) {
    console.log(popIt);
} else {
    console.log('does not contain extension');

}

let indexO = arr.indexOf('ts');
console.log(indexO);


let person = {
    'name':'string',
    'id':'number',
}

for(let yes in person) {
    console.log();
    
}