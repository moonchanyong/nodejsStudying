/**
 * 
 */


const pq_ = require('./priorityQueue')();
const fs = require('fs'); 
const method = require('./method_')();
const Rest = require('./RESTapi')();

var test_url = 'http://httpbin.org/ip'
	var test_host = 'api.welcome.kakao.com'
/*
 * function http_get(url,callback) 
 * 
 * 
 * function http_post(url, method_, path_,data,callback)
 * 
 * var cb ;
 * download('http://httpbin.org/image/png', './sone.png', cb);
 * 
 * JSON 형식 
 * {
 * 	
 * }
 * 
 */
		
	//	http_post_file(test_host , "POST", "/post" , './sone.png'  , (d) => { console.log(d);});
		/*http_get( 'http://api.1welcome.kakao.com/seed',  (d) =>{
			console.log("get----------");
			console.log(d);						
			
		} );*/

/*http_post("api.welcome.kakao.com","GET", "/token/U7QE8lKMxKMY5TQ04ny4VdR1JCJ-X-0vYxXyWSE9","{}",(d)=>
{
	console.log(d);
});*/
		var url_list = [];
	
	var add_list = new Array();
	var del_list = new Array();
		var request = require('request');
		var req =null;
var seedapi = function (token , callback) {
let options = {
		  headers: {'X-Auth-Token': token}
		}
	console.log(token);	
	req("http://api.welcome.kakao.com/seed", function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        console.log("body>>>>>>>>>>",response.body);	        
	        callback(response.body);
	    } else {
	        console.log("error>>>>>>>>>"+error);
	        console.log("response statusCode>>>>>>>>>"+response.statusCode);
	        console.log("response body>>>>>>>>>"+response.body);
	        callback(response.body);
	    }
	});
}
var tokenapi =  function(callback) {
		let options = {				  
				}
		
			request("http://api.welcome.kakao.com/token/U7QE8lKMxKMY5TQ04ny4VdR1JCJ-X-0vYxXyWSE9", function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        console.log("body>>>>>>>>>>" , response.body);
			        callback(response.body);
			    } else {
			        console.log("error>>>>>>>>>"+error);
			        console.log("response statusCode>>>>>>>>>"+response.statusCode);
			        console.log("response body>>>>>>>>>"+response.body);
			        callback(response.body);
			    }
			})
}

var mu =  function(callback) {    callback();  }; 

var doc_api =  function(url,path,callback) {
	
			
		req(url, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    	
		    	/*
		    	 * json 구조로 array 넣을거
		    	 *  category
		    	 *  image_id
		    	 *  suceess
		    	 *  feature 
		    	 */
		        console.log("body : ",response.body);	
		        const parsedData = JSON.parse(response.body);
		        console.log("asd");
		        url_list[path[0]] = "http://api.welcome.kakao.com"+parsedData.next_url;
		        console.log(url_list[path[0]]);
		        let aJson = new Object();
		        for(let i = 0 ;  i<parsedData.images.length ; i++)
		        {
		        	
		        	aJson.category = path[0];
		        	aJson.image_id = parsedData.images[i].id;
		        	aJson.success = false;
		        	aJson.feture = 0;
		        	
		        	if(parsedData.images[i].type == "add")
		        		{
		        		let check1 = false ;
		        		//중복체크
		        		for (let x = 0 ; x<  add_list.length ; x++) {
		        		    if (add_list[x].image_id == aJson.image_id) {
		        		    	console.log("chchch",aJson.image_id);
		        		    	check1 =true ;
		        		    	break;
		        		    }
		        		}
		        		
		        		if(!check1)
		        			{
		        	    	console.log("add_psh",aJson.image_id);
		        				add_list.push(aJson);
		        				
		        			}
		        		
		        		}
		        	else if(parsedData.images[i].type == "del")
		        		{
		        		
		        		let check2 = false ;
		        		//중복체크
		        		for (let x = 0 ;  x< del_list.length ; x++) {
		        		    if (del_list[x].image_id == aJson.image_id) {
		        		    	check2 =true ;
		        		    	break;
		        		    }
		        		}
		        		
		        		if(!check2)
		        			{
		        			console.log("del_push")
		        				del_list.push(aJson);
		        			}		        		
		        		
		        		}
		        }
		        callback(response.body);
		    } else {
		        console.log("error : "+error);
		        console.log("response statusCode : "+response.statusCode);
		        console.log("response body : "+response.body);
		        callback(response.body);
		    }
		});
}

var ext_api = function(data ,callback){	
	
	req("http://api.welcome.kakao.com/image/feature?id="+data  , function (error, response, body) {
	//	console.log("http://api.welcome.kakao.com/image/feature?id="+data);
	    if (!error && response.statusCode == 200) {
	        console.log("ext_api","sucess");	        
	        callback(response.body);
	    } else {
	        console.log("error>>>>>>>>>"+error);
	        console.log("ext_api","fail");
	        console.log("response statusCode>>>>>>>>>"+response.statusCode);	        
	        callback("faiil");
	    }
	});
	
	
	
}


var save_api = function(data,callback ){
	
	req({

	url :'http://api.welcome.kakao.com/image/feature',
	method: "POST",
	body:data,
	json:true
	
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("save_api","sucess");               
        callback(true);
    } else {
        console.log("error>>>>>>>>>"+error);
        console.log("response statusCode>>>>>>>>>"+response.statusCode);
        console.log("response body>>>>>>>>>"+response.body);
        callback(false);
    }
});

}

