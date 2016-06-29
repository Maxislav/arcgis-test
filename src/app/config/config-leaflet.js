/**
 * Created by Администратор on 6/21/16.
 *
 * Конфигурация leflet либы
 *
 */
(function () {


    angular.module('app')
        .config(config);
    config.$inject = ['lProvider'];

    function config(lProvider) {
        lProvider

        /**
         * Размер карты
         */
            .setMapSize({
                width: '1000px',
                height: '500px'
            })
            /**
             * Центр карты при старте
             */
            .setStartCenter({
                lat: 50.1,
                lng: 30.2
            });

    }

}());