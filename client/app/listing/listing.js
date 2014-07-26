'use strict';

angular.module('topMeliSellersApp')
  .factory('Listing', function($resource){
    return $resource('https://api.mercadolibre.com/sites/MLA/search');
  });
