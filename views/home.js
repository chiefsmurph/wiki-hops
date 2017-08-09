import { h } from 'hyperapp';

const home = module.exports = (state, actions) => {

  const queryURL = () => {
    console.log('queryi click')
    const url = document.getElementById("wikiURL").value;
    const page = url.split('/').pop();
    actions.beginHop(page);
    actions.router.go(`/query/${encodeURIComponent(page)}`);
  };

  return (
    <div>

      <h2>Hi there, type in a wikipedia URL and I will tell you how many hops it takes to get from that article to Wikipedias "philosophy" article by clicking on the first link in the article body.  97% of articles make it back there.</h2>
      <br />
      <input
        type="text"
        id="wikiURL"
        onkeydown={e => { if (e.keyCode === 13) queryURL(); }}/>
      <button onclick={queryURL}>Submit</button>

    </div>
  );

};
