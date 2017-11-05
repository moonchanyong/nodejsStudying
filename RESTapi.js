/**
 * 카카오용 REST API
 * 
 * from Gaelly  
 *
 * 
 * function http_get(url(http 포함해서 ),callback) 
 * 
 * 
 * function http_post(hostname(http제외), method_(대문자 STRING), path_ (/붙여야함),data(형식없어도됨),callback)
 * function download('someURI', '/some/destination', cb)
 */
module.exports = function()
{
const fs = require('fs');
const http = require('http');
const  URL  = require('url');
var test_url = 'https://httpbin.org/ip';
const https = require('https');
https.post = require('https-post');

//------------------------------------------
//http 이용 
http_get = function (url,callback) 
{
	let ret =null ;
http.get(url, (res) => {
	  const statusCode = res.statusCode;
	  const contentType = res.headers['content-type'];

	  let error;
	  if (statusCode !== 200) {
	    error = new Error('Request Failed.\n' +
	                      `Status Code: ${statusCode}`);
	  } else if (!/^application\/json/.test(contentType)) {
	    error = new Error('Invalid content-type.\n' +
	                      `Expected application/json but received ${contentType}`);
	  }
	  if (error) {
	    console.log(error.message);
	    // consume response data to free up memory
	    res.resume();
	    return;
	  }

	  res.setEncoding('utf8');
	  let rawData = '';
	  res.on('data', (chunk) => rawData += chunk);
	  res.on('end', () => {
	    try {
	      const parsedData = JSON.parse(rawData);
	      //console.log(parsedData);
	      
	      ret = parsedData; 
	    //  console.log(ret);
	      callback(ret);
	    } catch (e) {
	      console.log(e.message);
	    }
	  
	  });
	}).on('error', (e) => {
	  console.log(`Got error: ${e.message}`);
	});


}
// ------------------------------------

http_post =function (url, method_, path_,data,callback)
{
	let ret = null;
console.log(data);

	const options = {
			host : url,
			method : method_,
			port:null,
			 path:path_,
			  headers: {
			   'Content-Type': 'text/plain',
			    'Content-Length': Buffer.byteLength(data),
			    'X-Auth-Token': 'Tl84KW2yY2y9dtNVWvOWe807kUYblbr96nlvRSw05qjKl4dG0fW6zp3lWqy6YH6qb'
			  }

			};

	const req = http.request(options, (res) => {
		 console.log(`STATUS: ${res.statusCode}`);
		 console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		  
		  res.setEncoding('utf8');
		  let rawData = '';
		  res.on('data', (chunk) => rawData += chunk);
		  res.on('end', () => {
		    console.log('No more data in response.');
		    try {
			      const parsedData = JSON.parse(rawData);
			      //console.log(parsedData);
			      
			      ret = parsedData; 
			    //  console.log(ret);
			      callback(ret);
			    } catch (e) {
			      console.log(e.message);
			    }
		  });
		});

		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});

		// write data to request body
		req.write(data);
		req.end();
	
	
}



	download = function(url, dest, cb) {
		var file = fs.createWriteStream(dest);
		var request = http.get(url, function(response) {
	    response.pipe(file);
	    file.on('finish', function() {
	      file.close(cb);	      
	    });
	  });
	}




http_post_file =function (url, method_, path_,file_path,callback)
{
	
	let req = null;
	let ret = null;
	var stream = fs.createReadStream(file_path);
	stream.on('data', function(data) {
		  
		const options = {
				host : url,
				method : method_,
				port:null,
				 path:path_,
				  headers: {
				 //   'Content-Type': 'application/x-www-form-urlencoded',
				    'Content-Length': Buffer.byteLength(data)
				  }
		
				};
		
		
		
		req = http.request(options, (res) => {
			//  console.log(`STATUS: ${res.statusCode}`);
			 // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			  res.setEncoding('utf8');
			  let rawData = '';
			  res.on('data', (chunk) => rawData += chunk);
			  res.on('end', () => {
			    console.log('No more data in response.');
			    try {
				      const parsedData = JSON.parse(rawData);
				      //console.log(parsedData);
				      
				      ret = parsedData; 
				    //  console.log(ret);
				      callback(ret);
				    } catch (e) {
				      console.log(e.message);
				    }
			  });
			});
		req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
		req.write(data);
	
		  
		  
		});
	
	
	


	
		// write data to request body

		stream.on('end', function() {
			  req.end();
			});

	
	
}

} // module - end

















