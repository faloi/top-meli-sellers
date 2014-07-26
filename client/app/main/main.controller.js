'use strict';

angular.module('topMeliSellersApp')
  .controller('MainCtrl', function ($scope, CategoryFactory, Listing, Seller) {
    CategoryFactory.query().$promise.then(function(categories) {
      $scope.categories = categories;
    });

    $scope.getTopSellersIdsFor = function(listings) {
      var listingsPorSeller = _.groupBy(listings, function(listing) { return listing.seller.id });

      return _(listingsPorSeller)
        .map(function (it) {
          return {
            id: it[0].seller.id,
            quantity: _.reduce(
              it,
              function(acum, elem) { return acum + elem.sold_quantity; },
              0
            )
          };
        })
        .sortBy("quantity")
        .reverse()
        .take(3)
        .value();
    };

    $scope.recalcularTopSellers = function() {
      $scope.calculandoTopSellers = true;

      Listing.get({ category: $scope.categoriaSeleccionada.id })
        .$promise
        .then(function (listings) {
          var topSellers = $scope.getTopSellersIdsFor(listings.results);

          Seller.query({ ids: _.map(topSellers, "id").join(",") })
            .$promise.then(function (sellers) {
              topSellers.forEach(
                function (it, index) {
                  angular.extend(it, sellers[index]);
                }
              );

              $scope.topSellers = topSellers;
              $scope.calculandoTopSellers = false;
            })
        });
    };
  });
