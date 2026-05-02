flattenObj=function(obj,parent)
{
   let out={};
   function processing(obj,parent)
   {
    for (key in obj)
    {
        let newParent=parent+key;
        if(typeof obj[key]==='object')
        {
            processing(obj[key],newParent+".")
        }
        else
        {
            out[newParent]=obj[key]
        }
    }
   }

   processing(obj,"")
   return out;
}

let ob = {
    Company: "GeeksforGeeks",
    Address: "Noida",
    contact: +91-999999999,
    mentor: {
        HTML: "GFG",
        CSS: "GFG",
        JavaScript: "GFG"
    }
};

let res=flattenObj(ob)
console.log(res)