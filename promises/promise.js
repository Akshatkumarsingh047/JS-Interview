"use strict";
// function init()
// {

//     function executor(resolve, reject){

//                 resolve(10)

//     }
//     return new Promise(executor)
// }

// const instance=init();
// instance.then((data)=>{
//     console.log(`hello i resolved with ${data}`)
//     return 11;

// }).then((data)=>console.log(`hello i resolved with ${data}`)).catch((data)=>console.log(`hello i rejected with ${data}`))

//----------Why Promises?? let's suppose getUser made an Api call to get users then it that case it
//  becomes an async operation and then the getUser function Returns an empty Array of Users [],
// so the FindUser functions returns undefined

// function getUsers(){
//     let users=[];
//     setTimeout(()=>{
//     users= [
//       { username: 'john', email: 'john@test.com' },
//       { username: 'jane', email: 'jane@test.com' },
//     ];
//     },1000)
//     return users;
// }

// function findUser(name){
//    users= getUsers();
//    user=users.find((u)=>u.username===name)
//    return user;
// }

// console.log(findUser("jane"))

//Using call backs to resolve the problem

//

// Promise Polyfill

const STATE = {
  PENDING: "Pending",
  FULFILLED: "Fulfilled",
  REJECTED: "Rejected",
};
// class myPromise {
//   #state = STATE.PENDING;
//   #value = void 0;
//   #resolutionHandlers=[];
//   #rejectionHandlers=[]
//   #runResolutionHandlers(){
//      if (this.#resolutionHandlers.length==0) return;
//      this.#resolutionHandlers.forEach((resHandler)=>resHandler(this.#value))
//       this.#resolutionHandlers=[]
//   }
//  #runRejectionHandlers(){
//      if (this.#rejectionHandlers.length==0) return;
//      this.#rejectionHandlers.forEach((rejHandler)=>rejHandler(this.#value))
//      this.#rejectionHandlers=[]
    
//   }
 
//   constructor(func) {
//     try {
//       func(this.#res.bind(this), this.#rej.bind(this));
//     } catch (err) {
//      this.#rej(err)
//     }
//   }

//   #res(value) {
//   queueMicrotask(()=>{
//      if (this.#state != STATE.PENDING) return;
//     this.#state = STATE.FULFILLED;
//     this.#value = value;
//     this.#runResolutionHandlers()
//   })
//   }
//   #rej(value) {
//    queueMicrotask(()=>{
//        if (this.#state != STATE.PENDING) return;
//     this.#state = STATE.REJECTED;
//     this.#value = value;
//     this.#runRejectionHandlers()
//    })
//   }

//   then(resHandler, rejHandler) {
//     return new myPromise((resolve, reject) => {
//       function thenHandler(result) {
//         try {
//           if (!resHandler) return resolve(result);

//           //if there is some resHandler in then method

//           const returned = resHandler(result);

//           if (returned instanceof myPromise) {
//             returned.then(resolve, reject);
//           } else {
//             return resolve(returned);
//           }
//         } catch (err) {
//           return reject(err);
//         }
//       }
//         this.#resolutionHandlers.push(thenHandler)


//          function catchHandler(result) {
//         try {
//           if (!rejHandler) return reject(result);

//           //if there is some resHandler in then method

//           const returned = rejHandler(result);

//           if (returned instanceof myPromise) {
//             returned.then(res, rej);
//           } else {
//             return resolve(returned);
//           }
//         } catch (err) {
//           return reject(err);
//         }
//       }
//         this.#rejectionHandlers.push(catchHandler)

//         if(this.#state==STATE.FULFILLED)
//         {
//             this.#runResolutionHandlers()
//         }

//         else if(this.#state==STATE.REJECTED)
//         {
//              this.#runResolutionHandlers()
//         }
//     });
//   }

//   catch(rejectionHandler) {
//    return this.then(null,rejectionHandler)
//   }
// }



//------------Revision 01---------
//Promise polyFill

class myPromise{
  #state=STATE.PENDING;
  #value=undefined;
  #resHandlers=[];
  #rejHandlers=[];
  #runResolveHandlers(){
    if(this.#resHandlers.length==0) return;
    console.log(this.#resHandlers)
    this.#resHandlers.forEach((h)=>h(this.#value))
    this.#resHandlers=[];
  }
   #runRejectHandlers(){
    if(this.#rejHandlers.length==0) return;
    console.log(this.#rejHandlers)
    this.#rejHandlers.forEach((h)=>h(this.#value))
    this.#rejHandlers=[];
  }
  constructor(func){
    func(this.#resolve.bind(this),this.#reject.bind(this));
  }
  #resolve(value)
  {
    if(this.#state!==STATE.PENDING) return;
    queueMicrotask(()=>{
        this.#state=STATE.FULFILLED;
        this.#value=value;
        this.#runResolveHandlers()
    })

  }

  #reject(value)
  {

      if(this.#state!==STATE.PENDING) return;
    queueMicrotask(()=>{
        this.#state=STATE.REJECTED;
        this.#value=value;
        this.#runRejectHandlers()
    })
  }

  then(resHandler,rejHandler){
    return new myPromise((resolve , reject)=>{
      function thenHandler(result){
           try{
            if(!resHandler) resolve(result);
            const returned=resHandler(result);
            if(returned instanceof myPromise)
            {
              returned.then(res,rej)
            }
                 
            else
            {
              resolve(returned)
            }
           }
           catch(err){
              return reject(err);
           }
      }
      this.#resHandlers.push(thenHandler)

      function catchHandler(result){
            try{
            if(!rejHandler) reject(result);
            const returned=rejHandler(result);
            if(returned instanceof myPromise)
            {
              returned.then(res,rej)
            }
                 
            else
            {
              resolve(returned)
            }
           }
           catch(err){
              return reject(err);
           }
      }
       this.#rejHandlers.push(catchHandler)
    })
  }

  catch(rejectionHandler){
      return this.then(null,rejectionHandler);
  }
}

// const promise = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Call is resolved');
//   }, 1000);
// });

// promise.then(value => {
//   console.log('Value after 1 sec - ', value);
// });

// const promise2 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(new Error('Error happened !!'));
//   }, 1000);
// });

// promise2.then(
//   value => {
//     console.log('Value after 1 sec - ', value);
//   },
//   error => {
//     console.log('Error - ', error.message);
//   }
// );

// Output
// Error - Error happened !!


// Output:
// Value after 1 sec - Call is resolved

const promise2 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Error happened !!'));
  }, 1000);
});

promise2
.then(value => {
  console.log('Value after 1 sec - ', value);
})
.catch(
  error => {
    console.log('Error from catch - ', error.message);
  }
)

// Output:
// Error from catch - Error - Error happened !!