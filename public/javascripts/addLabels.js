$(document).ready(function(){
    $("#add-label").on("click", () => {
        console.log("Adding new label");
        $("<div><label for='option'>Option:</label><input id='option' type='text' name='option'/></div>").insertBefore("#form-controls");
    });
});