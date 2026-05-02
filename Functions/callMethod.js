// function greet ( age)
// {
//     const res= `hi, ${this.name} is ${age} years old`
//     console.log(res)
// }

// greet.call({name:"akshat"},25)


// Function.prototype.myCall=function(context,...args){
//    let currentContext=context||globalThis

//    console.log(currentContext,args)

//    let newProp=Symbol();   // so that the Context's (Object's i.e first argument's) existing method does not
//                             //  Mixes with the the function name on which call is called
 
//    currentContext[newProp]=this;
//    const res=currentContext[newProp](...args)

//      // Step 5: Delete temporary key
//   delete currentContext[newProp];
   
//    return res;
// }

// // function
// function getEmployeeInfo (role, company) {
//   console.log(
//     `${this.firstName} ${this.lastName} works as ${role} in ${company}`
//   );
// };

// // object 1
// const employee1 = {
//   firstName: 'Anuj',
//   lastName: 'Sharma',
//   age: '32',

//   getAge: function() {
//     console.log(`Employee age is ${this.age}`);
//   }
// };

// // object 2
// const employee2 = {
//   firstName: 'Ajay',
//   lastName: 'Singh',
//   age: '28'
// };

// Passing the employee1 context to the getEmployeeInfo
// getEmployeeInfo.myCall(employee1, 'Engineering Manager', 'Dell');
// Output: Anuj Sharma works as Engineering Manager in Dell

// // Passing the employee2 context to the getEmployeeInfo
// getEmployeeInfo.myCall(employee2, 'Software Engineer', 'Microsoft');
// // Output: Ajay Singh works as Software Engineer in Microsoft

// employee1.getAge.myCall(employee2);
// Output: Employee age is 28

//---------REVISION-----------------------------
Function.prototype.myCall=function(context,...args){

  let obj=context||globalThis;
  console.log("before--",obj);
  const newProp=this;
  obj[newProp]=this;

  console.log("after",obj)
  console.log("this--",this)
  const res=obj[newProp](...args);
  delete obj[newProp];
  return res;

}

Function.prototype.myApply=function(context,args){
  const obj=context||globalThis;
  let newProp=Symbol();
  obj[newProp]=this;
  const res=obj[newProp](...args)
  return res;


}

Function.prototype.myBind=function(context,args){
  const obj=context||globalThis;
  let newProp=Symbol();
  obj[newProp]=this;
  const res=function(...newargs){
   return obj[newProp](...args,...newargs)
  }
  return res;


}

const obj1={
  firstName:"akshat",
  lastName:"singh",
 myName: function(age,city){
    return "My name is" +" "+  this.firstName +this.lastName +" "+ "and my age is"+ " "+age +` i live in ${city}`;
  }
}

const obj2={
  firstName:"AKS",
  lastName:"XYZ"
}

const res=obj1.myName.myBind(obj2,[25,"Dhanbad"]);
console.log(res())
