(function () {
	var crud = angular.module('CrudModule', ['restangular']);

	crud.config(['RestangularProvider', function (rp) {
			rp.setBaseUrl('webresources');
		}]);
})();