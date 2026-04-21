Function.prototype.myBind = function (context, ...args) {
  

  
  // Step 2: Assign context
  let currentContext = context || globalThis;

  // Step 3: Create a temporary new symbol key & assign the function
  let newProp = Symbol();
  currentContext[newProp] = this;

  // Step 4: function invocation
 return function (...newArgs)
 {
    return currentContext[newProp](...newArgs,...args)
 }
 

  return result;
};


function userInfo(city) {
    console.log(`${this.name} is ${this.age} years old, lives in ${city}`);
  }

// Object Context
const user = {
    name: "Ram",
    age: 23,
};

// First Arg - Context (user)
// The rest of the arguments passed to the function, here 'Jaipur' passed to the city arg
const functionWithContext = userInfo.myBind(user, 'Jaipur');

functionWithContext(); // Output: Ram is 23 years old, lives in Jaipur