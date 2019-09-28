const http = require('http')

let request = {
	get url() {
		return this.req.url
	}
}

let response = {
	_body: undefined,
	get body() {
		return this._body
	},
	set body(val) {
		this._body = val
	}
}

let context = {
	get url() {
		return this.request.url
	},
	get body() {
		return this.response.body
	},
	set body(val) {
		this.response.body = val
	}
}

class Application {
	constructor() {
		this.callback = () => {}
		this.context = context
		this.request = request
		this.response = response
	}
	createCtx(req, res) {
		let ctx = Object.create(this.context)
		ctx.request = Object.create(this.request)
		ctx.response = Object.create(this.response)
		ctx.req = ctx.request.req = req
		ctx.res = ctx.response.res = res
		return ctx
	}
	use(callback) {
		this.callback = callback
	}
	listen(...args) {
		const server = http.createServer(async (req, res) => {
			let ctx = this.createCtx(req, res)
			await this.callback(ctx)
			ctx.res.end(ctx.body)
			// 添加各种响应头
			// this.callback(req, res)
		})
		server.listen(...args)
	}
}

module.exports = Application