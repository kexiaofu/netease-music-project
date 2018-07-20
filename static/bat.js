const { spawn } = require('child_process')
var path = require('path')

const bat = (url,addr) => {
  let id = /(=.\d*)/g.exec(url)[0].substring(1);
  const ls = spawn('node', [path.join('./static', 'phantomjs/bin/phantomjs'), path.join('./static', 'music.js'), id,addr ]);
  ls.stdout.on('data', (data) => {
    console.log(`输出：${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.log(`错误：${data}`)
  })

  ls.on('close', (code) => {
    if(code === 0) {
      alert('程序已经完成，请查看歌单'+id+'.json 是否成功导出')
    } else {
      alert('程序发生了一些问题，请检查歌单'+id+'.json 是否成功导出')
    }

  })
}

export default bat
