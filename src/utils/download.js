import axios from 'axios'
import FileSaver from 'file-saver'
import JSZip from 'jszip'

const getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error.toString())
      })
  })
}

const downloadFile = (arr, name, _this) => {
  const zip = new JSZip()
  const cache = {}
  const promises = []
  arr.forEach(el => {
    el.list.forEach(item => {
      const promise = getFile(item).then(data => {
        // 下载文件, 并存成ArrayBuffer对象
        const arrName = item.split('/')
        const fileName = arrName[arrName.length - 1]
        zip.folder(`${el.title}`).file(fileName, data, { binary: true })
        cache[fileName] = data
      })
      promises.push(promise)
    })
  })
  Promise.all(promises)
    .then(() => {
      _this.$message.info(` 开始下载 ${name} `)
      zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, `${name}.zip`)
      })
    })
    .catch(() => {
      _this.$message.error('出现错误，请重试！')
    })
}

export default downloadFile
