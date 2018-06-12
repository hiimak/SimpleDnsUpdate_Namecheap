# SimpleDnsUpdate_Namecheap

Requirements: Nodejs mus be installed on your Host Pc

A simple way to update the A + DNS Record of several Namecheap domains.

Instruction: 

1. Fill in your data into the domains.json file: 

        {
            "1":
            {
                "domain": "example1.com",
                "hosts": ["@","www", "dev"], 
                "password" :"Your DDns Password"   
            },

            "2": 
            {
                "domain": "example2.de",
                "hosts": ["@","www", "dev"],
                "password" :"c246e96f1ghr418f96814ea800fc7be1"  
            },

            "3": 
            {
                "domain": "example3.me",
                "hosts": ["@","www", "dev"],
                "password" :"c246e96f1c14678f96814ea800fc7be1"  
            } 

        }



2. Change the Path in SimpleDnsUpdate_Namecheap/ipupdate.sh to your Path:


node /home/YOUR_PC_USERNAME/SimpleDnsUpdate_Namecheap/ipupdate.js > /home/YOUR_PC_USERNAME/SimpleDnsUpdate_Namecheap/cron.log



3. Create a Cronjob on your host PC

*/10 * * * * bash /home/(YOUR_HOST_PC)/SimpleDnsUpdate_Namecheap/ipupdate.sh
