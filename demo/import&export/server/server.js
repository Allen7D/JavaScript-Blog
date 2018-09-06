import express from 'express'
import router from './router' //引入路由配置文件

const app = express()
// 使用路由
app.use('', router)

app.listen(3000, () => console.log('浏览器输入localhost:3000'))
