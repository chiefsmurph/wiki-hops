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
  reachedPhilosophy(state, actions) {
    actions.saveToCache({
      page: state.activeQuery,
      data: {
        hops: state.hops
      }
    });
    return {
      activeHop: false,
      reachedPhilosophy: true
    };
  },
  foundInCache(state, actions, { page, data }) {
    return {
      activeQuery: page,
      reachedPhilosophy: true,
      ...data   // should include hops
    };
  },
  foundLoop: (state, actions, page) => ({
    activeHop: false,
    loopPage: page
  }),
  errorFetching(state, actions, errorPage) {
    return {
      activeHop: false,
      errorPage
    };
  },
  // actions
  beginHop(state, actions, page) {
    console.log('beginning hops for ', page);
    page = urlToPage(page);

    const inCache = state.wikiCache[page];
    if (state.settings.cacheRequests && inCache) {
      actions.foundInCache({
        page,
        data: inCache
      });
    } else {
      actions.newQuery(page);
      actions.requestPage(page);
    }
  },
  requestPage(state, actions, page) {
    if (!state.activeHop) return; // make sure query has not been canceled

    console.log('requesting ', page);
    fetchWiki(page, true)
      .then(data => {
        actions.apiResponse({ page, data });
      })
      .catch(e => {
        actions.addHop({
          title: page,
          firstLink: {}
        });
        actions.errorFetching(page);
      });

  },
  apiResponse: (state, actions, { page, data}) => {
    console.log('fetched ', data);
    actions.addHop(data);

    if (data.title === 'Philosophy') {
      console.log('reached philosophy');
      return actions.reachedPhilosophy();
    }

    const visitedPages = state.hops.map(hop => hop.title);
    const firstLinkPage = urlToPage(data.firstLink.url);
    // console.log('first link page: ', firstLinkPage);

    if (visitedPages.indexOf(data.title) === -1) {
      // if not a loop
      actions.requestPage(firstLinkPage);
    } else {
      console.log('loop at ', data.title);
      actions.foundLoop(data.title);
    }
  },
  backToHome(state, actions) {
    actions.goToRoute('home');
    return {
      activeHop: false,  // prevents query from continuing if in progress
      // reset home vars
      activeFetches: 0,     // number
      pendingEnter: false,  // boolean
      searchVal: null,      // string
      foundQueryPage: null  // {}
    };
  },
  // UI
  scrollToBottom(state, actions, el) {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 100);
  }
};
