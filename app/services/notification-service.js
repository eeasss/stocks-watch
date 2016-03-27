angular.module('app')
    .factory('notification', [function() {
        
        var Notification = function() {
            var observable = window.jQuery;
        }
        
        Notification.prototype = {
            bind: function(event, callback) {
                jQuery(this).on(event, callback);
            },
            trigger: function(eventName, args) {
                jQuery(this).trigger(eventName, args);
            }
        }
        
        return new Notification();
        
    }]);

