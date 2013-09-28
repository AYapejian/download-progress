# download-progress (http://travis-ci.org/AYapejian/download-progress)

Download files while displaying progress bar on the command line

## Getting Started
Install the module with: `npm install download-progress`

```javascript
var DownloadProgress = require('../lib/download-progress.js');

var urls = [
	{
		url: 'https://s3.amazonaws.com/node-webkit/v0.7.5/node-webkit-v0.7.5-win-ia32.zip',
		dest: 'node-webkit-v0.7.5-win-ia32.zip'
	}, {
		url: 'https://s3.amazonaws.com/node-webkit/v0.7.5/node-webkit-v0.7.5-linux-ia32.tar.gz',
		dest: 'node-webkit-v0.7.5-linux-ia32.tar.gz'
	}, {
		url: 'https://s3.amazonaws.com/node-webkit/v0.7.5/node-webkit-v0.7.5-osx-ia32.zip',
		dest: 'node-webkit-v0.7.5-osx-ia32.zip'
	}
];

var options = {};
var download = DownloadProgress(urls, options);

download.get(function (err) {
	if (err) { throw new Error(err); }
	console.log('DONE');
});
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing


## Release History
0.0.0 Initial release, basic functionality

## License
Copyright (c) 2013 Ara Yapejian. Licensed under the MIT license.
