const headers = $request.headers;
const key = Object.keys(headers).find(key => key.toLowerCase() === "accept-language") || "Accept-Language";
headers[key] = "en-us";
$done({ headers });
