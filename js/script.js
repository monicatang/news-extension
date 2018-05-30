
const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=d418a65c0c38453da8d0ee0eae5467e0'

var counter = 0;

$(document).ready(function(){

	fetch(url, {
	method: 'GET'
	})
	.then((resp) => resp.json())
	.then(function(data){
		for (var i = 0; i < data.articles.length; i++) {
			var newsfeed = document.getElementsByClassName("row");
			var curr = data.articles[i];
			if(counter>=9){
				break;
			}
			if(curr.urlToImage){
				newsfeed[0].insertAdjacentHTML('beforeend', 
				`<div class= "col-md-4">
						<a href = "${curr.url}">
						<div style="border-style: none" class = "card mb-4 box-shadow">
							<div class = "img_container">
								<img class = "card-img-top" src="${curr.urlToImage}">
								<div class="text-block"> 
							    	<h4>${curr.source.name}</h4>
							  	</div>
						  	</div>
							<div class = "card-body">
								<p class = "card-text"><h4>${curr.title}</h4></p>
							</div>
						</div>
					</div>
				`);
			} else {
				counter -= 1;
			}

			counter++;
			
		}
		
	})
	.catch(function(error){
		console.log(error);
	});

});

