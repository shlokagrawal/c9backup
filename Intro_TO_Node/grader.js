function average(arr)
{
    var total=0;
    for(var i=0;i<arr.length;i++)
    {
        total=arr[i]+total;
    }
    return total/arr.length;
}

var scores=[90, 98, 89, 100, 100, 86, 94];
console.log(Math.round(average(scores)));

var scores2=[40, 65, 77, 82, 80, 53, 73, 63, 95, 49];
console.log(Math.round(average(scores2)));