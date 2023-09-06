const net = require("net");
const { decode } = require("iconv-lite");

var client = new net.Socket();
client.connect(23, "koukoku.shadan.open.ad.jp", async () => {
    console.log("Connected to koukoku.shadan.open.ad.jp");

    for await (const chunk of process.stdin) client.write(chunk);
});

client.on("data", data => {
    if (data.length > 8 && data[4] === 0x3e && data[5] === 0x3e) {
        const rawText = decode(data.subarray(7, -9), "sjis");
        const regexResult = rawText.match(/『 (.+) 』.+by (.+) 君/);
        console.log(regexResult[2] + " > " + regexResult[1]);
    }
});

client.on("close", () => {
    console.log("Disconnected");
});
