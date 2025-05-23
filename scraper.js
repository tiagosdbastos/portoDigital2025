const fs = require("fs");
const pup = require("puppeteer");

const url = "https://www.sympla.com.br/eventos/tecnologia/todos-eventos?page=1";
let c = 1;
const list = [];

(async () => {
  const browser = await pup.launch({ headless: false }); // Com interface
  const page = await browser.newPage();
  console.log("Iniciado");

  await page.goto(url, { waitUntil: "networkidle2" });
  console.log("Página principal carregada");

  const links = await page.$$eval("a.sympla-card", (els) =>
    els.map((el) => el.href)
  );

  for (const link of links) {
    if (link.includes("/play/")) continue;

    console.log(`Entrando no evento ${c}: ${link}`);
    await page.goto(link, { waitUntil: "networkidle2" });

    const html = await page.content();
    const regexLat = /"latitude":\s*([-+]?[0-9]*\.?[0-9]+)/;
    const regexLng = /"longitude":\s*([-+]?[0-9]*\.?[0-9]+)/;
    const latMatch = html.match(regexLat);
    const lngMatch = html.match(regexLng);
    const latitude = latMatch ? latMatch[1] : null;
    const longitude = lngMatch ? lngMatch[1] : null;

    let title = null;
    let date = null;
    let location = null;
    let isPresencial = false;

    try {
      title = await page.$eval("h1.sc-57018dea-0.fVgDPM", (el) =>
        el.textContent.trim()
      );
    } catch {
      console.warn(`⚠️ Título não encontrado para ${link}`);
    }

    try {
      date = await page.$eval("div.sc-57018dea-1.iImKcA > p", (el) =>
        el.textContent.trim()
      );
    } catch {
      console.warn(`⚠️ Data não encontrada para ${link}`);
    }

    try {
      const tipoEEndereco = await page.$eval(
        "div.sc-57018dea-1.iImKcA > span",
        (el) => el.textContent.trim()
      );
      isPresencial = tipoEEndereco.toLowerCase().includes("presencial");
    } catch {
      console.warn(`⚠️ Tipo do evento não identificado para ${link}`);
    }

    if (isPresencial) {
      try {
        location = await page.$eval(
          "div.sc-57018dea-1.iImKcA > span > a",
          (el) => el.textContent.trim()
        );
      } catch {
        console.warn(`⚠️ Local não encontrado para ${link}`);
      }
    } else {
      location = "Sympla Streaming";
    }

    const obj = {
      title,
      date,
      location,
      latitude,
      longitude,
      link,
    };

    console.log(obj);
    list.push(obj);
    c++;
  }

  fs.writeFileSync("eventos.json", JSON.stringify(list, null, 2), "utf-8");
  console.log("Arquivo JSON salvo como eventos.json");

  await browser.close();
})();
