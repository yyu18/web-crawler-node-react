const request = require('request')
const cheerio = require('cheerio')

const getDom = async (url) => {
    return new Promise((resolve,reject)=>{
        request(url, (error,response,body) => {
            if(error) return reject(error)
            const $ = cheerio.load(body)
            let jobPost = []
            $('div.jobsearch-SerpJobCard').each(async(i,elem)=>{
                let title = $(elem).find('a.jobtitle','h2.title').attr('title')
                let company_loc = $(elem).find('div.recJobLoc','div.sjcl').attr('data-rc-loc')
                let company = $(elem).find('div.sjcl>div>span.company').text()
                let value = {
                    title:title.trim(),
                    locationCom:company_loc.trim(),
                    company:company.trim()
                }
                try{
                    jobPost.push(value)
                } catch(err) {
                    reject(err)
                }
            })
            resolve(jobPost)
        });
    })
}

module.exports = { getDom }