export default {
  loaded: (state, actions) => {
    actions.init()
  },
  route: (state, actions, data) => {
    console.log(data);
    const isRoute = route => data.match.indexOf(route) !== -1 && data.params.query;
    if (isRoute('query')) {
      console.log(data.params.query, 'total');
      actions.beginHop(data.params.query);
    }
  }
};
