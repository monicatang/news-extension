
const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=d418a65c0c38453da8d0ee0eae5467e0';



$(document).ready(function(){

	fetch(url, {
	method: 'GET'
	})
	.then((resp) => resp.json())
	.then(function(data){
		for (var i = 0; i < data.articles.length; i++) {
			var newsfeed = document.getElementsByClassName("newsfeed");
			var curr = data.articles[i];
			var row = 0;
			var counter = 0;
			if(counter % 3 === 0 && counter > 0){
				row += 1;
				document.getElementById("rows").insertAdjacentHTML('beforeend', "<div class = 'row newsfeed'></div>");
				newsfeed = document.getElementsByClassName("newsfeed");
			}

			if(curr.urlToImage){
				newsfeed[row].insertAdjacentHTML('beforeend', 
				`<div class= "col-md-4">
						<a href = "${curr.url}">
						<div class = "card mb-4 box-shadow">
							<img class = "card-img-top" src="${curr.urlToImage}">
							<div class = "card-body">
								<p class = "card-text"> <h4>${curr.title}<h4></p>
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

