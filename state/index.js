import settings from './settings';

export default {
  settings,
  // home page
  activeFetches: 0,       // number
  pendingEnter: false,    // boolean
  searchVal: null,        // string
  foundQueryPage: null,   // {}
  // query page
  activeQuery: null,      // string
  hops: [],               // array
  activeHop: false,       // boolean
  loopPage: null,         // string
  errorPage: null         // string
};
