// Simple syntax test for the city page
const testFunction = () => {
  const testVar = "test";
  
  const innerFunction = () => {
    return "inner result";
  };
  
  const result = innerFunction();
  
  return (
    `Result: ${result}`
  );
};

console.log(testFunction());