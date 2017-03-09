/**
 * Created by rAj on 9/28/2016.
 */
describe('View1Ctrl', function() {
  var scope;

  beforeEach(angular.mock.module('app.controllers'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('View1Ctrl', {$scope: scope});
  }));

  it("Checks the task creation", function () {
    var size = scope.tasks.length;
    scope.createTask({ title: 'Hello' });
    expect(scope.tasks.length).toEqual(size+1);
  });
});
