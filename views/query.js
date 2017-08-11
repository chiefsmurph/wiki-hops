import { h } from 'hyperapp';
import Context from '../components/context';

const query = module.exports = (state, actions) => {

  return (
    <div>

      <section class="hero is-primary">
        <div class="hero-body">
          <h1 class="title">active query: {state.activeQuery}</h1>
        </div>
      </section>

      <section class="section">
        <h2 class="title is-2">Hops:</h2>

        <div class="">
          {state.hops.map((hop, i) => (
            <div class="columns">
              <div class="column is-one-third">
                {hop.title}
              </div>
              <div class="column">
                <Context firstLink={hop.firstLink}/>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )

};
