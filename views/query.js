import { h } from 'hyperapp';
import HopViewer from '../components/hop-viewer';
import FaBox from '../components/fa-box';

const Query = (state, actions) => {

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
            <FaBox
              faClasses="fa-spinner fa-spin is-green">
                active query: "{state.activeQuery}"<br/>
                total hops = {hopCount}
            </FaBox>
          ) : state.loopPage ? (
            <FaBox
              faClasses="fa-times-circle is-red is-danger">
                Darn, we started at "{state.activeQuery}" but after {hopCount} hops we ran in to a loop at "{state.loopPage}"
            </FaBox>
          ) : (
            <FaBox
              faClasses="fa-check-circle-o fa-4x is-green">
                number of steps to reach "Philosophy" from "{state.activeQuery}": {hopCount}
            </FaBox>
          )}
        </div>

        <div class="row header">
          <h4 class="title is-4">Hops:</h4>
        </div>

        <div class="row content" onupdate={actions.scrollToBottom}>
          <HopViewer
            style={{height: '80%'}}
            hops={state.hops}
            loopPage={state.loopPage} />
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

export default Query;
