const fs = require('fs')

module.exports.generateVerifyFile = function (name, address, args, network ) {
  return new Promise(async (resolve, reject) => {
    const path = './verify/'+name+'-'+network+'.js'
    let content = "// Contract address: " + address
    content += "\n// npx hardhat verify --constructor-args " + path + " --network "+network+ " " + address
    content += "\n\n" + "module.exports = " + JSON.stringify(args)
    fs.writeFile(path, content, err => {
      if (err) {
        console.log('Error:', err)
        reject(err)
      } else {
        console.log('Verification file ', path, 'written successfully')
        resolve()
      }
    })
  })
}
