import homeActions from './home';
import queryActions from './query';

const actions = {
  init: () => {
    console.log('welcome to wiki-hops');
  },
  goToRoute: (state, actions, route) => {
    // for github-pages
    const isGitHubPages = location.pathname.indexOf('wiki-hops') !== -1;
    const path = !isGitHubPages ? '/' : '/wiki-hops/'
    console.log('isGitHubPages', isGitHubPages, path);
    actions.router.go(path + route);
  },
  ...homeActions,
  ...queryActions
};

export default actions;
