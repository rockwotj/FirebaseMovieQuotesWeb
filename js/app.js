(function() {
  var app = angular.module("moviequotes", [ "ui.bootstrap", "modal-controllers", "firebase" ]);

  app.controller("MoviequotesCtrl", function($scope, $modal, $firebaseArray) {
    this.navbarCollapsed = true;
    var ref = new Firebase("https://rockwotj-moviequotes.firebaseio.com/quotes");
    this.items = $firebaseArray(ref);
    
    var compare = function(a, b) {
      return a.$id < b.$id
    }
    this.items.sort(compare);
    var _this = this;
    this.items.$watch(function(){ _this.items.sort(compare); });

    this.showInsertQuoteDialog = function(movieQuoteFromRow) {
      this.navbarCollapsed = true;
      var _this = this;
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
                 _this.items.$save(movieQuoteFromModal);
             }
           };
          }
        }
      });
      modalInstance.result.then(function(movieQuoteFromModal) {
       console.log(movieQuoteFromModal);
        if (movieQuoteFromModal) {
          _this.items.$add(movieQuoteFromModal);
        }
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
        _this.items.$remove(movieQuoteFromModal);
        _this.isEditing = false;
      });
    };
  });

  app.run(function() {
  });

})();
