import { h } from 'hyperapp';

import FaBox from './fa-box';

const StatusBox = ({ activeQuery, activeHop, hopCount, loopPage, errorPage }) => {

  return activeHop ? (
      <FaBox
        faClasses="fa-spinner fa-spin is-green">
          active query: "{activeQuery}"<br/>
          total hops = {hopCount}
      </FaBox>
    ) : loopPage ? (
      <FaBox
        faClasses="fa-times-circle is-red is-danger">
          Darn, we started at "{activeQuery}" but after {hopCount} hops we ran in to a loop at "{loopPage}"
      </FaBox>
    ) : errorPage ? (
      <FaBox
        faClasses="fa-times-circle is-red is-danger">
          <b>Error fetching the first link from "{errorPage}"</b>
      </FaBox>
    ) : (
      <FaBox
        faClasses="fa-check-circle-o fa-4x is-green">
          number of steps to reach "Philosophy" from "{activeQuery}": {hopCount}
      </FaBox>
    );
};

export default StatusBox;
