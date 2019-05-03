if(process.env.NODE_ENV === 'development') {
	module.exports = {
		devServer: {
			proxy: 'http://localhost:5000/sampleexpressvue/us-central1'
		}
	}
}