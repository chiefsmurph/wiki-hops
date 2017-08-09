import cheerio from 'cheerio';

export const fetchWiki = page => {

  const url =`https://en.wikipedia.org/w/api.php?action=parse&page=${page}&prop=text&origin=*&format=json`;
  return fetch(url)
    .then(data => data.json())
    .then(json => {
      // console.log('json', json.parse.text['*']);
      const $ = cheerio.load(json.parse.text['*']);

      // check and follow redirects
      const $redirectLink = $('ul.redirectText li a');
      if ($redirectLink.length) {
        console.log('redirecting to ', $redirectLink.text());
        return fetchWiki($redirectLink.text());
      }

      // else return the first non-paren link

      let firstLink = null;
      const allLinks = $('p > a');

      const isInParens = ($link) => {

        const linkText = $link.text();
        const $parent = $link.parent('p');
        const textContent = $parent.text();
        console.log(textContent);
        console.log('checking whether ', linkText, ' is in parens');

        let openParens = 0;
        let closeParens = 0;
        for (let i = 0; i < textContent.indexOf(linkText); i++) {
          if (textContent.substring(i, i + 1) === '(') {
            openParens++;
          } else if (textContent.substring(i, i + 1) === ')') {
            closeParens++;
          }
        }

        console.log('found the first link text at ', textContent.indexOf(linkText));
        console.log(openParens, closeParens);
        return openParens !== closeParens;

      };

      let linkNum = 0;  // start by examining first link checking whether valid and move to next if not
      while (!firstLink) {

        console.log('trying linknum', linkNum);
        const $activeLink = allLinks.eq(linkNum);
        const url = $activeLink.attr('href');
        if (!isInParens($activeLink) && url[0] !== '#') {
          console.log('found valid first link at ', linkNum+1);
          firstLink = {
              url,
              text: $activeLink.text()
          };
        } else {
          console.log('no that was in parens');
          linkNum++;
        }

      }

      return {
        title: json.parse.title,
        firstLink
      };

    });

};
