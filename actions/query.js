// actions related to the query page
import urlToPage from '../api/helpers/url-to-page.js';
import fetchWiki from '../api/fetch-wiki.js';

export default {
  // state changes
  newQuery: (state, actions, page) => ({
    // reset query vars
    activeQuery: page,    // string
    hops: [],             // array
    activeHop: true,      // boolean
    loopPage: null,       // string
    errorPage: null,      // string
    // reset home vars
    activeFetches: 0,     // number
    pendingEnter: false,  // boolean
    searchVal: null,      // string
    foundQueryPage: null  // {}
  }),
  addHop: (state, actions, hop) => ({
    hops: state.hops.concat([hop])
  }),
  reachedPhilosophy: (state, actions) => ({
    activeHop: false,
    reachedPhilosophy: true
  }),
  foundLoop: (state, actions, page) => ({
    activeHop: false,
    loopPage: page
  }),
  // actions
  beginHop: (state, actions, page) => {
    console.log('beginning hops for ', page);
    page = urlToPage(page);
    actions.newQuery(page);
    actions.requestPage(page);
  },
  requestPage: (state, actions, page) => {
    if (!state.activeHop) return; // make sure query has not been canceled
    fetchWiki(page)
      .then(data => {

        console.log('fetched ', data);
        actions.addHop(data);

        if (data.title === 'Philosophy') {
          console.log('reached philosophy');
          actions.reachedPhilosophy();
        } else {
          const visitedPages = state.hops.map(hop => hop.title);
          const firstLinkPage = urlToPage(data.firstLink.url);
          console.log('first link page: ', firstLinkPage);

          if (visitedPages.indexOf(data.title) === -1) {
            // if not a loop
            setTimeout(() => actions.requestPage(firstLinkPage), 500);
          } else {
            console.log('found a loop');
            actions.foundLoop(data.title);
          }
        }

      })
      .catch(e => {
        actions.addHop({
          title: page,
          firstLink: {}
        });
        actions.errorFetching(page);
      });

  },
  errorFetching: (state, actions, errorPage) => {
    return {
      activeHop: false,
      errorPage
    };
  },
  backToHome: (state, actions) => {
    actions.goToRoute('home');
    return {
      activeHop: false  // prevents query from continuing if in progress
    };
  },
  // UI
  scrollToBottom: (state, actions, el) => {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 1);
  }
};
