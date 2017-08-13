import { h } from 'hyperapp';
import '../stylesheets/faBox.scss';

export default ({ faClasses }, children) => {
  // creates a permanently (desktop and mobile, etc) horizontal
  // box with a font awesome icon on the left
  return (
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item is-narrow">
          <i class={`fa fa-3x ${faClasses}`}/>
        </div>
        <div class="level-item">
          {children}
        </div>
      </div>
    </div>
  );
};
