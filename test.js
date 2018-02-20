(async () => {
	let myaq = require('./index.js')

	let instance = await myaq({
		host: '46.101.221.199',
		username: 'user',
		password: 'user'
	})
	
	let jobs = await instance.getJobs()
	
	console.log(jobs)
})()