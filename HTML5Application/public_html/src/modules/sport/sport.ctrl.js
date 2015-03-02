(function () {
	var app = angular.module('sportModule');

	app.controller('sportCtrl', ['$scope', 'CRUDUtils', 'sport.context', function ($scope, CRUDUtils, context) {
			this.url = context;
			CRUDUtils.extendCtrl(this, $scope);
			this.fetchRecords();
		}]);
})();