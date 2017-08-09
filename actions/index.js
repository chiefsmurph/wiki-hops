import { fetchWiki } from './getPage';

const actions = module.exports = {
  init: () => {
    alert('initting');
  },
  clearHops: (state, actions) => ({ hops: [] }),
  addHop: (state, actions, hop) => ({
    hops: state.hops.concat([hop])
  }),
  beginHop: (state, actions, page) => {
    console.log('beginning hops for ', page);
    actions.setActiveQuery(page);
    actions.clearHops();
    actions.requestPage(page);

  },
  requestPage: (state, actions, page) => {

    fetchWiki(page)
      .then(data => {

        console.log('fetched ', data);
        actions.addHop(data.title);
        if (data.title === 'Philosophy') {
          console.log('reached philosophy')
        } else {
          let firstLinkPage = data.firstLink.url.split('/').pop()
          firstLinkPage = firstLinkPage.split('#')[0];
          console.log('first link page: ', firstLinkPage);
          if (state.hops.indexOf(firstLinkPage) === -1) {
            setTimeout(() => actions.requestPage(firstLinkPage), 1000);
          } else {
            console.log('found a loop');
          }
        }

      });

  },
  setActiveQuery: (state, actions, page) => {
    console.log('setting active query', page);
    return { activeQuery: page };
  },

};
