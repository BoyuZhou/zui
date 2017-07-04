import {h, Component} from 'preact';
import classnames from 'classnames';

import './index.less';

class Button extends Component {
    render({color, children, disabled, size, ...props}) {
        let classes = {
            [`zui-btn-${color}`]: color,
            [`zui-btn-size`]: size
        }
        return (
            <button
                class={ classnames('zui-btn',classes) }
                disabled={ disabled ? 'disabled' : ''}
                {...props}
            >
                {children}
            </button>
        )
    }
}

export default Button;