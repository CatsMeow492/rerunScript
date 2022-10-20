import fetch from "node-fetch";
import fs from "fs";
import axios from "axios";

const run = async () => {
  // Set url to Coinbase Currencies API
  let url = "https://api.exchange.coinbase.com/currencies";
  // Connection Options
  var options = {
    timeout: 30000,
    clientConfig: {
      maxReceivedFrameSize: 100000000,
      maxReceivedMessageSize: 100000000,
    },
    reconnect: {
      auto: true,
      delay: 5000,
      maxAttempts: 15,
      onTimeout: false,
    },
  };

  // Empty array of currencies
  var file = fs.createWriteStream('currencies.txt');
  let relevantCurrencyData = [];

  // Fetch objects from
  try {
    const { data: currencyData } = await axios.get(url);

    relevantCurrencyData = currencyData.map((item) => ({
      id: item.id,
      networks: item.supported_networks.map((network) => ({
        contractAddress: network.contract_address,
        id: network.id,
        name: network.name,
      })),
    }));
  } catch (error) {
    console.log("error", error);
  }

  console.log("result", relevantCurrencyData);
  fs.writeFileSync('./currencies.json', JSON.stringify(relevantCurrencyData, null, 2) , 'utf-8');

  // var json = [];
  // var resObj = JSON.parse(response);
  // for(var key in resObj) {
  //   if(resObj[key].name == 'some name') {
  //     json.push(resObj[key]);
  //   }
};




run();
