export function removeOne(arr, value) {
    // remove the first encountered matching entry of an object or value from an Array
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            arr.splice(i, 1);
            return true;
        }
    }
    return false;
}
export function removeAll(arr, value) {
    var found = true;
    while (found) {
        found = removeOne(arr, value);
    }
}
export function remove(arr, value, all = false) {
    if (all) {
        removeAll(arr, value);
    }
    else {
        removeOne(arr, value);
    }
}
export function clear(arr) {
    let l = arr.length;
    for (var i = 0; i < l; i++) {
        arr.pop();
    }
}
export function concat(arr1, arr2) {
    let ret = [];
    for (let x of arr1) {
        ret.push(x);
    }
    for (let x of arr2) {
        ret.push(x);
    }
    return ret;
}
export function extend(arr1, arr2) {
    for (let x of arr2) {
        arr1.push(x);
    }
}
export function convertStringToArray(s) {
    let brackets = ["(", ")", "[", "]"];
    let whitespace = [" ", "\t", "\r", "\n"];
    for (let char of brackets.concat(whitespace)) {
        s = s.replace(char, "");
    }
    if (s.length == 0)
        return [];
    let a = s.split(",");
    if (a.length == 0) {
        return [s];
    }
    return a;
}
export function convertArrayToString(array) {
    var arrayString = "(";
    for (let s of array) {
        arrayString += s;
        arrayString += ",";
    }
    if (arrayString.length > 1) {
        arrayString = arrayString.slice(0, arrayString.length - 1);
    }
    arrayString += ")";
    return arrayString;
}
export function removeDuplicates(arr) {
    let ret = [];
    for (let x of arr) {
        if (ret.includes(x)) {
            continue;
        }
        ret.push(x);
    }
    return ret;
}
export function equalArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=arrays.js.map