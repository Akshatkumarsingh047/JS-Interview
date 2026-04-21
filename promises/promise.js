 "use strict"
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
class myPromise{
    state="Pending";

    constructor(func)
    {
       try{
        func(this.#res.bind(this),this.#rej.bind(this))
       }
       catch(err){
        console.log(err)
       }
    }

    #res(value)
    {
      
    }
    #rej(value)
    {
        
    }
}


function exec(res,rej){
   res(10)
}
const res=new myPromise(exec)




//    const res=function(val)
//     {
//         console.log("this-->",this, "value-->",val)
//     }
    

// console.log(res(100))
