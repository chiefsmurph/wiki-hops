import { h } from 'hyperapp';
import urlToPage from '../api/helpers/urlToPage';

const home = module.exports = (state, actions) => {

  const queryURL = () => {
    console.log('queryi click')
    const url = document.getElementById("wikiURL").value;
    const page = urlToPage(url);
    actions.router.go(`/query/${encodeURIComponent(page)}`);
  };

  return (
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <h2 class="title">Hi there, type in a wikipedia URL and I will tell you how many hops it takes to get from that article to Wikipedias "philosophy" article by clicking on the first link in the article body.</h2>
          <h3 class="subtitle">97% of articles make it back there.</h3>
        </div>
      </section>

      <div class="columns is-vcentered" id="queryControls">
        <input
          class="input is-large column is-three-quarters"
          type="text"
          id="wikiURL"
          placeholder="URL or page"
          onkeydown={e => { if (e.keyCode === 13) queryURL(); }}/>
        <a
          id="submitBtn"
          class="button column is-large is-primary"
          onclick={queryURL}>
            Submit
        </a>
      </div>

    </div>
  );

};
