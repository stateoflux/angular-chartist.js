angular.module('angular-chartist')

.directive('chartist', [function() {
  return {
    restrict: 'EA',
    scope: {
      // mandatory
      data: '=chartistData',
      chartType: '@chartistChartType',
      // optional
      events: '=chartistEvents',
      chartOptions: '=chartistChartOptions',
      responsiveOptions: '=chartistResponsiveOptions'
    },
    controller: 'AngularChartistController',
    link: function(scope, element, attrs, Ctrl) {
      var elm = element[0];
      var chart = Ctrl.renderChart(elm);

      Ctrl.bindEvents(chart);

      scope.$watch(function() {
        return {
          data: scope.data,
          chartType: scope.chartType,
          chartOptions: scope.chartOptions
        };
      }, function(newConfig, oldConfig) {
        // Update controller with new configuration
        Ctrl.chartType = newConfig.chartType;
        Ctrl.data = newConfig.data;
        Ctrl.options = newConfig.chartOptions;

        // If chart type changed we need to recreate whole chart, otherwise we
        // can update
        if (newConfig.chartType !== oldConfig.chartType) {
            chart = Ctrl.renderChart(elm);
        } else {
            chart.update(Ctrl.data, Ctrl.options);
        }
      }, true);

      scope.$on('$destroy', function() {
          chart.detach();
      });
    }
  };
}]);
