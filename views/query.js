import { h } from 'hyperapp';
import Context from '../components/context';

const query = module.exports = (state, actions) => {
  let hopCount = state.hops.length - 1;
  hopCount = hopCount > 0 ? hopCount : '--';
  return (
    <div style={{ height: '80%'}}>

      <section class="hero is-primary">
        <div class="hero-body">
          <h1 class="title">active query: {state.activeQuery}</h1>
        </div>
      </section>

      <div class={state.activeHop ? 'box is-loading' : 'box'}>
        {state.activeHop ? (
          <div>
            currently hopping...<br/>
            total hops = {hopCount}
          </div>
        ) : state.loopPage ? (
          <div class="is-danger">
            Darn, we ran in to a loop at {state.loopPage}
          </div>
        ) : (
          <div>
            number of steps to reach "Philosophy" from "{state.activeQuery}": {hopCount}
          </div>
        )}
      </div>

      <section id="hopViewer">
        <div class="row header">
          <h4 class="title is-4">Hops:</h4>
        </div>

        <div class="row content" onupdate={actions.scrollToBottom}>
          <div style={{ height: '80%' }}>
            {state.hops.map((hop, i) => (
              <div class="columns">
                <div class={'column is-one-third' + (state.loopPage === hop.title ? ' is-danger' : '')}>
                  {i === 0 ? 'starting at...' : i + '. '}{hop.title}
                </div>
                <div class="column">
                  <Context firstLink={hop.firstLink}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="row footer">
          <a onclick={() => actions.router.go('/home')}>click here to go back and scan another wiki URL or page</a>
        </div>
      </section>

    </div>
  )

};
