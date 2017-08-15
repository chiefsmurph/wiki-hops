import { h } from 'hyperapp';

import '../stylesheets/code-link.scss';

const CodeLink = () => {
  return (
    <div class='codeLink'>
        <a href="https://github.com/chiefsmurph/wiki-hops" target='_blank'>
          <i class="fa fa-3x fa-code" />
        </a>
    </div>
  )
};
export default CodeLink;
