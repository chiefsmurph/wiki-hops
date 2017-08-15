import settings from '../../state/settings';

const getContext = ($link) => {
  const linkText = $link.text();
  const parentText = ($link.parent().text().length > linkText.length + 4)
      ? $link.parent().text()
      : $link.parent().parent().parent().text();

  let foundText = false;
  let context = '';
  for (var i = 0; i < Math.min(parentText.length, settings.maxContextLength); i++) {
    if (parentText.substring(i, i + linkText.length) === linkText) {
      foundText = true;
    } else if (parentText[i] === '.' && foundText) {
      // go past the first link and go up until the next .
      return context + '...';
    }
    context += parentText[i];
  }
  return context || 'no context';
};
export default getContext;
