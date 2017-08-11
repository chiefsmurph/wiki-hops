import { h, app, Router } from 'hyperapp';
import actions from './actions/';
import view from './views';

// mixins
import './stylesheets/main.scss';

app({
  state: {
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
      const isRoute = route => data.match.indexOf(route) !== -1 && data.params && data.params.query;
      if (isRoute('query')) {
        actions.setActiveQuery(data.params.query);
      }
    }
  },
  mixins: [
    Router
  ]
});

console.log('asd');
