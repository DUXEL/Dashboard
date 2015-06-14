/**
 * Created by diugalde on 6/13/15.
 */
var ready = function() {
(function () {
    $.misc = {
        uuid: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
})();
}

$(document).on('page:load', ready);
$(document).ready(ready);