// 同步的compose

// function add(x, y) {
// 	return x + y
// }

// function double(z) {
// 	return 2 * z
// }

// function compose(midds) {
// 	return (...args) => {
// 		let res = midds[0](...args)
// 		for (let i=1; i< midds.length; i++) {
// 			res = midds[i](res)
// 		}
// 		return res
// 	}
// }

// const middlewares = [add, double]
// const fn = compose(middlewares)
// console.log(fn(1, 2))


// 异步的compose
async function fn1(next) {
	console.log('fn1 start')
	await next()
	console.log('fn1 end')
}

async function fn2(next) {
	console.log('fn2 start')
	await delay()
	await next()
	console.log('fn2 end')
}

async function fn3(next) {
	console.log('fn3')
}

function delay() {
	return new Promise((reslove, reject) => {
		setTimeout(() => reslove(), 2000)
	})
}

function compose(midds) {
	function dispatch(i) {
		let fn = midds[i]
		if (!fn) return Promise.resolve()
		return Promise.resolve(fn(function next() {
			return dispatch(i + 1)
		}))
	}

	return function () {
		return dispatch(0)
	}
}

const middlewares = [fn1, fn2, fn3]
const fn = compose(middlewares)
fn()

