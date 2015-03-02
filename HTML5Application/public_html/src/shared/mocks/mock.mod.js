(function () {
	var mocksModule = angular.module('MockModule', ['ngMockE2E']);

	mocksModule.constant('MockModule.baseUrl', 'webresources');

	mocksModule.run(['$httpBackend', 'MockModule.urls', 'MockModule.mockRecords', 'MockModule.baseUrl', function ($httpBackend, urls, mockRecords, baseUrl) {
			function mockUrls(entity_url) {
				mockRecords[entity_url] = [];
				var fullUrl = baseUrl + '/' + entity_url;
				var url_regexp = new RegExp(fullUrl + '/([0-9]+)');
				$httpBackend.whenGET(fullUrl).respond(function (method, url, data) {
					return [200, mockRecords[entity_url], {}];
				});
				$httpBackend.whenGET(url_regexp).respond(function (method, url, data) {
					var id = url.split('/').pop();
					var record;
					angular.forEach(mockRecords[entity_url], function (value, key) {
						if (value.id == id) {
							record = angular.copy(value);
						}
					});
					return [200, record, {}];
				});
				$httpBackend.whenPOST(fullUrl).respond(function (method, url, data) {
					var record = angular.fromJson(data);
					record.id = Math.floor(Math.random() * 10000);
					mockRecords[entity_url].push(record);
					return [200, record, {}];
				});
				$httpBackend.whenPUT(url_regexp).respond(function (method, url, data) {
					var record = angular.fromJson(data);
					angular.forEach(mockRecords[entity_url], function (value, key) {
						if (value.id === record.id) {
							mockRecords[entity_url].splice(key, 1, record);
						}
					});
					return [200, null, {}];
				});
				$httpBackend.whenDELETE(url_regexp).respond(function (method, url, data) {
					var id = url.split('/').pop();
					angular.forEach(mockRecords[entity_url], function (value, key) {
						if (value.id == id) {
							mockRecords[entity_url].splice(key, 1);
						}
					});
					return [200, null, {}];
				});
			};
			var ignore_regexp = new RegExp('^((?!' + baseUrl + ').)*$');
			$httpBackend.whenGET(ignore_regexp).passThrough();
			for (var i in urls) {
				mockUrls(urls[i])
			}
		}]);
})();