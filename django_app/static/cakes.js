$(document).ready(function(){
    var cakes_string = document.getElementById("cakes_json").value;
    var cakes_json = JSON.parse(cakes_string);
    console.log(cakes_json);

    loadCakes(cakes_json);
});

function loadCakes(cakes_json) {
    var htmls = "";
    $(cakes_json).each(function(i, cake){
        htmls += '<div class="panel">'
        + '<div class="panel-header">' + cake.name + '</div>'
        + '<div class="separator"></div>'
        + '<div class="panel-body">' + cake.description + '</div>'
        + '<div class="panel-footer">$' + cake.price + '</div>'
        + '<div class="separator"></div>'
        + '<div class="panel-extra">'
        + '<button class="reset-button" type="button" name="updateButton" onclick="updateItem(' + cake.id + ');">Update</button>'
        + '<button class="submit-button" type="button" name="deleteButton" onclick="deleteItem(' + cake.id + ');">Delete</button>'
        + '<form id="deleteItemForm" action="/cakes" method="delete">'
        + '</form>'
        + '</div>'
        + '</div>';
    });
    $("#display_cakes_div").html(htmls);
}

function deleteItem(my_form){
    if (confirm("Do you really wish to delete this cake?") == false) {
        return -1;
    }
    var item_id = my_form.elements.namedItem("cake_id").value
    var csrf_token = $('meta[name="csrf-token"]').attr('content')
    $.ajax({
        url: "/cakes/del/" + item_id + "",
        type: "POST",
        data: {"csrfmiddlewaretoken": csrf_token, "cb" : "Cowboy Test"},
        encode: true,
        success: function(result) {
            alert("Cake deleted successfully!!");
            window.location.href = "/cakes/";
        },
        error: function (err_msg) {
            console.log(err_msg);
            var errors = err_msg.responseJSON;
            alert("Error: " + errors.responseText)
         }
    });
}

function updateItem(my_form){
    var item_id = my_form.elements.namedItem("cake_id").value
    my_form.action = "/update_cake/" + item_id
    my_form.method = "POST"
    my_form.submit()
}

