const Busboy = require('busboy')
const uuid4 = require('uuid/v4')
const path = require('path')
const fs = require('fs')

module.exports = {
  saveImg(request, pathToSave) {
    return new Promise((resolve, reject) => {
      const busboy = new Busboy({
        headers: request.headers,
        limits: { files: 1 },
      })
      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const [typeFile, extFile] = mimetype.split('/')

        if (typeFile !== 'image') {
          reject(new Error('File must be image'))
        }

        const saveTo = path.resolve(pathToSave, `${uuid4()}.${extFile}`)
        file.pipe(fs.createWriteStream(saveTo))
        resolve(saveTo)
      })
      request.pipe(busboy)
    })
  },
  responceGood(ctx, status, message) {
    ctx.status = status
    ctx.body = {
      status,
      message,
    }
  },
}
