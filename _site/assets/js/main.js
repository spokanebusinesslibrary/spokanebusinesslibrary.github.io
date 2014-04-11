
$(function() {

	// slow down local links
 	$.localScroll();

 	// stub in event tracking
 	$('body').on('click', 'a', function(e) {
 		//e.preventDefault();
 		var href = $(this).attr('href');

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
    											, 'http://blog.spokanelibrary.org/topic/business/feed/'
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