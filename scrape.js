const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Write Headers
writeStream.write(`Title, Link \n`);


request('https://www.zyte.com/blog', (error, response, html) => {
    if(!error && response.statusCode==200){
        const $ = cheerio.load(html);

        $('.oxy-post').slice(1).each((i, el) => {
            const title = $(el)
                .find('.oxy-post-title')
                .text()

            const link = $(el)
                .find('.oxy-post-title')
                .attr('href');

            //Write row to CSV
                writeStream.write(`${title}, ${link} \n`);

            
        });

        console.log('Scrapping done!')
    }
});
        