var activePage;
$(document).ready(function(){
    $("#main_content").load("pages/affiches_content.html");
});

function navigate(id){
    //Remove or Add Active Class
    $(".sn_item").each(function() {
        $(this).removeClass("active");
        $("#"+id).addClass("active");
    });

    if(id.toLowerCase().includes("affiches")){
        if(activePage != "affiches"){
            activePage = "affiches";
            $("#main_content").fadeOut(250);
            setTimeout(() => {
                $("#main_content").html("");
                $("#main_content").fadeIn(250);
                $("#main_content").load("pages/affiches_content.html");
            }, 250);
        }
    }else if(id.toLowerCase().includes("sites")){
        if(activePage != "sites"){
            activePage = "sites";
            $("#main_content").fadeOut(250);
            setTimeout(() => {
                $("#main_content").html("");
                $("#main_content").fadeIn(250);
                $("#main_content").load("pages/sites_content.html");
            }, 250);
        }
    }  
}