var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "https://www.esunbank.com.tw/bank/personal/deposit/rate/forex/foreign-exchange-rates";

/* Get the data the webpage */
request(url, function (error, response, body) {
    if (!error) {

    	// console.log(body);

    	/* Save the source code of the webpage */
    	fs.writeFile('WebData.txt', body, function(err){
    		if(err){
    			console.log(err);
    		} else{
    			console.log('The webpage was saved!');
    		}
    	});

        /* Parse the html data */
        var $ = cheerio.load(body);

        /* Search for exchange rate in various currencies */
        var queryResult = [];

        /* Catch the data of exchange rate */
        $('.inteTable tr.tableContent-light').each(function(i, elem){
        	/* Save the result to queryResult */
            queryResult.push($(this).text().split('\n'));
        });

        // console.log(queryResult);

        /* Sort the result of search */
        var output = [];
        for(var i=0; i<queryResult.length; i++) {
            output.push({
            	/* currency */
                coin: queryResult[i][2].replace(/\s/g, ''),

                /* Buy in */
                in: queryResult[i][6].replace(/\s/g, ''),

                /* Sell out */
                out: queryResult[i][7].replace(/\s/g, '')
            });
        }
        console.log(output);
    } 

    else {
        console.log(error);
    }
});