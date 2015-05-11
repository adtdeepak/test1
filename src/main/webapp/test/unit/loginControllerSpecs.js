describe('loginController', function(){
	beforeEach(module('AnalyticsApp'));
	beforeEach(module('Home'));

  it('should create "phones" model with 3 phones', inject(function($controller) {
    var scope = {},
        ctrl = $controller('loginController', {$scope:scope});
		
    expect(scope.phones.length).toBe(3);
  }));
  
  it('phone name should be sangar', inject(function($controller) {
    var scope = {},
        ctrl = $controller('loginController', {$scope:scope});
		
    expect(scope.phones[0].name).toBe('sangar');
  }));

});