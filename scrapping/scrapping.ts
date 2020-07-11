import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';


const getAllTagsDanbooru = async () => {
  let page = 1;
  while (await getTagsDanbooruByPage) {

    page++;
  }
}
//for now site: https://yande.re/tag?page=1 but we want ot do all pages eventally
const getTagsDanbooruByPage = async (page: number) => {
  const site = `https://danbooru.donmai.us/tags?page=${page}&search[order]=count`;
  try {
    const { data } = await axios.get(site);

    const $ = cheerio.load(data);
    const table = $("#tags-table");
    table.find('tr').each((i, ele) => {
      const td = $(ele).find('td.name-column');
      console.log(td.children('a').eq(1).text());

    })
    return true;
  } catch (e) {
    return false;
  }
}

const writeTest = () => {
  const logger = fs.createWriteStream('./test.ts');

  logger.write("export const josnArr = [");
  logger.write("\"hello\", \"two\"]");
  logger.end();
}

getTagsDanbooruByPage(1).then((done: boolean) => {
  if (!done) console.log("404");
  else console.log("good");


});

//writeTest();