var del_api = function(data, callback ){

	
	
	req({
		method: "DELETE",
		url :'http://api.welcome.kakao.com/image/feature',		
		body : data,
		json:true
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        console.log("del_api","sucess");	        
	        callback(true);
	    } else {
	        console.log("error>>>>>>>>>"+error);
	        console.log("response statusCode>>>>>>>>>"+response.statusCode);
	        console.log("response body>>>>>>>>>"+response.body);
	        callback(false);
	    }
	});

	
}


var losss = function(callback)
{let check = false;
	
	for(let i = 0  ; i < 5 ; i++)		
	{	
		doc_api(url_list[(seed_data_[i])[0]] ,  seed_data_[i] ,function() {
			
			for(let x = 0 ; x< add_list.length ; x++)
			{
			
			if(!add_list[x].success) // 성공 못햇을때 
			{	
			//	console.log(x.image_id);
				ext_api( add_list[x].image_id, (f) =>{
					if(f != "faiil")
					{
				//	console.log("add" ,f);
					let temp_json = JSON.parse(f);					
					let temp_json_ = { data:[temp_json.features[0]]};
					
					console.log(temp_json_);
				save_api(temp_json_ , (cc) =>{
					if(cc)
						add_list[x].success = true ;
				
					//console.log(add_list);
					if(i==4)
						check = true;
				});
					}
					else
						console.log("add_fail");
				});
			}	
			}
			for(let x =0 ; x<del_list.length; x++)
			{
				
				if(!del_list[x].success)
				ext_api( del_list[x].image_id, (f) =>{
				if(f != "faiil")
					{
					
					let temp_json = JSON.parse(f);					
					let temp_json_ = { data:[{id :temp_json.features[0].id}]};
					//console.log("delete", temp_json_)
					del_api(temp_json_ , (cc)=>{
						if(cc)
							del_list[x].success = true ;
							if(i==4)
								check = true;
					});
					}
				else
					{
					console.log("del_fail");
					}
					
					
					//console.log("del" ,f);
				//del_api(f);				
				});
					
			}	
			
		}); //*5개로 동시에 돌림  
	
	}	

	
}



//console.log(test_json);
//console.log(JSON.stringify(test_json));




/////// 실행 시작 

tokenapi((d) =>{
	//console.log("setting")
	req =  request.defaults({  
	    headers: {
	        'X-Auth-Token': d	        
	    }
	});
	seedapi(d,(dd)=>{

		
		
let seed_data = dd.split("/doc/");
//console.log(seed_data);

let seed_data_ = [] ;
for(let i = 1  ; i < 6 ; i++)
	{
	
	let temp = seed_data[i].split('/');
	
		seed_data_[i-1] = temp ;
		url_list[temp[0]]="http://api.welcome.kakao.com/doc/"+temp[0]+"/"+temp[1] ;	
	}
	




/// while 시작위치 
	
		

	for(let i = 0  ; i < 5 ; i++)		
	{	
		doc_api(url_list[(seed_data_[i])[0]] ,  seed_data_[i] ,function() {
			
			for(let x = 0 ; x< add_list.length ; x++)
			{
			
			if(!add_list[x].success) // 성공 못햇을때 
			{	
			//	console.log(x.image_id);
				ext_api( add_list[x].image_id, (f) =>{
					if(f != "faiil")
					{
				//	console.log("add" ,f);
					let temp_json = JSON.parse(f);					
					let temp_json_ = { data:[temp_json.features[0]]};
					
					console.log(temp_json_);
				save_api(temp_json_ , (cc) =>{
					if(cc)
						add_list[x].success = true ;
				
					//console.log(add_list);
						
				});
					}
					else
						console.log("add_fail");
				});
			}	
			}
			for(let x =0 ; x<del_list.length; x++)
			{
				
				if(!del_list[x].success)
				ext_api( del_list[x].image_id, (f) =>{
				if(f != "faiil")
					{
					
					let temp_json = JSON.parse(f);					
					let temp_json_ = { data:[{id :temp_json.features[0].id}]};
					//console.log("delete", temp_json_)
					del_api(temp_json_ , (cc)=>{
						if(cc)
							del_list[x].success = true ;
					
					});
					}
				else
					{
					console.log("del_fail");
					}
					
					
					//console.log("del" ,f);
				//del_api(f);				
				});
				
			}	
	
		} ); //*5개로 동시에 돌림  
	
	}
	
	
	
		
		
		
	});

	
});



/// 실행끝 ----------



/*
http_post("api.welcome.kakao.com","GET", "/seed",JSON.stringify("{}"),(d)=>
{
	console.log(d);
});*/
		 
		

	/*
http_get(test_url,  (d) =>{
	console.log("get----------");
	console.log(d);
	
	
	http_post(test_host,"POST", "/post",JSON.stringify({ "a":"1" , "b":2}),(d)=>
	{
		console.log("---------------------------------");
		console.log(d["json"]);
		
		console.log("한글체크 ");
	});
	
	
	
} );
		*/
	//	var test_data = {a:2, b:"2" };
//http_post( test_host , "POST", "/post" , JSON.stringify(test_data) , (d) => { console.log(d);});

		
		
/*fs.readFile('./method_.js', 'utf8', function (err,data) {
	  if (err) {
		    return console.log(err);
		  }
		  console.log(data);
		  //http_post( test_host , "POST", "/post" , data  , (d) => { console.log(d);});
		  
		});*/
			
/*
 * 
 * 
 * 
 * 
 * 
 */
	
		
		



		
		
		
		
/*
var pq = new PriorityQueue();

pq.enqueue(1,2);

pq.enqueue(1,3);

console.log(pq);

pq.dequeue();

console.log(pq);

*/
		
		
		
		
		
		
		