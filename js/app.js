(function() {
  var app = angular.module("moviequotes", [ "ui.bootstrap", "modal-controllers", "firebase" ]);

  app.controller("MoviequotesCtrl", function($scope, $modal, $firebaseArray) {
    this.navbarCollapsed = true;
    //TODO: Bind data to Firebase
    this.items = [];

  this.showAddQuoteDialog = function(movieQuoteFromRow) {
    this.navbarCollapsed = true;
    var _this = this;
    var modalInstance = $modal.open({
      templateUrl : "/partials/addQuoteModal.html",
      controller : "AddQuoteModalCtrl",
      controllerAs : "insertModal"
    });
    modalInstance.result.then(function(movieQuoteFromModal) {
      //TODO: Add movieQuote to Firebase
      _this.isEditing = false;
    });
  };

    this.showUpdateQuoteDialog = function(movieQuoteFromRow) {
      this.navbarCollapsed = true;
      var _this = this;
      var modalInstance = $modal.open({
        templateUrl : "/partials/updateQuoteModal.html",
        controller : "UpdateQuoteModalCtrl",
        controllerAs : "insertModal",
        resolve : {
          movieQuote : function() {
            return {
              get :
                function() {
                  return movieQuoteFromRow;
              },
              save :
                function(movieQuoteFromModal) {
                  //TODO: save movieQuote to Firebase
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
      var _this = this;
      modalInstance.result.then(function(movieQuoteFromModal) {
        //TODO: Delete the moviequote from Firebase
        _this.isEditing = false;
      });
    };
  });
})();
