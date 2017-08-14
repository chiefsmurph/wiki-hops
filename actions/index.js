import homeActions from './home';
import queryActions from './query';

const actions = Object.assign({},
  {
    init: () => {
      alert('initting');
    },
    goToRoute: (state, actions, route) => {
      const path = location.pathname.indexOf('wiki-hops') === -1 ? '/' : '/wiki-hops/'
      actions.router.go(path + route);
    }
  },
  homeActions,
  queryActions
);

export default actions;
