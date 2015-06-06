(function () {
    'use strict';

    angular.module('ezplus')
        .directive('ezPlus', ezPlus);

    function ezPlus() {
        var service = {
            restrict: 'A',
            scope: {
                ezpModel: '=',
                ezpOptions: '='
            },
            link: link
        };
        return service;

        ////////////////////////////

        link.$inject = ['$scope', '$element', '$attributes'];
        function link($scope, $element, $attributes) {
            $scope.appendto = typeof($attributes.appendto) !== 'undefined' ? $attributes.appendto : null;

            $scope.$on("ezp-hidesAll", function (e, msg) {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.showHideWindow('hide');
                    plugin.showHideTint('hide');
                    plugin.showHideLens('hide');
                }
            });
            $scope.$on("ezp-showAll", function (e, msg) {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.showHideWindow('show');
                    plugin.showHideTint('show');
                    plugin.showHideLens('show');
                }
            });
            $scope.$on("ezp-disableZoom", function (e, msg) {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.changeState('disable');
                }
            });
            $scope.$on("ezp-enableZoom", function (e, msg) {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.changeState('enable');
                }
            });
            $scope.$watch('ezpModel', function (newValue, oldValue) {
                var image = newValue;
                var thumbMediumUrl = (image && image.thumb) || '';
                var fullSizeUrl = (image && image.large) || '';

                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    if (image) {
                        var loader = 'images/loader-small.gif';
                        plugin.showHideWindow();
                        plugin.swaptheimage(loader, loader);
                        plugin.swaptheimage(thumbMediumUrl, fullSizeUrl);
                    } else {
                        plugin.closeAll();
                    }
                } else {
                    if (image) {
                        $element.attr('src', thumbMediumUrl);
                        $element.attr('data-zoom-image', fullSizeUrl);
                        var options = {
                            /*scrollZoom: true,
                            zoomWindowWidth: 600,
                            zoomWindowHeight: 600,
                            easing: true,
                            zoomWindowFadeIn: 500,
                            zoomWindowFadeOut: 500,
                            lensFadeIn: 500,
                            lensFadeOut: 500*/
                        };
                        if ($scope.appendto) {
                            options.zoomContainerAppendTo = $scope.appendto;
                        }

                        //generic way that sets all (non-function) parameters of colorbox.
                        if ($scope.ezpOptions) {
                            //var cbOptionsFunc = $parse($attributes.options);
                            //var cbOptions = cbOptionsFunc($scope);
                            angular.extend(options, $scope.ezpOptions);
                        }
                        angular.element($element).ezPlus(options);
                    }
                }
            });

            $scope.$on('$destroy', function () {
                $element.remove();
            });
        }
    }

})
();
