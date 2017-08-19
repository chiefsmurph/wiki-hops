import { h, app } from 'hyperapp';
import { Router } from './lib/hyperapp-router/router';

console.log(Router, 'router');
import './stylesheets/main.scss';

import state from './state';
import view from './views';
import actions from './actions/';
import events from './events';

import CacheRequests from './mixins/cache-requests';

app({
  state,
  view,
  actions,
  events,
  mixins: [
    Router,
    CacheRequests
  ]
});
