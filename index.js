import { h, app, Router } from 'hyperapp';

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
