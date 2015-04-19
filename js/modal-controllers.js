/* ### Modal Controllers ### */
(function() {
  var app = angular.module("modal-controllers", [ "ui.bootstrap"]);

  app.controller("InsertQuoteModalCtrl", function ($modalInstance, $timeout, movieQuote) {
    this.isNewQuote = movieQuote.get() == undefined;
    this.moviequote = movieQuote.get() || {quote:"", movie:""};
    var insertQuoteModal = this;
    if (!this.isNewQuote) {
      this.saveQuote = function() {
       movieQuote.save(insertQuoteModal.moviequote);
      };
    } else {
      this.saveQuote = function() {};
    }
    this.insertQuote = function () {
      if (insertQuoteModal.isNewQuote) {
       $modalInstance.close(insertQuoteModal.moviequote);
      } else {
       $modalInstance.close();
      }
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


	app.controller("DeleteQuoteModalCtrl", function ($modalInstance, movieQuoteInModal) {
	  this.deleteQuote = function () {
	    $modalInstance.close(movieQuoteInModal);
	  };

	  this.cancel = function () {
	     $modalInstance.dismiss("cancel");
	  };
	});

})();
