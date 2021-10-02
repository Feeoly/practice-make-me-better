/**
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 
 * 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 
 * 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
 */


 function findMinValue(arr) {
    if (!arr.length) {
        return 0
    }
    let i = 0
    let candidate = arr[0]
    while(i<arr.length) {
        if (arr[i]>=arr[i+1]) {
            candidate = arr[i+1]
        }
        i++
    }
    return candidate
}

const min = findMinValue([7,8,9,3,4,5,1,2])
console.log('min-', min)

function minNumberInRotateArray(arr) {
    if (!arr.length) {
        return 0
    }
    let low = 0
    let high = arr.length - 1
    while(low<high) {
        let mid = Math.floor((low+high)/2)
        console.log(mid, arr[mid],arr[high])
        if(arr[mid]>arr[high]){
            low = mid+1
        } else if (arr[mid]<arr[high]) {
            high = mid
        } else {
            high--
        }
    }
    return arr[low]
}

const res = minNumberInRotateArray([7,8,9,3,4,5,1,2])
console.log('minNumberInRotateArray-', res)