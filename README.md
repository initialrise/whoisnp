### WhoIS API for Nepali domains

#### Installation

- Clone the repo `git clone https://github.com/initialrise/whoisnp`
- Move inside the repo `cd whoisnp`
- Install required packages `npm i`
- Create .env file and add port of your choice `echo PORT=1337 > .env`
- Start the api `npm start`

#### Usage

- Make a GET request to `http://apiurl:port/whois?domain=&extension=`
- The query string `domain` should not contain extension
- The query string `extension` should contain extension of domain like ".edu.np", ".com.np"  
  Example:
  `http://localhost:1337/whois?domain=google&extension=.com.np`
