import urlToPage from '../api/helpers/urlToPage';
import fetchWiki from '../api/fetchWiki';

const actions = module.exports = {
  init: () => {
    alert('initting');
  },
  newQuery: (state, actions, page) => ({
    hops: [],
    lastContext: null,
    activeHop: true,
    activeQuery: page
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
          const firstLinkPage = urlToPage(data.firstLink.url);
          console.log('first link page: ', firstLinkPage);
          if (state.hops.map(hop => hop.title.toLowerCase()).indexOf(firstLinkPage.toLowerCase()) === -1) {
            // if not a loop
            setTimeout(() => actions.requestPage(firstLinkPage), 500);
          } else {
            console.log('found a loop');
            actions.foundLoop(data.title);
          }
        }

      });

  },
  setLastContext: (state, actions, context) => ({ lastContext: context }),
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
  }
};
