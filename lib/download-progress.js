/*
 * download-progress
 * https://github.com/AYapejian/download-progress
 *
 * Copyright (c) 2013 Ara Yapejian
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var ProgressBar = require('progress');
var https = require('https');
var http = require('http');
var URL = require('url');
var async = require('async');

function DownloadProgress(urls, options) {
	if (!urls) { throw new Error('urls not set'); }

	if (!(this instanceof DownloadProgress)) {
		return new DownloadProgress(urls, options);
	}


	this.urls = urls;
	this.options = options || {};

	// TODO: Detect from URL if is https or http
	this.protocol = 'https';
}

DownloadProgress.prototype.get = function (callbackAllFilesFetched) {
	var self = this;

	async.eachSeries(self.urls, function (url, callbackRequestDone) {
		self._getFile(url.url, url.dest, url.url, function (err) {
			if (err) { throw new Error(err); }
			callbackRequestDone();
		});

	}, function (err) {
		if (err) { callbackAllFilesFetched(err); }
		callbackAllFilesFetched();
	});
};

DownloadProgress.prototype._getFile = function (srcUrl, copyPath, displayMessage, callback) {
	var req;

	srcUrl = URL.parse(srcUrl);

	if (srcUrl.protocol.match(/^http:/i) !== null && srcUrl.protocol.match(/^http:/i).length) {
		req = http.request({
			host: srcUrl.host,
			port: srcUrl.port || 80,
			path: srcUrl.path
		});
	} else if (srcUrl.protocol.match(/^https:/i) !== null && srcUrl.protocol.match(/^https:/i).length) {
		req = https.request({
			host: srcUrl.host,
			port: srcUrl.port || 443,
			path: srcUrl.path
		});
	} else {
		throw new Error('Protocol ' + srcUrl.protocol + ' is not supported');
	}


	req.on('response', function (res) {
		var len = parseInt(res.headers['content-length'], 10);
		var file = fs.createWriteStream(copyPath);

		console.log(displayMessage);
		var bar = new ProgressBar('[:bar] :percent :etas', {
			complete: '=',
			incomplete: ' ',
			width: 50,
			total: len,
		});

		res.on('data', function (chunk) {
			file.write(chunk);
			bar.tick(chunk.length);
		});

		res.on('error', function (err) {
			callback(err);
		});

		res.on('end', function () {
			file.end();
			callback();
		});
	});

	req.end();
};


module.exports = DownloadProgress;
