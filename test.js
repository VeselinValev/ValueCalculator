function DoubleToFraction(num, epsilon, maxIterations) {
    num = num-1;
    let d = [];
    d[1] = 1;
    d[0] = 0;
    let z = num;
    let n = 1;
    let t = 1;

    let wholeNumberPart = Math.floor(num);
    let decimalNumberPart = num - wholeNumberPart;

    while (t < maxIterations && Math.abs(n / d[t] - num) > epsilon) {
        t += 1;
        if (z - Math.floor(z) !== 0){
            z = 1 / (z - Math.floor(z));
            d[t] = d[t - 1] * Math.floor(z) + d[t - 2];
            n = Math.floor(num * d[t] + 0.5)
        }else{
            d[t] = 1;
            n = num;
        }

    }
    let result = n + "/" + d[t];
    return result;
}

console.log(DoubleToFraction(2.3, 0.0001, 20));
