const cheerio = require("cheerio");

async function whoislookup(domain, token) {
  const postbody = new URLSearchParams({
    _token: token,
    domainName: domain,
    domainExtension: ".edu.np",
  });

  try {
    const response = await fetch("https://register.com.np/checkdomain_whois", {
      method: "POST",
      credentials: "include",
      body: postbody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const html = await response.text();
    console.log(html);

    // Uncomment and add cheerio logic here if needed
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  try {
    const response = await fetch("https://register.com.np/whois-lookup");
    const init = await response.text();
    const match = init.match(/name="_token" value="([^"]+)"/);
    const csrf_token = match[1];

    await whoislookup("nccs", csrf_token);
  } catch (error) {
    console.error("Error:", error);
  }
}

init();
