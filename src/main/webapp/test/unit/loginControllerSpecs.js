describe('loginController', function(){
	beforeEach(module('AnalyticsApp'));
	beforeEach(module('Home'));

  it('should create check string with 2 names', inject(function($controller) {
    var scope = {},
        ctrl = $controller('loginController', {$scope:scope});
		
    expect(scope.checkString.length).toBe(2);
  }));
  
  it('first name should be sangar', inject(function($controller) {
    var scope = {},
        ctrl = $controller('loginController', {$scope:scope});
		
    expect(scope.checkString[0].name).toBe('sangar');
  }));

});