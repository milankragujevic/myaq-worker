const fetch = require('isomorphic-fetch')
const promise = require('es6-promise')
const FormData = require('form-data')

promise.polyfill()

module.exports = async (config) => {
	if(typeof config.host == 'undefined' || !config.host) {
		throw Error(`Please include a valid 'host' in the config!`)
	}
	if(typeof config.username == 'undefined' || !config.username) {
		throw Error(`Please include a valid 'username' in the config!`)
	}
	if(typeof config.password == 'undefined' || !config.password) {
		throw Error(`Please include a valid 'password' in the config!`)
	}
	if(!config.version) {
		config.version = 'v1'
	}
	this.config = config
	this.logIn = async () => {
		console.log('logging in...')
		await fetch('http://' + this.config.host + '/api/' + this.config.version + '/login', {
			method: 'post',
			body: new FormData({
				username: this.config.username,
				password: this.config.password
			}),
			credentials: 'include'
		}).then(async (response) => await response.json()).then(async (response) => {
			console.log('http success')
			if(response.status == 500) {
				console.log(response)
				throw Error(`Couldn't log in, are the credentials correct?`)
			} else {
				console.log('successfully logged in')
				return true
			}
		}).catch((err) => {
			console.error('http failure')
			console.log(err)
			throw Error(`Couldn't perform login!`)
		})
	}
	this.getJobs = async () => {
		
	}
	await fetch('http://' + this.config.host + '/api/' + this.config.version + '/is-logged-in', {
		method: 'get',
		credentials: 'include'
    }).then(async (response) => await response.json()).then(async (response) => {
		console.log('http success')
		if(response.status == 500) {
			console.log('not logged in')
			await this.logIn()
		} else {
			console.log('already logged in')
		}
	}).catch((err) => {
		console.error('http failure')
		console.log(err)
		throw Error(`Couldn't perform is-logged-in!`)
	})
	return this
}