// 给一个01矩阵，1代表是陆地，0代表海洋， 如果两个1相邻，那么这两个1属于同一个岛。我们只考虑上下左右为相邻。
// 岛屿: 相邻陆地可以组成一个岛屿（相邻:上下左右） 判断岛屿个数。
// 例如：
// 输入
// [
// [1,1,0,0,0],
// [0,1,0,1,1],
// [0,0,0,1,1],
// [0,0,0,0,0],
// [0,0,1,1,1]
// ]
// 对应的输出为3

function solve( grid ) {
    let row = grid.length
    let col = grid[0].length
    let num = 0
    // 深度优先，以左上右下的顺序递归
    function dfs(i , j) {
        // 边界
        if(i<0||j<0||i>=row||j>=col) {
            return
        }
        // 遇水
        if(grid[i][j] === 0) {
            return
        }
        // 避免无限循环
        grid[i][j]=0
        dfs(i,j-1)
        dfs(i-1,j)
        dfs(i,j+1)
        dfs(i+1,j)
    }
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if (grid[i][j] === 1) {
                dfs(i, j)
                num += 1
            }
        }
    }
    return num
}

console.log(solve([[1,1,0,0,0],[0,1,0,1,1],[0,0,0,1,1],[0,0,0,0,0],[0,0,1,1,1]]))

// Reference:
// https://leetcode-cn.com/problems/number-of-islands/solution/200-jsshen-du-you-xian-tu-jie-miao-dong-8sjl8/