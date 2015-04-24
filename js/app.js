(function() {
  var app = angular.module("moviequotes", [ "ui.bootstrap", "modal-controllers", "firebase" ]);

  app.controller("MoviequotesCtrl", function($scope, $modal, $firebaseArray) {
    this.navbarCollapsed = true;
    var _this = this;
    //Done: Bind data to Firebase
    var moviequotesRef = new Firebase("https://rockwotj-moviequotes.firebaseio.com/quotes");
    this.items = $firebaseArray(moviequotesRef);

    var compare = function(a, b) {
      return a.$id < b.$id;
    }
    this.items.$watch(function() { _this.items.sort(compare); });

  this.showAddQuoteDialog = function(movieQuoteFromRow) {
    this.navbarCollapsed = true;
    var modalInstance = $modal.open({
      templateUrl : "/partials/addQuoteModal.html",
      controller : "AddQuoteModalCtrl",
      controllerAs : "insertModal"
    });
    modalInstance.result.then(function(movieQuoteFromModal) {
      //Done: Add movieQuote to Firebase
      _this.items.$add(movieQuoteFromModal);
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
              get :
                function() {
                  return movieQuoteFromRow;
              },
              save :
                function(movieQuoteFromModal) {
                  //Done: save movieQuote to Firebase
                  _this.items.$save(movieQuoteFromModal);
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
        //Done: Delete the moviequote from Firebase
        _this.items.$remove(movieQuoteFromModal);
        _this.isEditing = false;
      });
    };
  });
})();
