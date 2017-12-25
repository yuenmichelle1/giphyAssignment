var characterArr=['Bart','Homer','Marge','Lisa', 'Maggie','Flanders', 'Stupid Sexy Flanders']

renderButtons();
function renderButtons() {
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
            var characterImage= $(`<img data-state="still">`);
            rate.text(` Rating:  ${results[j].rating}`);
            characterImage.attr("src", results[j].images.fixed_height_still.url);
            characterImage.attr("data-still",results[j].images.fixed_height_still.url);
            characterImage.attr("data-animate",results[j].images.fixed_height.url )
            characterDiv.append(rate);
            characterDiv.append(characterImage);
            $("#characters").append(characterDiv);

        }
        $("img").on("click", function(){
            console.log(this);
            var state = $(this).attr("data-state");
            if (state=== "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })  

    })
})
    
}
$("#addCharacter").on("click", function(event){
    $("#simpsonButtons").empty()
    event.preventDefault();
    var newCharacter = $("#character-input").val().trim();
    characterArr.push(newCharacter);
    console.log(characterArr);
    renderButtons();

})