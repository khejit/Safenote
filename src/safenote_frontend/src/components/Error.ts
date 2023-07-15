import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const $toast = useToast();
let instance;

function show(message = 'Something went wrong.') {
    instance = $toast.error(message, {
        dismissible: true,
        duration: 0
    });
}

export default {
    show
}