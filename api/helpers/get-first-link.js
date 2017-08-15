import getContext from './get-context';
import isInParens from './is-in-parens';

const getFirstLink = ($, page) => {

  let firstLink = null;

  let allLinks = $('p > a').length ? $('p > a') : $('a');
  // $('a') = if a wiki page has no article body then go to first redirect link
  allLinks = allLinks.not((i, el) => {
    // remove all links that refer to the current page or 'nofollow'
    const href = $(el).attr('href');
    return !href || !href.length ||
        href.indexOf(page) !== -1 ||
        href.indexOf('index.php') !== -1 ||
        $(el).text().toLowerCase() === page ||
        $(el).closest('table').length !== 0 ||  // no links from the sidebar or any table
        href[0] === '#' ||
        $(el).attr('rel') === 'nofollow';
  });

  if (allLinks.length === 0) {
    return null;
  }

  let linkNum = 0;
  while (!firstLink) {
    // start by examining first link checking whether valid and move to next if not
    const $activeLink = allLinks.eq(linkNum);
    if (!isInParens($activeLink)) {
      console.log('first valid link: ', linkNum+1);
      firstLink = {
          url: decodeURI($activeLink.attr('href')),
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
export default getFirstLink;
