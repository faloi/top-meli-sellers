'use strict';

angular.module('topMeliSellersApp')
  .factory('Seller', function($resource){
    return $resource('https://api.mercadolibre.com/users');
  });
