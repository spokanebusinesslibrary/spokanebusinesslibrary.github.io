
$(function() {

	// slow down local links
 	$.localScroll();

 	// all non-#links are external, so implement event monitors
 	// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 	$('body').on('click', 'a', function(e) {
 		//e.preventDefault();
 		var gaCategory = 'button';
 		var gaLabel = 'unknown';
 		var href = $(this).attr('href');
 		if ( '#' != href ) {
		 	if ( $(this).data('lib-system') ) {
		 		gaCategory = $(this).data('lib-system');
		 	}
		 	if ( $(this).data('lib-title') ) {
		 		gaLabel = $(this).data('lib-title');
		 	}
			ga('send', 'event', gaCategory, 'click', gaLabel, {'page': href});
 		}
 	});

 	// proxy rss feeds to json, avoid same origin restrictions	
	var $rss = $('#rss-feed');
	$.ajax({ 
		  type: 'POST'
    , dataType: 'jsonp'
    , jsonp: 'callback'
	  , url: 'http://api.spokanelibrary.org/v2/feed'
	  , data: { params: { 
    									limit: 5
    								, chars: 240
    								, url: ['http://www.scld.org/category/business_and_careers/feed/'
    											, 'http://beta.spokanelibrary.org/blog/topic/business/feed/'
    												]
    									}
    				}
	  })
	  .done(function(obj) {  
  		//console.log(obj);
			var feeds = { data: obj }
	  	var tmpl = Handlebars.compile( $('#rss-feed-tmpl').html() );
			$rss.hide().html(tmpl(feeds));
	  })
	  .fail(function() {
	  })
	  .always(function() {
	  	// sort posts based on timestamp attribute
	  	var posts = $('div', $rss);
			var count = 0;
			posts.sort(function (a, b) {			    
		    a = parseInt($(a).data('timestamp'), 10);
		    b = parseInt($(b).data('timestamp'), 10);
		    count += 2;
		    if(a < b) {
		        return 1;
		    } else if(a > b) {
		        return -1;
		    } else {
		        return 0;
		    }
			});
			$rss.append(posts).fadeIn();
	  });

});