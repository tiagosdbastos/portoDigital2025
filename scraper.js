const pup = require("puppeteer");
const db = require("./firebaseconfig");
const { collection, addDoc } = require("firebase/firestore");

const baseURL =
  "https://www.sympla.com.br/eventos/tecnologia/todos-eventos?page=";

(async () => {
  const browser = await pup.launch({ headless: false });
  const page = await browser.newPage();
  console.log("Iniciado");

  let eventCount = 1;

  // Navega pelas 5 páginas
  for (let currentPage = 1; currentPage <= 5; currentPage++) {
    const url = `${baseURL}${currentPage}`;
    console.log(`Carregando página ${currentPage}: ${url}`);

    await page.goto(url, { waitUntil: "networkidle2" });

    // Pega os links dos eventos da página
    const links = await page.$$eval("a.sympla-card", (els) =>
      els.map((el) => el.href)
    );

    for (const link of links) {
      if (link.includes("/play/")) continue; // Ignora eventos do tipo play/streaming direto

      console.log(`Entrando no evento ${eventCount}: ${link}`);
      await page.goto(link, { waitUntil: "networkidle2" });

      const html = await page.content();

      // Regex para pegar latitude e longitude
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

      // Extraindo o título
      try {
        title = await page.$eval("h1.sc-57018dea-0.fVgDPM", (el) =>
          el.textContent.trim()
        );
      } catch {
        console.warn(`⚠️ Título não encontrado para ${link}`);
      }

      // Extraindo a data
      try {
        date = await page.$eval("div.sc-57018dea-1.iImKcA > p", (el) =>
          el.textContent.trim()
        );
      } catch {
        console.warn(`⚠️ Data não encontrada para ${link}`);
      }

      // Extraindo tipo e endereço
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

      const eventObj = {
        title,
        date,
        location,
        latitude,
        longitude,
        link,
      };

      console.log(eventObj);

      // Salva no Firestore
      try {
        await addDoc(collection(db, "eventos"), eventObj);
        console.log(`✅ Evento ${eventCount} salvo no Firestore`);
      } catch (error) {
        console.error(`❌ Erro ao salvar evento ${eventCount}:`, error);
      }

      eventCount++;
    }
  }

  console.log("Todos os eventos processados!");
  await browser.close();
})();
