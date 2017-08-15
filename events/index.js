export default {
  loaded: (state, actions) => {
    actions.init()
  },
  route: (state, actions, data) => {
    console.log(data);
    const foundPage = decodeURI(location.href.split('?').pop())
    const isRoute = route => data.match.indexOf(route) !== -1 && foundPage;
    if (isRoute('query')) {
      actions.beginHop(foundPage);
    }
  }
};
