import { h, Component } from 'preact';

import { Button } from '../src';

class App extends Component {
    render () {
        return (
            <div id="app">
                <Button size="sm">点我</Button>
                <Button>点我</Button>
                <Button size="lg">点我</Button>
                <Button color="accent" size="sm">点我</Button>
                <Button color="accent">点我</Button>
                <Button color="accent" size="lg">点我</Button>
            </div>
        )
    }
}

export default App;