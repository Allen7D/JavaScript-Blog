const chalk = require('chalk')
const Doa = require('./application')
const app = new Doa()

app.use(async ctx => {
	ctx.body = `hello doa ${ctx.url}`
})

app.listen(3010, () => {
	console.log(chalk.yellow('服务器正常启动运行 >>  localhost:3010'))
})

