var characterArr=['Bart','Homer','Marge','Lisa', 'Maggie','Flander', 'Stupid Sexy Flanders']

 for (var i=0; i<characterArr.length; i++){
     var charButton= $(`<button data-character="${characterArr[i]}">`);
     charButton.text(characterArr[i]);
     $("#simpsonButtons").append(charButton);
}

$("button").on("click", function(){
    $("#characters").empty();
    console.log(this);
    var character= $(this).attr("data-character");
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=the+simpsons+"+ character + "&api_key=j8IBTQRo3ptr0Fg75zgB3CqRqYsZNDps&limit=10";

    $.ajax({
        url: queryURL,
        method:"GET"
    }).done(function(response){
        var results= response.data;
        console.log(results);
        for (var j=0; j<results.length;j++){
            var characterDiv= $(`<div class=col-md-5>`);
            var rate = $("<p>");
            var characterImage= $("<img>");
            rate.text(results[j].rating);
            characterImage.attr("src", results[j].images.fixed_height.url);
            characterDiv.append(rate);
            characterDiv.append(characterImage);
            $("#characters").append(characterDiv);
        }

    })
})
    