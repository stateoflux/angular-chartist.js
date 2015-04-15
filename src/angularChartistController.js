angular.module('angular-chartist')

.controller('AngularChartistController', ['$scope', function($scope) {
  this.data = $scope.data;
  this.chartType = $scope.chartType;

  this.events = $scope.events || {};
  this.options = $scope.chartOptions || null;
  this.responsiveOptions = $scope.responsiveOptions || null;

  this.bindEvents = function(chart) {
    Object.keys(this.events).forEach(function(eventName) {
        chart.on(eventName, this.events[eventName]);
    }, this);
  };

  this.renderChart = function(element) {
    return Chartist[this.chartType](element, this.data, this.options,
      this.responsiveOptions);
  };
}]);
