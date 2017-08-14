import { h } from 'hyperapp';
import HopViewer from '../components/hop-viewer';
import StatusBox from '../components/status-box';

import '../stylesheets/query.scss';

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

        <div class='row' id="statusBox">
          <StatusBox
              activeQuery={state.activeQuery}
              activeHop={state.activeHop}
              hopCount={hopCount}
              loopPage={state.loopPage}
              errorPage={state.errorPage} />
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
          <a onclick={actions.backToHome}>
            <i class="fa fa-arrow-left" />
            click here to go back and scan another wiki URL or page
          </a>
        </div>

      </section>

    </div>
  )

};

export default Query;
