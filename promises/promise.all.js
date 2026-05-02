Promise.customAll=function(arr){
    return new Promise((res,rej)=>{
        let result=[];let completed=0;
        if(arr.length==0) res([]);

        for(let i=0;i<=arr.length;i++)
        {
            Promise.resolve(arr[i]).then((response)=>{
                result[i]=response;
                completed++;

                if(completed==arr.length)
                    res(result)
            }).catch(err=>{
                rej(err)
            })
        }

    })

}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1st Promise resolved!");
  }, 1000);
});

const p2 = Promise.resolve("2nd Promise resolved!");

const p3 = 3;

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let status = true;
    if (status) {
      resolve("4th Promise resolved!");
    } else {
      reject("4th Promise rejected!");
    }
  }, 2000);
});


Promise.customAll([p1, p2, p3, p4])
  .then((result) => {
    console.log("result customAll", result);
  })
  .catch((error) => {
    console.log("error customAll", error);
  });