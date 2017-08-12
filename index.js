import { h, app, Router } from 'hyperapp';
import actions from './actions/';
import view from './views';

// mixins
import './stylesheets/main.scss';

app({
  state: {
    // home page
    activeFetches: 0,
    // query page
    activeQuery: null, // string
    hops: [], // array
  },
  view,
  actions,
  events: {
    loaded: (state, actions) => {
      console.log('hi')
    },
    route: (state, actions, data) => {
      console.log(data);
      const foundPage = decodeURI(location.href.split('?').pop())
      const isRoute = route => data.match.indexOf(route) !== -1 && foundPage;
      if (isRoute('query')) {
        actions.beginHop(foundPage);
      }
    }
  },
  mixins: [
    Router
  ]
});

console.log('asd');
