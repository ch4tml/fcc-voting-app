$(document).ready(function(){
    $("#add-label").on("click", () => {
        console.log("Adding new label");
        $("<div><label for='option5'>Option:</label><input id='option5' type='text' name='option5' ng-model='chart.option5'/></div>").insertBefore("#form-controls");
    });
});