import https from 'https';
import { parse } from 'node-html-parser';

export const requestGet = async (...args: string[]) => {
    const requestUrl = args.join('');
    const response = await doRequstNoHandling(requestUrl);
    const root = parse(response);
    if (! root) throw new Error('No root element found');

    const elements = root.querySelectorAll('.sales-table tr');
    const parseElementstructure = elements.map(element => {
        const parsedQuery = requestUrl;
        const parsedTitle = element.querySelector('.col-2')?.text || "";
        const parsedPrice = element.querySelector('.col-4')?.text || "";
        const parsedImage = element.querySelector('img')?.getAttribute('src') || "";
        const parsedDescription = element.querySelector('.col-2')?.text || "";
        const parsedLink = element.querySelector('.col-2 a')?.getAttribute('href') || "";
        const parsedCategory = element.querySelector('.col-3')?.text || "";
        return { parsedQuery, parsedTitle, parsedPrice, parsedImage, parsedDescription, parsedLink, parsedCategory};
    }).filter(el => Boolean(el?.parsedTitle));

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
