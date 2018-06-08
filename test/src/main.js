import css from './assets/css/index.css';
import scss from './assets/css/base.scss'
const msg = "hello";
class sayhello {
    constructor(msg) {
        console.log(msg)
    }
}
new sayhello(msg)