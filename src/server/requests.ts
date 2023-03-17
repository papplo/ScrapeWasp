import { ClientRequest } from 'http';
import https from 'https';
import { parse } from 'node-html-parser';

export const requestGet = async (query: Record<string, string>) => {
    const requesturl = `https://happyride.se/annonser/list.php?search=${query.search}`;
    const response = await doRequstNoHandling(requesturl);
    const root = parse(response);

    console.log('root', root);

    if (! root) throw new Error('No root element found');

    const elements = root.querySelectorAll('.sales-table tr');
    const parseElementstructure = elements.map(element => {
        const image = element.querySelector('img')?.getAttribute('src');
        const title = element.querySelector('.col-2')?.text;
        const link = element.querySelector('.col-2 a')?.getAttribute('href');
        const category = element.querySelector('.col-3')?.text;
        const price = element.querySelector('.col-4')?.text;
        return { title, price, category, link, image };
    }).filter(el => Boolean(el?.title));


    return parseElementstructure;

}


async function doRequstNoHandling(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const req = https.get(url, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';

            res.on('data', (chunk) => {
              responseBody += chunk;
            });

            res.on('end', () => {
              resolve(responseBody);
            });
          });

          req.on('error', (err) => {
            reject(err);
          });
          req.end();
        });
      }
