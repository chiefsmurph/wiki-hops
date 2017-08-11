// because the wikipedia API takes a page name as an argument not a wiki URL

const urlToPage = url => url.split('/').pop().split('#')[0];
export default urlToPage;
