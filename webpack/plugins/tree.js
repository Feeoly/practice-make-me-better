// Refrence: 
// https://www.webpackjs.com/contribute/writing-a-plugin/#%E5%88%9B%E5%BB%BA%E6%8F%92%E4%BB%B6

function TreePlugin(options) {
    console.log('TreePlugin---',this, options)
  }
  
  TreePlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      let tree = `In this build:\n`
      // for (let filename in compilation.assets) {
      //   tree += `-${filename}\n`
      // }
      // compilation.assets['tree.md'] = {
      //   source: function() {
      //     return tree
      //   },
      //   size: function() {
      //     return tree.length
      //   }
      // }
  
      // 检索每个（构建输出的）chunk：
      compilation.chunks && compilation.chunks.forEach(function(chunk) {
        // 检索 chunk 中（内置输入的）的每个模块：
        tree += `chunk:${chunk.filename}-${chunk.name}-${chunk.id}\n`
        chunk.modules && chunk.modules.forEach(function(module) {
          tree += `module:${module.filename}-${module.name}-${module.id}\n`
          // 检索模块中包含的每个源文件路径：
          module.fileDependencies && module.fileDependencies.forEach(function(filepath) {
            tree += `filepath:${filepath}\n`
            // 我们现在已经对源结构有不少了解……
          });
        });
      })
      compilation.assets['tree.md'] = {
        source: function() {
          return tree
        },
        size: function() {
          return tree.length
        }
      }
      callback()
    })
  }
  
  module.exports = TreePlugin
  