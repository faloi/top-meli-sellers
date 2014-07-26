'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('topMeliSellersApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('https://api.mercadolibre.com/sites/MLA/categories')
      .respond([
        {id: "MLA5725", name: "Accesorios para Vehículos"},
        {id: "MLA1071", name: "Animales y Mascotas"},
        {id: "MLA1367", name: "Antigüedades"}
      ]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of categories to the scope', function () {
    $httpBackend.flush();
    expect(scope.categories.length).toBe(3);
  });

  it('should get the top 3 sellers of some listings', function() {
     var listing = function(sellerId, quantity) {
       return { seller: { id: sellerId }, sold_quantity: quantity };
     }

     expect(scope.getTopSellersIdsFor([
       listing(1, 10),
       listing(1, 50),
       listing(2, 80),
       listing(3, 25),
       listing(4, 15),
       listing(4, 15)
     ])).toEqual([
      { id: 2, quantity: 80 },
      { id: 1, quantity: 60 },
      { id: 4, quantity: 30 }
     ]);
  });
});
