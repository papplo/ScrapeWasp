import https from 'https';

export const requestGet = async (query: Record<string, string>) => {

    console.log(query)
    const requesturl = `https://happyride.se/annonser/list.php?search=${query.search}`;
    // 'https://happyride.se/annonser/list.php?search=&category=&county=&creator=&type=

    const response = await https.get(requesturl, (res) =>  {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        let data = [] as string[];

        res.on('data', chunk => {
            data.push(chunk);
        });

        res.on('end', () => {
            const results = JSON.parse(data.join(''));
            console.log(results);
        })
    });
    return response;

}

