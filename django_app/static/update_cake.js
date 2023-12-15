$(document).ready(function(){
    var cake_string = document.getElementById("cake_json").value;
    var cake_json = JSON.parse(cake_string);
});

function loadCake(cake){
    $("#cakenameid").val(cake.name);
    $("#cakedescrid").val(cake.description);
    $("#cakepriceid").val(cake.price);
    $("#cakeid").val(cake.id);
}

function SaveUpdates(){
    if (confirm("Do you wish to save the modifications?") == false) {
        return -1;
    }
    var csrf_token = $('meta[name="csrf-token"]').attr('content')
    var my_form = document.getElementById("updateform");
    var name = my_form.name.value;
    var description = my_form.description.value;
    var price = my_form.price.value;
    var item_id = my_form.cakeitemNum.value;
    
    $.ajax({
        url: '/updated_cake/',
        type: 'POST',
        data: {"csrfmiddlewaretoken": csrf_token, "id": item_id, "name": name, "description": description,
                "price": price},
        encode: true,
        success: function(result) {
            alert("Cake updated successfully!!");
            window.location.href = "/cakes/";
        },
        error: function (err_msg) {
            console.log(err_msg);
            var errors = err_msg.responseJSON;
            alert("Error: " + errors.responseText)
         }
    });
}

function cancelUpdate(){
    window.location.href = '/cakes';
}