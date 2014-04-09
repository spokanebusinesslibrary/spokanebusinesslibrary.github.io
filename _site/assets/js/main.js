$(function() {
	/*
	$('a.feed').gFeed( { target: '#feeds'
											,title: ''
											,tabs: false
											,max: 4 } ); 
 	*/

 	$.ajaxSetup({
         type: 'POST'
        ,dataType: 'json'
        ,dataType: 'jsonp'
        ,jsonp: 'callback'
        /*
        ,complete: function(obj) {
          console.log( $.parseJSON(obj.responseText) );
        }
        */
      });

	$.localScroll();

	/*
	$.ajax({ 
	    url: 'http://api.spokanelibrary.org/v2/feed'
    , data: { params: { 
    									url: 'http://www.scld.org/category/business_and_careers/feed/'
    									}
    				}
	  })
	  .done(function(obj) {  
	  	console.log(obj);
			
	  })
	  .fail(function() {
	  })
	  .always(function() {
	  });
	*/

	$('#feed-scld').gFeed({  
		url: 'http://www.scld.org/category/business_and_careers/feed/', 
		max: 5,
		title: '<span class="text-info">SCLD Business & Careers</span>'
	}); 

	$('#feed-spl').gFeed({  
		url: 'http://blog.spokanelibrary.org/topic/business/feed/', 
		max: 5,
		title: '<span class="text-success">SPL Business Beat</span>'
	});
	

});