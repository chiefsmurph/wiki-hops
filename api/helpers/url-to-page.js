// because the wikipedia API takes a page name as an argument not a wiki URL

const urlToPage = url => {
  return url.split('/').pop().split('#')[0].replace(/_/g, ' ');
}

export default urlToPage;
