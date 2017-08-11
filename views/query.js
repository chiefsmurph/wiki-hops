import { h } from 'hyperapp';

const query = module.exports = (state, actions) => {

  return (
    <div>

      <h2>active query: {state.activeQuery}</h2>

      <h3>Hops:</h3>
      {JSON.stringify(state)}
      <ul>
        {state.hops.map((hop, i) => (
          <li key={i}>
            {JSON.stringify(hop)}
          </li>
        ))}
      </ul>

    </div>
  )

};
