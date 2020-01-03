$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "crud.php",
        data: {"getAllAnnouncement" : true},
        success: function(res){
            list = JSON.parse(res);
            for(var i = 0; i < list.length; i++){
                $("#aff_liste").append(
                    // "<a href='edit.html?name="+list[i].an_name+"'><h2>"+(i+1)+". "+list[i].an_name+"</h2></a>"
                    "<div class='aff_card'>"+
                        "<div class='aff_card_img'>"+
                            "<h1>"+list[i].an_name+"</h1>"+
                            "<img src='"+list[i].an_image+"'/>"+
                        "</div>"+
                        "<a href='canvas.html?nom="+list[i].an_name+"&action=edit'><i class='fas fa-edit'></i>&nbsp;&nbsp;Modifier</a>"+
                        "<a onclick='assignAnnouncement("+list[i].an_id+")'><i class='fas fa-building'></i>&nbsp;&nbsp;Assigner aux sites</a>"+
                        "<a><i class='fas fa-trash-alt'></i>&nbsp;&nbsp;Suprimmer</a>"+
                    "</div>"
                );
            }
        } 
    })
})

function createNew(){
    $("body").append(
        "<div class='backdrop' id='backdrop1'></div>"+
            "<div class='modal1Wrapper' id='modal1Wrapper' onclick='closeBackdrop()'>"+
                "<div class='modal1'>"+
                    "<div class='header'><h1>Saisissez un nom</h1><p>Le nom doit être unique et mettez un trait d'union (-) ou de soulignement (_) à la place d'espace</p></div>"+
                    "<div class='body'><span id='error_inpt'></span><input oninput='getHref(event)' placeholder='Écrivez ici..' id='annInp'/></div>"+
                    "<div class='footer'>"+
                        "<a id='goToCanvas' onclick='checkIfnameValid(event)'>OK</a>"+
                        "<a onclick='closeBackdropDef()'>Annuler</a>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"
    );
}

function getHref(e){

    if (e.target.value.includes(" ")) {
        $("#error_inpt").text("Utilisez un trait d'union (-) ou de soulignement (_)")
    }else{
        $("#error_inpt").text("")
    }

    $("#goToCanvas").attr("href","canvas.html?nom="+e.target.value+"&action=create")
}

function checkIfnameValid(e){
    if(/^\s+$/.test($("#annInp").val()) || $("#annInp").val().includes(" ")){
        e.preventDefault()
    }
}



function closeBackdrop(){
    if(!$(event.target).closest('.modal1').length && !$(event.target).is('.modal1')) {
        $("#backdrop1, #modal1Wrapper").remove();
    }
}

function closeBackdropDef(){
    $("#backdrop1, #modal1Wrapper").remove();
}

function assignAnnouncement(annID){
    $("#popUpBackdrop").fadeIn(250);
    $("#popUpBackdrop").load("popups/assign_popup.html");
    setTimeout(() => {
        $("#announcement_id").val(annID);
    }, 100);
}