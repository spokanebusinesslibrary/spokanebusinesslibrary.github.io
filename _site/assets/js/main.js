$(function() {
	/*
	$('a.feed').gFeed( { target: '#feeds'
											,title: ''
											,tabs: false
											,max: 4 } ); 
 	*/
	
	$('#feed-scld').gFeed({  
		url: 'http://www.scld.org/category/business_and_careers/feed/', 
		max: 3,
		title: '<span class="text-info">SCLD Business Blog</span>'
	}); 

	$('#feed-spl').gFeed({  
		url: 'http://blog.spokanelibrary.org/topic/business/feed/', 
		max: 3,
		title: '<span class="text-success">SPL Business Blog</span>'
	});
	

});