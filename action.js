const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
    const url = `https://teleservices.paris.fr/evac/jsp/site/RunStandaloneApp.jsp?page=xmlpage&xmlpage=accueil-evac&style=html&trancheid=3`;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      //console.log($.html());
      const lines = {
        '33 sensation glisse': 19,
        '39 parcours nature':50,
        '43 robinson':69,
        '46 aqualand':84
      }
      for(let name in lines){
        const remaining = $(`#cadre > table > tbody > tr:nth-child(${lines[name]}) > td.center`).text().trim();
        console.log(`${name}\t[ ${remaining} ]`);
      }
      //console.log($("#cadre > table > tbody > tr:nth-child(50) > td.center").text().trim());
    } catch (e) {
      console.error(`Error while fetching URL - ${e.message}`);
    }
  })();