(function () {
	var app = angular.module('playerModule');

	app.controller('playerCtrl', ['$scope', 'CRUDUtils', 'player.context', function ($scope, CRUDUtils, context) {
			this.url = context;
			CRUDUtils.extendCtrl(this, $scope);
			this.fetchRecords();
		}]);
})();