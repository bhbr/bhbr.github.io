export function numberArraySum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
export function numberArrayAverage(arr) {
    if (arr.length == 0) {
        return NaN;
    }
    return numberArraySum(arr) / arr.length;
}
export function numberArrayCumSum(arr) {
    if (arr.length == 0) {
        return [];
    }
    let cumsum = [];
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
        cumsum.push(sum);
    }
    return cumsum;
}
export function numberArrayCumAverage(arr) {
    if (arr.length == 0) {
        return [];
    }
    let cumsum = [];
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
        cumsum.push(sum / (i + 1));
    }
    return cumsum;
}
//# sourceMappingURL=numberArray.js.map