String.prototype.mysplit=function(del){

let res=[];
if(del==="")return Array.from(this)
    if(this.indexOf(del)<0)return this;

    function splitString(str,i)
    {
        if(i>=this.length) return;
        const index=str.indexOf(del);
        if(index>=0)
        {
            res.push(str.substring(0,index));
            splitString(str.substring(index+del.length),index+del.length)
        }
        else{
            res.push(str);
        }


    }
    splitString(this,0)

    return res;
}

const res="AKSHAT SINGH".mysplit("S")

console.log(res)