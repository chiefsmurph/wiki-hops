import { h } from 'hyperapp';
import urlToPage from '../api/helpers/urlToPage';
import fetchWiki from '../api/fetchWiki';
import Context from '../components/context';

const Home = (state, actions) => {

  const onInput = (e) => {
    console.log('input');

    const inputVal = e.target.value;
    if (!inputVal.length) return actions.clearFoundQuery();

    actions.setSearchVal(inputVal);
    console.log(inputVal, 'inputval');

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
  };

  const onEnter = (e) => {
    if (state.foundQueryPage && state.searchVal === state.foundQueryPage.relatedInput) {
      // enter key
      beginHop();
    }
  };

  const beginHop = () => {
    console.log('queryi click');
    actions.router.go(`/query/?${encodeURIComponent(state.foundQueryPage.title)}`);
  };

  return (
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <h1 class="title is-1">wiki-hops</h1>
        </div>
      </section>

      <section class="section">
        <h2 class="title">Type in a wikipedia URL and I will tell you how many hops it takes to get from that article to Wikipedias "philosophy" article by clicking on the first link in the article body.</h2>
        <h3 class="subtitle">97% of articles make it back there.</h3>
      </section>

      <div class="columns is-vcentered is-marginless" id="queryControls">
        <section class="column is-three-quarters">
          <div class={'control is-large' + (state.activeFetches > 0 ? ' is-loading' : '')}>
              <input
                class='input is-large'
                type="text"
                id="wikiURL"
                placeholder="URL or page"
                oninput={onInput}
                autofocus
                onkeypress={e => { if (e.keyCode === 13) onEnter(); }}/>
          </div>
        </section>
        <a
          id="submitBtn"
          class="button column is-large is-primary"
          disabled={!!!state.foundQueryPage}
          onclick={beginHop}>
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

    </div>
  );

};
