import cheerio from 'cheerio';

import getFirstLink from './helpers/get-first-link';
import urlToPage from './helpers/url-to-page';

const fetchWiki = (page) => {
  console.log('executing ', page);
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
      // console.log(firstLink, 'firstLink');
      if (!firstLink) {
        console.log('whatttt');
        throw Error('no links found');
      }
      // console.log('still going')
      return {
          title: json.parse.title,
          firstLink
      };

    });
};

export default fetchWiki;
