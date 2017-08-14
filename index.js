import { h, app, Router } from 'hyperapp';

import './stylesheets/main.scss';

import actions from './actions/';
import view from './views';

app({
  state: {
    // home page
    activeFetches: 0,     // number
    pendingEnter: false,  // boolean
    searchVal: null,      // string
    foundQueryPage: null,  // {}
    // query page
    activeQuery: null,    // string
    hops: [],             // array
    activeHop: false,     // boolean
    loopPage: null,       // string
    errorPage: null       // string
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
