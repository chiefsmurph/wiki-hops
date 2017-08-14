import { h } from 'hyperapp';

// import urlToPage from '../api/helpers/url-to-page';
// import fetchWiki from '../api/fetch-wiki';

import Context from '../components/context';

import '../stylesheets/home.scss';
const Home = (state, actions) => {

  return (
    <div id="homePage" key="homePage">
      <section class="hero is-primary">
        <div class="hero-body">
          <h1 class="title is-1">wiki-hops</h1>
        </div>
      </section>

      <section class="section">
        <h2 class="title">Type in a wikipedia URL or page name and I will tell you how many hops it takes to get from that article to Wikipedias "philosophy" article by clicking on the first link in the article body.</h2>
        <h3 class="subtitle">97% of articles make it back there.</h3>
      </section>

      <div class="columns is-vcentered is-marginless" id="queryControls">
        <section class="column is-three-quarters">
          <div class={'control is-large' + ((state.activeFetches > 0 || state.pendingEnter) ? ' is-loading' : '')}>
              <input
                class='input is-large'
                type="text"
                id="wikiURL"
                placeholder="Wikipedia URL or page name"
                oninput={actions.onInput}
                onkeypress={e => { if (e.keyCode === 13) actions.onEnter(); }}
                oncreate={element => { setTimeout(() => element.focus(), 1); }}  // autofocus hack
                />
          </div>
        </section>
        <a
          id="submitBtn"
          class="button column is-large is-primary"
          disabled={!!!state.foundQueryPage}
          onclick={actions.beginQuery}>
            Submit
        </a>
      </div>

      {state.foundQueryPage && (
        <section class="section">
        <div id="foundPage" class="content message is-info">
          <div class="message-header">
            <b>You typed: "{state.searchVal}"</b>
          </div>
          <div class="message-body">
              We found: <h2>{state.foundQueryPage.title}</h2>
              <Context firstLink={state.foundQueryPage.firstLink} />
          </div>
        </div>
        </section>
      )}

      {(!state.foundQueryPage && state.searchVal && state.activeFetches === 0) && (
        <section class="section">
        <div id="foundPage" class="content message is-danger">
          <div class="message-body">
              We were unable to find a related Wikipedia article for "{state.searchVal}".
          </div>
        </div>
        </section>
      )}

    </div>
  );

};

export default Home;
