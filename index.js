const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
var ip = require("ip")
const port = process.env.PORT || 3000;
app.use(cors());


app.get("/", async (req, res) => {
  res.status(200).json("working... at ip:" + ip.address());
});

app.get("/fetch", async (req,res) => {
  try{
  if(req.query.url !== undefined){
    var config = {
      method: "get",
      url: `${req.query.url}`,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
      },
    };
  
    const html = await axios(config);
    res.send(html.data)}
  else{res.send("<h1>Fetch working...</h1>")}}
  catch(err){
  console.log(err)
  res.send("Fetch Failed...")
  
  }
  });

  app.get("/tags", async (req, res) => {
    try {
      if (!req.query.top) { var count = "33" }
      else { var count = req.query.top; }
      var config = {
        method: "get",
        url: `https://www.tiktok.com/api/discover/challenge/?discoverType=0&needItemList=false&keyWord&offset=&count=${count}&language=en`,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
        },
      };
  
      const html = await axios(config);
      res.send(html.data)
    }
    catch (err) {
      res.send(err)
    }
  });


app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
