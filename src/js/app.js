(function() {
  var app = angular.module("moviequotes", [ "ui.bootstrap", "modal-controllers" ]);

  app.controller("MoviequotesCtrl", ['$scope', '$modal', function($scope, $modal) {
    this.navbarCollapsed = true;
    var _this = this;
    this.items = [];

  this.showAddQuoteDialog = function(movieQuoteFromRow) {
    this.navbarCollapsed = true;
    var modalInstance = $modal.open({
      templateUrl : "/partials/addQuoteModal.html",
      controller : "AddQuoteModalCtrl",
      controllerAs : "insertModal"
    });
    modalInstance.result.then(function(movieQuoteFromModal) {
      _this.items.push(movieQuoteFromModal);
      _this.isEditing = false;
    });
  };

    this.showUpdateQuoteDialog = function(movieQuoteFromRow) {
      this.navbarCollapsed = true;
      var modalInstance = $modal.open({
        templateUrl : "/partials/updateQuoteModal.html",
        controller : "UpdateQuoteModalCtrl",
        controllerAs : "insertModal",
        resolve : {
          movieQuote : function() {
            return {
              get:
                function() {
                  return movieQuoteFromRow;
              }
            };
          }
        }
      });

      modalInstance.result.then(function() {
        _this.isEditing = false;
      });
    };

    this.showDeleteQuoteDialog = function(movieQuoteFromRow) {
      var modalInstance = $modal.open({
        templateUrl : "/partials/deleteQuoteModal.html",
        controller : "DeleteQuoteModalCtrl",
        controllerAs : "deleteModal",
        resolve : {
          movieQuoteInModal : function() {
            return movieQuoteFromRow;
          }
        }
      });
      modalInstance.result.then(function(movieQuoteFromModal) {
        for (var i = 0; i < _this.items.length; i++) {
          var mq = _this.items[i];
          if (mq.quote === movieQuoteFromModal.quote && mq.movie === movieQuoteFromModal.movie) {
            _this.items.splice(i, 1);
            break;
          }
        }
        _this.isEditing = false;
      });
    };
  }]);
})();
