import express from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => console.log('浏览器输入localhost:3000'))
