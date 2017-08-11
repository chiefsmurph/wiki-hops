const MAX_CONTEXT_LENGTH = 425;

const getContext = ($link) => {
  const parentText = $link.parent().text().length > $link.text().length + 4 ? $link.parent().text() : $link.parent().parent().parent().text();
  const linkText = $link.text();
  let foundText = false;
  let context = '';
  for (var i = 0; i < Math.min(parentText.length, MAX_CONTEXT_LENGTH); i++) {
    if (parentText.substring(i, i + linkText.length) === linkText) {
      foundText = true;
    } else if (parentText[i] === '.' && foundText) {
      return context;
    }
    context += parentText[i];
  }
  return context || 'no context';
};
export default getContext;
