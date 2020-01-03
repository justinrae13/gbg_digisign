$(document).ready(function(){
    getAllSites();
    $("#addsite_form").submit(function(event){
        event.preventDefault();
        var name = $("#new_name_input").val();
        var address = $("#new_address_input").val();

        if(name === "" || address === "" || name === null || address === null || name === undefined || address === undefined){
            alert("Tous les champs sont obligatoires !");
        }else{
            $.ajax({
                type: "POST",
                url: "crud.php",
                data: {"addNewSite" : true, name : name, address : address},
                success: function(res){
                    getAllSites();
                    $("#new_name_input").val("");
                    $("#new_address_input").val("");
                }
            });
        }
    })
});

function getAllSites(){
    $.ajax({
        type: "GET",
        url: "crud.php",
        data: {"getAllSites" : true},
        success: function(res){
            var sites = JSON.parse(res);
            $(".body_site_list").html("");
            for(var i = 0; i < sites.length; i++){
                $(".body_site_list").append(
                    "<div class='body_site_list_row'>"+
                        "<div>"+
                            "<p id='site_name_view_"+i+"'>"+sites[i].site_name+"</p>"+
                            "<input id='site_name_input_"+i+"' value='"+sites[i].site_name+"'>"+
                        "</div>"+
                        "<div>"+
                            "<p id='site_address_view_"+i+"'>"+sites[i].site_address+"</p>"+
                            "<input id='site_address_input_"+i+"' value='"+sites[i].site_address+"'>"+
                        "</div>"+
                        "<div>"+
                            "<button id='btn_edit_"+i+"' onclick='editSite("+i+")'><i class='fas fa-edit'></i></button>"+
                            "<button id='btn_delete_"+i+"' onclick='deleteSite("+sites[i].site_id+")'><i class='fas fa-trash-alt'></i></button>"+
                            "<button id='btn_cancel_"+i+"' onclick='cancelEditSite("+i+")'><i class='fas fa-times'></i></button>"+
                            "<button id='btn_save_"+i+"' onclick='saveEditSite("+i+","+sites[i].site_id+")'><i class='fas fa-check'></i></button>"+
                        "</div>"+
                    "</div>"
                );
            }
        } 
    })
}

function deleteSite(siteID){
    if (confirm("Êtes vous sûr de vouloir suprimmer ce site ?") == true) {
        $.ajax({
            type : "POST",
            url : "crud.php",
            data : {"deleteSite" : true, id : siteID},
            success: function(res){
                getAllSites();
            }
        })
    } else {
        console.log("Annulé")
    } 
}

function saveEditSite(rowIndex, siteID){
    var nameInp = $("#site_name_input_"+rowIndex).val();
    var addressInp = $("#site_address_input_"+rowIndex).val();

    if(nameInp === "" || addressInp === "" || nameInp === null || addressInp === null || nameInp === undefined || addressInp === undefined){
        alert("Tous les champs sont obligatoires !");
    }else{
        $.ajax({
            type : "POST",
            url : "crud.php",
            data : {"saveEdit" : true, id : siteID, nameInp : nameInp, addressInp : addressInp},
            success: function(res){
                getAllSites();
            }
        })
    }
}



function editSite(rowIndex){
    $("#site_name_view_"+rowIndex).fadeOut(250);
    $("#site_address_view_"+rowIndex).fadeOut(250);
    $("#btn_edit_"+rowIndex).fadeOut(250);
    $("#btn_delete_"+rowIndex).fadeOut(250);
    setTimeout(() => {
        $("#site_name_input_"+rowIndex).fadeIn(250); 
        $("#site_address_input_"+rowIndex).fadeIn(250); 
        $("#btn_save_"+rowIndex).fadeIn(250); 
        $("#btn_cancel_"+rowIndex).fadeIn(250);
    }, 250);
}

function cancelEditSite(rowIndex){
    setTimeout(() => {
        $("#site_name_view_"+rowIndex).fadeIn(250); 
        $("#site_address_view_"+rowIndex).fadeIn(250); 
        $("#btn_edit_"+rowIndex).fadeIn(250); 
        $("#btn_delete_"+rowIndex).fadeIn(250);
    }, 500);
    setTimeout(() => {
        $("#site_name_input_"+rowIndex).fadeOut(250);
        $("#site_address_input_"+rowIndex).fadeOut(250);
        $("#btn_save_"+rowIndex).fadeOut(250);
        $("#btn_cancel_"+rowIndex).fadeOut(250);
    }, 250);
}