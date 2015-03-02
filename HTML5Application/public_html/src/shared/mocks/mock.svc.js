(function () {
	var mock = angular.module('MockModule');
	
	mock.value('MockModule.mockRecords', {});

	mock.provider('MockModule.urls', function () {
		var context = [];
		this.registerUrl = function (value) {
			context.push(value);
		};
		this.$get = function () {
			return context;
		};
	});
})();