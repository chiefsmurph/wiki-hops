import getContext from './getContext';
import isInParens from './isInParens';

const getFirstLink = ($, page) => {

  let firstLink = null;

  let allLinks = $('p > a').length ? $('p > a') : $('a');
  // $('a') = if a wiki page has no article body then go to first redirect link
  allLinks = allLinks.not((i, el) => {
    // remove all links that refer to the current page or 'nofollow'
    return !$(el).attr('href') ||
        $(el).attr('href').indexOf(page) !== -1 ||
        $(el).attr('rel') === 'nofollow';
  });

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
export default getFirstLink;
