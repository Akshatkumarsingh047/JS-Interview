// The input ca be any Array
//Therefore Define the Flatten Method on Array.prototype

function flatten()
{
      let out=[];
      let cnt=0;
      function processing(arr)
      {
        console.log(++cnt + " times")
        for(let i=0;i<arr.length;i++)
        {
            if(Array.isArray(arr[i]))
            {
                processing(arr[i]);
            }

            else
            {
                out.push(arr[i])
            }
        }
      }

      processing(this);
     
      return out;
}

Array.prototype.flatten=flatten

const input=[1, [2, [3, [88,[48,90,[900,[[[800]]]]]]], 5], 6];
const res=input.flatten();
console.log(res);