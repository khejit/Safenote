import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const $toast = useToast();
let instance;

function show(message) {
    instance = $toast.default(message, {
        dismissible: true,
        duration: 0
    });
}

export default {
    show
}