/* globals google:true, window:true, document:true */

require("./style.css");

import { FormController } from './controller';

window.onload = () => {
    const ctrl = new FormController();
    ctrl.initialize();
}
