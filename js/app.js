(function() {
  var app = angular.module("moviequotes", [ "ui.bootstrap", "modal-controllers", "firebase" ]);

  app.controller("MoviequotesCtrl", function($scope, $modal, $firebaseArray) {
    this.navbarCollapsed = true;
    var ref = new Firebase("https://rockwotj-moviequotes.firebaseio.com/quotes");
    this.items = $firebaseArray(ref);

    this.showInsertQuoteDialog = function(movieQuoteFromRow) {
      this.navbarCollapsed = true;
      var movieQuotesCtrl = this;
      var modalInstance = $modal.open({
        templateUrl : "/partials/insertQuoteModal.html",
        controller : "InsertQuoteModalCtrl",
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
                 movieQuotesCtrl.items.$save(movieQuoteFromModal);
             }
           };
          }
        }
      });
      modalInstance.result.then(function(movieQuoteFromModal) {
       console.log(movieQuoteFromModal);
        if (movieQuoteFromModal) {
          movieQuotesCtrl.items.$add(movieQuoteFromModal);
        }
        movieQuotesCtrl.isEditing = false;
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
      var movieQuotesCtrl = this;
      modalInstance.result.then(function(movieQuoteFromModal) {
        movieQuotesCtrl.items.$remove(movieQuoteFromModal);
        movieQuotesCtrl.isEditing = false;
      });
    };
  });

  app.run(function() {
  });

})();
