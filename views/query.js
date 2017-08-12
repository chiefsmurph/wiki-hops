import { h } from 'hyperapp';
import Context from '../components/context';

const query = module.exports = (state, actions) => {

  let hopCount = state.hops.length - 1;
  hopCount = hopCount > 0 ? hopCount : '--';

  return (
    <div id="queryPage">

      <section id="hopViewer">

        <div class="row">
          <section class="hero is-primary">
            <div class="hero-body">
              <h1 class="title is-1">wiki-hops</h1>
            </div>
          </section>
        </div>

        <div class={state.activeHop ? 'row box is-loading' : 'row box'}>
          {state.activeHop ? (
            <div>
              <i class="fa fa-spinner fa-spin fa-4x is-green"/>
              active query: {state.activeQuery}<br/>
              total hops = {hopCount}
            </div>
          ) : state.loopPage ? (
            <div class="is-danger">
              <i class="fa fa-times-circle fa-4x is-red"/>
              Darn, we ran in to a loop at {state.loopPage}
            </div>
          ) : (
            <div>
              <i class="fa fa-check-circle-o fa-4x is-green"/>
              number of steps to reach "Philosophy" from "{state.activeQuery}": {hopCount}
            </div>
          )}
        </div>

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
          <a onclick={() => actions.router.go('/home')}>
            <i class="fa fa-arrow-left" />
            click here to go back and scan another wiki URL or page
          </a>
        </div>
      </section>

    </div>
  )

};
