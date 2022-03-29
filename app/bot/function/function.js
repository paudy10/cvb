const axios = require("axios")
const cheerio = require("cheerio")
const User = require("../../model/user");

async function getPrice(index){
    try{
        const SiteUrl = 'https://coinmarketcap.com/'

        const {data} = await axios({
            method: "GET",
            url: SiteUrl,
        })
        const $ = cheerio.load(data)
        const elemSelector = `#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr:nth-child(${index})`
        
        const keys = [
            'rank','name',
            'price','24h','7d','marketCap',
            'volume','circulatingSupply'
        ]
        const coinArr = []
        $(elemSelector).each((parentIdx,parentElem) => {
            let keyIdx = 0
            const coinObj = {}

            if(parentIdx <= 100){
                $(parentElem).children().each((childIdx,childElem)=>{
                    const tdValue = $(childElem).text()
                
                    if(tdValue){
                        coinObj[keys[keyIdx]] = tdValue
                        keyIdx++
                    }
                    
                })
                coinArr.push(coinObj)
            }
        })
    
    return coinArr
    } catch(err){
        console.log(err)
    }
}








module.exports = {
    getPrice
}