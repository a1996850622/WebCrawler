var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');

var url = "https://www.esunbank.com.tw/bank/personal/deposit/rate/forex/foreign-exchange-rates";

/* Get the bank webpage */
request(url, function(error1, response, body){
	if(!error1){
		/* Write the webpage as a file */
		fs.writeFile("WebData.txt", body, function(error2){
			if(error2){
				console.log(error2);
			} else{
				console.log("The webpage was saved!");
			}
		});

		var parse = cheerio.load(body);
		console.log(body);

	} else{
		console.log(error1);
	}
});