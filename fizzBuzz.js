function fizzBuzz(num) {
  if (num % 5 === 0 && num % 3 === 0) {
    console.log("fizzBuzz");
  } else if (num % 3 === 0) {
    console.log("fizz");
  } else if (num % 5 === 0) {
    console.log("buzz");
  } else {
    return "does not meet criteria";
  }
}

console.log(fizzBuzz(21));
