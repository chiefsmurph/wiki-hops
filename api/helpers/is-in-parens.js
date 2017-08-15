const isInParens = ($link) => {

  const linkText = $link.text();
  const $parent = $link.parent('p');
  const textContent = $parent.text();
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

  // console.log('found the first link text at ', textContent.indexOf(linkText));
  return openParens !== closeParens;

};
export default isInParens;
