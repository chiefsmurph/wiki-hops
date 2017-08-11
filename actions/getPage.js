import cheerio from 'cheerio';

// helper functions
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

const getContext = ($link) => {
  const parentText = $link.parent().text();
  const linkText = $link.text();
  let foundText = false;
  let context = '';
  for (var i = 0; i < parentText.length; i++) {
    if (parentText.substring(i, i + linkText.length) === linkText) {
      foundText = true;
    } else if (parentText[i] === '.' && foundText) {
      return context;
    }
    context += parentText[i];
  }
  return 'no context';
};

const getFirstLink = ($) => {
  let firstLink = null;
  const allLinks = $('p > a');

  let linkNum = 0;
  while (!firstLink) {
    // start by examining first link checking whether valid and move to next if not
    const $activeLink = allLinks.eq(linkNum);
    const url = $activeLink.attr('href');
    if (!isInParens($activeLink) && url[0] !== '#') {
      console.log('found valid first link at ', linkNum+1);
      firstLink = {
          url,
          text: $activeLink.text(),
          context: getContext($activeLink)
      };
    } else {
      console.log('no that was in parens');
      linkNum++;
    }

  }

  return firstLink;
};
// end helper functions


// returns the page that a url is pointing to without the hash and without the http://....wiki.../
export const urlToPage = url => url.split('/').pop().split('#')[0];

export const fetchWiki = page => {

  const url =`https://en.wikipedia.org/w/api.php?action=parse&page=${page}&prop=text&origin=*&format=json`;
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
      const firstLink = getFirstLink($);
      return {
          title: json.parse.title,
          firstLink
      };

    });

};
