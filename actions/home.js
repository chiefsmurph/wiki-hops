// actions related to the home page
import urlToPage from '../api/helpers/url-to-page.js';
import fetchWiki from '../api/fetch-wiki.js';

export default {
  // state changes
  setSearchVal: (state, actions, input) => ({ searchVal: input }),
  setFoundQueryPage: (state, actions, page) => ({ foundQueryPage: page }),
  clearFoundQuery: (state, actions) => ({ foundQueryPage: null }),
  setPendingEnter: (state, actions, val) => ({ pendingEnter: val }),
  incrementActiveFetches: (state, actions) => ({ activeFetches: state.activeFetches + 1 }),
  decrementActiveFetches: (state, actions) => ({ activeFetches: state.activeFetches - 1 }),
  // actions
  onInput(state, actions, e) {
    console.log('input', state, actions, e);

    const inputVal = e.target.value;
    console.log(inputVal, 'inputval');
    actions.setSearchVal(inputVal);
    actions.setPendingEnter(false);

    if (!inputVal.length) return actions.clearFoundQuery();

    const page = urlToPage(inputVal);
    actions.incrementActiveFetches();
    fetchWiki(page)
        .then(data => {
          data.relatedInput = inputVal;
          actions.receivedWikiSearch(data);
        })
        .catch(e => {
          console.log('error, e', e);
          actions.decrementActiveFetches();
          actions.clearFoundQuery();
        });
  },
  onEnter(state, actions) {
    if (state.foundQueryPage && state.searchVal === state.foundQueryPage.relatedInput) {
      actions.beginQuery();
      // check to make sure a related wikipedia has been found
      // and the user hasn't changed the input since that foundPage was found
    } else {
      actions.setPendingEnter(true);
    }
  },
  receivedWikiSearch(state, actions, data) {
    actions.decrementActiveFetches();
    if (data.relatedInput && data.relatedInput === state.searchVal) {
      // dont do anything if the user has changed the input value since the fetch was initiated
      console.log('got', data);
      actions.setFoundQueryPage(data);
      if (state.pendingEnter) {
        setTimeout(actions.beginQuery, 300);
      }
    }
  },
  beginQuery(state, actions) {
    console.log('begin hop attempt');
    const uriEncodedPage = encodeURIComponent(state.foundQueryPage.title)
    actions.goToRoute(`query/?${uriEncodedPage}`);
  }
};
