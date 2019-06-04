import { component } from "./util";

export default {
    alert: component('alert', `
        <div class="alert">
            A message
        </div>
    `),

    alertSuccess: component('alert--success', `
        <div class="alert alert--success">
            A message
        </div>
    `)
}
