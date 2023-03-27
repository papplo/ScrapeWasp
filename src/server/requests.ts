import https from 'https';
import { parse } from 'node-html-parser';

export const requestGet = async (baseHref: string, searchPath: string, query: string) => {
    const requestUrl = [baseHref, searchPath, query].join('');
    const response = await doRequstNoHandling(requestUrl);
    const root = parse(response);

    if (! root) throw new Error('No root element found');

    const elements = root.querySelectorAll('.sales-table tbody tr');
    const parseElementstructure = elements.map(element => {
        const parsedQuery = requestUrl;
        const foreignId = element.querySelector('.col-1 a')?.getAttribute('href')?.split('.').at(-1)?.slice(0, -1) || "";
        const parsedTitle = element.querySelector('.col-2')?.text.split(',').at(0) || "";
        const parsedPrice = element.querySelector('.col-4')?.text.replace(/[^0-9]/g, '') || "";
        const parsedImage = baseHref.concat(element.querySelector('img')?.getAttribute('src') || "");
        const parsedDescription = element.querySelector('.col-2')?.text || "";
        const parsedLink = baseHref.concat(element.querySelector('.col-2 a')?.getAttribute('href') || "");
        const parsedCategory = element.querySelector('.col-3')?.text || "";
        return { parsedQuery, foreignId, parsedTitle, parsedPrice, parsedImage, parsedDescription, parsedLink, parsedCategory};
    })
      .filter(el => Boolean(el?.parsedTitle))

    return parseElementstructure
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
