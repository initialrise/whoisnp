const cheerio = require("cheerio");
const axios = require("axios");

const session = axios.create();

const grabCSRF = async () => {
  const raw = await session.get("https://register.com.np/whois-lookup");
  const response = raw.data;
  const headers = { headers: { Cookie: raw.headers["set-cookie"] } };
  console.log(raw.headers["set-cookie"]);
  const $ = cheerio.load(response);
  const token = $('input[type="hidden"]').attr("value");
  return { headers, token };
};

const whoisController = async (req, res) => {
  const { headers, token } = await grabCSRF();
  const domain = req.query.domain;
  const extension = req.query.extension;
  if (!domain || !extension) {
    res.status(500).json({
      status: "failed",
      message: "Domain or extension not present",
    });
  }
  let resp;
  try {
    const body = new URLSearchParams({
      _token: token,
      domainName: domain,
      domainExtension: extension,
    });

    console.log("Why not working");
    const raw = await session.post(
      "https://register.com.np/checkdomain_whois",
      body,
      headers
    );
    resp = await raw.data;
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
};

module.exports = whoisController;
