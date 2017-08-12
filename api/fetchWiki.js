import cheerio from 'cheerio';

import getFirstLink from './helpers/getFirstLink';
import urlToPage from './helpers/urlToPage';

const fetchWiki = page => {
  console.log('searching ', encodeURIComponent(page));
  const url =`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=text&origin=*&format=json`;
  return fetch(url)
    .then(data => data.json())
    .then(json => {
      const html = json.parse.text['*'];
      // console.log('html', html);
      const $ = cheerio.load(html);

      // check and follow redirects
      const $redirectLink = $('ul.redirectText li a');
      if ($redirectLink.length) {
        const redirectPage = urlToPage($redirectLink.text());
        console.log('redirecting to ', redirectPage);
        return fetchWiki(redirectPage);
      }

      // else return the first non-paren link
      const firstLink = getFirstLink($, page);
      return {
          title: json.parse.title,
          firstLink
      };

    });

};
export default fetchWiki;
