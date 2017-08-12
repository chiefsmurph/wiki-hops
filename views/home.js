import { h } from 'hyperapp';
import urlToPage from '../api/helpers/urlToPage';
import fetchWiki from '../api/fetchWiki';
import Context from '../components/context';

const home = module.exports = (state, actions) => {

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
          actions.receivedWikiSearch({
            response: data,
            relatedInput: inputVal
          });
        })
        .catch(e => {
          console.log('error, e');
          actions.clearFoundQuery();
        });
  };

  const onEnter = (e) => {
    if (state.foundQueryPage) {
      // enter key
      beginHop();
    }
  };

  const beginHop = () => {
    console.log('queryi click');
    actions.router.go(`/query/${encodeURIComponent(state.foundQueryPage.title)}`);
  };

  const inputClass = 'input is-large column is-three-quarters' + ((state.activeFetches > 0) ? ' is-loading' : '');
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
        <input
          class={inputClass}
          type="text"
          id="wikiURL"
          placeholder="URL or page"
          oninput={onInput}
          onkeypress={e => { if (e.keyCode === 13) onEnter(); }}/>
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
