/* ### Modal Controllers ### */
(function() {
  var app = angular.module("modal-controllers", [ "ui.bootstrap"]);

  app.controller("AddQuoteModalCtrl", function ($modalInstance, $timeout) {
    this.moviequote = {quote:"", movie:""};
    var _this = this;
    this.insertQuote = function () {
       $modalInstance.close(_this.moviequote);
    };

    this.cancel = function () {
       $modalInstance.dismiss("cancel");
    };

    $modalInstance.opened.then(function() {
      $timeout(function() {
        // Note the opened promise is still too early.  Added a 100mS delay to give Chrome time to put the DOM in place.
        document.querySelector("#quote-input").focus();
      }, 100);
    });
  });

  app.controller("UpdateQuoteModalCtrl", function ($modalInstance, $timeout, movieQuote) {
    this.moviequote = movieQuote.get();
    var _this = this;
    this.saveQuote = function() {
      movieQuote.save(_this.moviequote);
    };

    this.done = function () {
       $modalInstance.dismiss("done");
    };

    $modalInstance.opened.then(function() {
      $timeout(function() {
        // Note the opened promise is still too early.  Added a 100mS delay to give Chrome time to put the DOM in place.
        document.querySelector("#quote-input").focus();
      }, 100);
    });
  });

	app.controller("DeleteQuoteModalCtrl", function ($modalInstance, movieQuoteInModal) {
	  this.deleteQuote = function () {
	    $modalInstance.close(movieQuoteInModal);
	  };

	  this.cancel = function () {
	     $modalInstance.dismiss("cancel");
	  };
	});

})();
