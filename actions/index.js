import urlToPage from '../api/helpers/urlToPage';
import fetchWiki from '../api/fetchWiki';

const actions = module.exports = {
  init: () => {
    alert('initting');
  },
  newQuery: (state, actions, page) => ({
    // reset query vars
    hops: [],
    activeHop: true,
    activeQuery: page,
    // reset home vars
    searchVal: null,
    foundQueryPage: null,
  }),
  addHop: (state, actions, hop) => ({
    hops: state.hops.concat([hop])
  }),
  beginHop: (state, actions, page) => {
    console.log('beginning hops for ', page);
    actions.newQuery(page);
    actions.requestPage(page);
  },
  requestPage: (state, actions, page) => {

    fetchWiki(page)
      .then(data => {

        console.log('fetched ', data);
        actions.addHop(data);

        if (data.title === 'Philosophy') {
          console.log('reached philosophy');
          actions.reachedPhilosophy();
        } else {
          const visitedPages = state.hops.map(hop => hop.title.toLowerCase());
          const firstLinkPage = urlToPage(data.firstLink.url);
          console.log('first link page: ', firstLinkPage);

          if (visitedPages.indexOf(data.title.toLowerCase()) === -1) {
            // if not a loop
            setTimeout(() => actions.requestPage(firstLinkPage), 500);
          } else {
            console.log('found a loop');
            actions.foundLoop(data.title);
          }
        }

      });

  },
  reachedPhilosophy: (state, actions) => ({
    activeHop: false,
    reachedPhilosophy: true
  }),
  foundLoop: (state, actions, page) => ({
    activeHop: false,
    loopPage: page
  }),
  scrollToBottom: (state, actions, el) => {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 1);
  },
  receivedWikiSearch: (state, actions, data) => {
    actions.decrementActiveFetches();
    if (data.relatedInput && data.relatedInput === state.searchVal) {
      // dont do anything if the user has changed the input value since the fetch was initiated
      console.log('got', data);
      actions.setFoundQueryPage(data);
    }
  },
  clearFoundQuery: (state, actions) => ({ foundQueryPage: null }),
  setFoundQueryPage: (state, actions, page) => ({ foundQueryPage: page }),
  setSearchVal: (state, actions, input) => ({ searchVal: input }),
  incrementActiveFetches: (state, actions) => ({ activeFetches: state.activeFetches + 1 }),
  decrementActiveFetches: (state, actions) => ({ activeFetches: state.activeFetches - 1 })
};
