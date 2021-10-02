
/**
 * 
 * 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 */
function findIn2DArray(grid, key) {
    let rowLen = grid.length
    let colLen = grid[0].length
    let i = 0
    let j = colLen - 1
    while(i < rowLen && j < colLen) {
        if(key === grid[i][j]) {
            return true
        }
        if (key < grid[i][j]) {
            j--
        }
        if (key > grid[i][j]) {
            i++
        }
    }
    return false
}

// 递归
function Find(arr, target) {
    let i = 0
    let j = arr[0].length;
    return compare(arr, target, i, j);
}
function compare(arr, target, i, j) {
    if (arr[i] === undefined || arr[i][j] === undefined) {
        return false;
    }
    if(arr[i][j]===target) {
        return true
    }
    if (arr[i][j]>target) {
        return compare(arr, target, i,j-1)
    }
    if (arr[i][j]<temp) {
        return compare(arr, target, i+1,j)
    }
}

// 二分法
function binarySearch(data, arr, start, end) {
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((end + start) / 2);
    if (data == arr[mid]) {
        return mid;
    } else if (data < arr[mid]) {
        return binarySearch(data, arr, start, mid - 1);
    } else {
        return binarySearch(data, arr, mid + 1, end);
    }
}

const arr = [[1,2,3],[4,5,6],[7,8,9]]
const res = findIn2DArray(arr,2)
console.log(res)