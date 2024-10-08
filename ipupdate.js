"use strict";
const https = require("https");
const readline = require('readline');
const domains= require('./domains.json');
const xml2js = require('xml2js');


const url = "https://api.ipify.org/?format=json";

let ipAddress = "";

getOwnIp();

var interval = domains.updateInterval * 60000;
setInterval(getOwnIp, interval);

// Keep the Node.js process running
setInterval(() => {}, 1000);
function getOwnIp(){
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      ipAddress  = body.ip;
      console.log(ipAddress);
      setIpAddresses();
    });
  });
}

function setIpAddresses(){

  let updateUrl = 'https://dynamicdns.park-your-domain.com/update?host=[host]&domain=[domain_name]&password=[ddns_password]&ip=[your_ip]'
  
  var result = "";
  for (var p in domains) {
        if( domains.hasOwnProperty(p) && !p.includes("updateInterval")) {
       
        let domainName = domains[p].domain;
        let ddnsPswd = domains[p].password;
        let hosts = domains[p].hosts;
  
        console.log("Updating: " + domainName + "\n");
        for (let i = 0; i < hosts.length; i++) {
          let updateUrl = 'https://dynamicdns.park-your-domain.com/update?host='+hosts[i]+'&domain='+domainName+'&password='+ddnsPswd+'&ip='+ipAddress;

          https.get(updateUrl, res => {
                res.setEncoding("utf8");
                let body = "";
                res.on("data", data => {
                body += data;
          });
        
          res.on("end", () => {
                let time = new Date();
                            let day = time.getDate();
                let month = time.getMonth()+1;
                let year = time.getFullYear();
                let hour = time.getHours();
                let min = time.getMinutes();
        
                let tstamp = day + "." + month + "." + year +" - "+ hour + ":" + min ;
        
                xml2js.parseString(body, (err, result) => {
                  if (err) {
                      throw err;
                  }
              
                  if(result["interface-response"].Done && result["interface-response"].ErrCount)
                    console.log("IP Update Successful, current ip: " + result["interface-response"].IP)
                });

                console.log('Timestamp: '+time+'\n');
          });
          });
        }
      }
  } 
}  

