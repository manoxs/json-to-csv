const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;

readFile('./name.json', 'utf-8', (err, fileContent) => {
	if (err) {
		console.log(err);
		throw new Error(err);
	}

	const csvData = csvjson.toCSV(fileContent, {
		headers: 'key',
		delimiter: ",",
		wrap: false
	});
	writeFile('./name.csv', csvData, (err) => {
		if(err) {
			console.log(err);
			throw new Error(err)
		}
		console.log('Success');
	});
});
