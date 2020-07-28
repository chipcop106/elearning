const generateLink = (number) => {
    let arr = [];
    if(number >= 6){
        let head = [], tail = [];
        let i = 0;
        while(head.length < 5){
            tail.push(number+i);
            head.push(number-i);
            i++;
        }
        arr = [...new Set(head.sort((a,b)=> (a - b)).concat(tail))];
    }else {
        for(let i = 0; i < 10; i++){
            arr.push(i+1);
        }
    }
    return arr;
}

result = generateLink(7);

console.log(result);