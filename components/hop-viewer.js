import { h } from 'hyperapp';
import Context from './context';

const HopViewer = ({ hops, loopPage }) => {
  return (
    <div>
      {hops.map((hop, i) => (
        <div class="columns">
          <div class={'column is-one-third' + (loopPage === hop.title ? ' is-danger' : '')}>
            {i === 0 ? 'starting at...' : i + '. '}{hop.title}
            <a href={`https://en.wikipedia.org/wiki/${hop.title}`} target="_blank">
              <i class="fa fa-external-link" />
            </a>
          </div>
          <div class="column">
            {hop.firstLink.context ? (
              <Context firstLink={hop.firstLink}/>
            ) : (
              <b class="is-danger">no links found</b>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HopViewer;
