(function () {
	var crud = angular.module('CrudModule');

	crud.factory('CRUDUtils', ['Restangular', function (RestAngular) {
			function CRUD($scope) {
				this.api = RestAngular.all(this.url);
				$scope.currentRecord = 0;
				$scope.records = [];
                                $scope.showMax=false;
				this.editMode = false;

				this.fetchRecords = function () {
					var self = this;
					this.api.getList().then(function (data) {
						$scope.records = data;
						$scope.currentRecord = {};
						self.editMode = false;
					});
				};
				this.createRecord = function () {
					this.editMode = true;
					$scope.currentRecord = {};
				};
				this.saveRecord = function () {
					var self = this;
					if ($scope.currentRecord.id) {
						$scope.currentRecord.put().then(function () {
							self.fetchRecords();
						});
					} else {
						this.api.post($scope.currentRecord).then(function () {
							self.fetchRecords();
						});
					}
				};
                                this.maxRecord= function()
                                {
                                    var max = 0;
                                    for(var i =0;i< $scope.records.length;i++)
                                    {
                                        var actual = $scope.records[i];
                                        if(actual.age>max)
                                        {
                                            max=actual.age;
                                        }
                                    }
                                    $scope.showMax=true;
                                    $scope.currentRecords=max;
                                };
				this.deleteRecord = function (record) {
					var self = this;
					record.remove().then(function () {
						self.fetchRecords();
					});
				};
				this.editRecord = function (record) {
					$scope.currentRecord = RestAngular.copy(record);
					this.editMode = true;
				};
                                
			}
			;
			return {
				extendCtrl: function (obj, scope) {
					CRUD.call(obj, scope);
				}
			};
		}]);
})();