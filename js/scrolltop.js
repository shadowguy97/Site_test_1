/**
 * scrollTop Module
 *
 * Just add `totop` as class or attribute to some element.
 *
 * This used to be plain jQuery, but we are cool now. Sadly, it
 * still requires jQuery for the animation.
 *
 * This even works as a Facebook page, thanks to
 * http://stackoverflow.com/a/8130267/1254484
 */
angular.module('scrollTop', [])
    .directive('totop', function(){
        return {
            restrict: "CA",
            compile: function(tElement){
                return {
                    pre: function(){
                        tElement.bind('click', function(event) {
                            event.preventDefault();

                            var TOP = 0;
                            var DURATION = 600;
                            if (FB && FB.Canvas) {
                                FB.Canvas.getPageInfo(function(pageInfo){
                                    $({y: pageInfo.scrollTop}).animate(
                                        {y: TOP},
                                        {duration: DURATION, step: function(offset){
                                            FB.Canvas.scrollTo(0, offset);
                                        }
                                        });
                                });
                            } else {
                                $("html, body").animate({scrollTop: TOP}, DURATION);
                            }
                            return;
                        });
                    }
                };
            }
        };
    })
;