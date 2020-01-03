var imageElemID = 0;
var textElemID = 0;
var selectedID;
var textBoxCanBeDeleted = false;
var rezPos = "";
var dragPos = "";
//Array of objects
var content = [];
//
var imageFileId;
$(function() {
    // const urlParams = new URLSearchParams(window.location.search);
    // openAnnounce(urlParams.get("name"));
    $("#font-size").change(function(){
        const fontsize = $(this).val()+"px";
        const id = selectedID+"_tb";
        $("#"+id).css("font-size",fontsize);
        $("#"+selectedID).attr("data-text-size",fontsize);
        for(var i = 0; i < content.length; i++){
            if(content[i].id === selectedID){
                content[i].size = fontsize;
            }
        }
    });

    $("#font-weight").change(function(){
        const fontweight = $(this).val();
        const id = selectedID+"_tb";
        $("#"+id).css("font-weight",fontweight);
        $("#"+selectedID).attr("data-text-weight",fontweight);
        for(var i = 0; i < content.length; i++){
            if(content[i].id === selectedID){
                content[i].weight = fontweight;
            }
        }
    });

    $("#alignment").change(function(){
        const alignment = $(this).val();
        const id = selectedID+"_tb";
        $("#"+id).css("text-align",alignment);
        $("#"+selectedID).attr("data-text-alignment",alignment);
        for(var i = 0; i < content.length; i++){
            if(content[i].id === selectedID){
                content[i].alignment = alignment;
            }
        }
    });

    

    //Trigger when the user chose a file
    $("#addImage").change(function() {
        setTimeout(() => {
            fileName = document.querySelector("#addImage").value;
            regex = new RegExp('[^.]+$');
            extension = fileName.match(regex);
            getImg(this, extension);
        }, 200);
    });

    $("body").click(function (event){
        if(!$(event.target).closest(".dynamicDiv").length && !$(event.target).is(".dynamicDiv")&&
            !$(event.target).closest(".dynamicTextarea").length && !$(event.target).is(".dynamicTextarea")&&
            !$(event.target).closest("button").length && !$(event.target).is("button")&&
            !$(event.target).closest("label").length && !$(event.target).is("label")
        ){
            //Remove borders to all images // In other words, this condition deselect the Resizable&Draggable Image
            $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
            $(".dynamicDiv").css('border', 'none');
            $(".dynamicDiv").removeClass("deletable"); 
            //Remove borders to all textbox // this condition deselect the Resizable&Draggable Textbox
            $(".dynamicTextarea").css('border', 'none');
            $(".dynamicTextarea").removeClass("deletable");
        }     
    });

});

function getImg(img, ext){
    if (img.files && img.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            addimage(e.target.result, ext)
        }
        reader.readAsDataURL(img.files[0]);
    }
}


function addimage(imgParam, imgParamExt){
    imageElemID++;

    const dynamicDiv = document.createElement("div");
          dynamicDiv.id = "dr_id_"+imageElemID;
          dynamicDiv.className = "dynamicDiv";
          dynamicDiv.onmousedown = function(e) { // Pre-define an event listener
            selectElem(e, dynamicDiv.id); // This function will be triggered "onmousedown" 
          };

    const dynamicImg = document.createElement("img");
          dynamicImg.src = imgParam;

    document.getElementById("canvas").appendChild(dynamicDiv);
    document.getElementById("dr_id_"+imageElemID).appendChild(dynamicImg);

    imageFileId = dynamicDiv.id; 

    $(".dynamicDiv").draggable({
        containment: "parent",
        scroll: false,
        drag: function(event,ui){
            $("#"+selectedID).attr("data-top-pos",ui.position.top);
            $("#"+selectedID).attr("data-left-pos",ui.position.left);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].top = ui.position.top;
                    content[i].left = ui.position.left;
                }
            }
        }
    }).resizable({ 
        handles: "n, e, s, w, ne, se, sw, nw",
        containment: "parent",
        resize: function(event,ui){
            $("#"+selectedID).attr("data-elem-height",ui.size.height);
            $("#"+selectedID).attr("data-elem-width",ui.size.width);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].height = ui.size.height;
                    content[i].width = ui.size.width;
                }
            }
        },
        
    }).selectable();


    //Get the width and the height of the newly added resizable and draggbale element
    var width,height;
    setTimeout(() => {
        width = $("#dr_id_"+imageElemID).width();
        height = $("#dr_id_"+imageElemID).height();
    }, 10);
    //Create custom data attributes to the newly added resizable and draggbale element
    setTimeout(() => {
        $("#dr_id_"+imageElemID).attr("data-top-pos",0);
        $("#dr_id_"+imageElemID).attr("data-left-pos",0);
        $("#dr_id_"+imageElemID).attr("data-elem-height",height);
        $("#dr_id_"+imageElemID).attr("data-elem-width",width);
        $("#dr_id_"+imageElemID).attr("data-img-ext",imgParamExt);
    }, 15);
    //Push resizable and draggable element's size, position and id into content array
    setTimeout(() => {
        content.push({
            type : "image",
            id : "dr_id_"+imageElemID, 
            height : parseFloat($("#dr_id_"+imageElemID).attr("data-elem-height")),
            width : parseFloat($("#dr_id_"+imageElemID).attr("data-elem-width")),
            top : parseFloat($("#dr_id_"+imageElemID).attr("data-top-pos")),
            left : parseFloat($("#dr_id_"+imageElemID).attr("data-left-pos")),
            ext : $("#dr_id_"+imageElemID).attr("data-img-ext")
        })
    }, 20);
    


    //Remove borders to all images
    $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
    $(".dynamicDiv").css('border', 'none');
    $(".dynamicDiv").removeClass("deletable"); 
    //Remove borders to all textbox
    $(".dynamicTextarea").css('border', 'none');
    $(".dynamicTextarea").removeClass("deletable");

    //Add border to the newly added textbox
    $("#dr_id_"+imageElemID).append("<div id='bulletSE'></div>")   
    $("#dr_id_"+imageElemID).append("<div id='bulletNE'></div>")   
    $("#dr_id_"+imageElemID).append("<div id='bulletSW'></div>")   
    $("#dr_id_"+imageElemID).append("<div id='bulletNW'></div>")   
    $("#dr_id_"+imageElemID).css('border', '1px solid #808080');
    //Make newly added textbox selected and deletable when click on delete
    selectedID = null;
    selectedID = "dr_id_"+imageElemID;
    setTimeout(() => {
        $("#dr_id_"+imageElemID).addClass("deletable");  
    }, 10); 

    uploadImgToServer(selectedID, imgParamExt);
}

//--------------------------------------------------------------------------------------
//Add textarea
function addTextFunc(){
    setTimeout(() => {
        addText()
    }, 200);
}

function addText(){
    textElemID ++;

    const dynamicTextarea = document.createElement("div");
          dynamicTextarea.id = "tr_id_"+textElemID;
          dynamicTextarea.className = "dynamicTextarea";
          dynamicTextarea.onmousedown = function(e) { // Pre-define an event listener
            selectElem(e, dynamicTextarea.id); // This function will be triggered "onmousedown" 
          };


    const dynamicText = document.createElement("textarea");
          dynamicText.rows = "1";
          dynamicText.id = "tr_id_"+textElemID+"_tb";
          dynamicText.placeholder = "Place your text here...";
          dynamicText.onfocus = function(e){
            textBoxCanBeDeleted = false;
          };
          dynamicText.onblur = function(e){
            textBoxCanBeDeleted = true;
          };
          dynamicText.oninput = function(e){
              getTextboxText(e);
          };


    document.getElementById("canvas").appendChild(dynamicTextarea);
    document.getElementById("tr_id_"+textElemID).appendChild(dynamicText);

    $(".dynamicTextarea").draggable({
        containment: "parent",
        scroll: false,
        handles: ".dynamicTextarea",
        drag: function(event,ui){
            $("#"+selectedID).attr("data-top-pos",ui.position.top);
            $("#"+selectedID).attr("data-left-pos",ui.position.left);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].top = ui.position.top;
                    content[i].left = ui.position.left;
                }
            }
        }
    }).resizable({ 
        handles: "ne, se, sw, nw",
        containment: "parent",
        resize: function(event,ui){
            $("#"+selectedID).attr("data-elem-height",ui.size.height);
            $("#"+selectedID).attr("data-elem-width",ui.size.width);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].height = ui.size.height;
                    content[i].width = ui.size.width;
                }
            }
        },
    });

    //Get the width and the height of the newly added resizable and draggbale element
    var width,height,fontSize;
    setTimeout(() => {
        width = $("#tr_id_"+textElemID).width();
        height = $("#tr_id_"+textElemID).height();
    }, 10);
    fontSize = $("#tr_id_"+textElemID+"_tb").css("font-size");

    //Create custom data attributes to the newly added resizable and draggbale element
    setTimeout(() => {
        $("#tr_id_"+textElemID).attr("data-top-pos",0);
        $("#tr_id_"+textElemID).attr("data-left-pos",0);
        $("#tr_id_"+textElemID).attr("data-elem-height",height);
        $("#tr_id_"+textElemID).attr("data-elem-width",width);
        $("#tr_id_"+textElemID).attr("data-text-alignment","left");
        $("#tr_id_"+textElemID).attr("data-text-weight",400);
        $("#tr_id_"+textElemID).attr("data-text-size",fontSize);
        $("#tr_id_"+textElemID).attr("data-text-color","#000000");
        $("#tr_id_"+textElemID).attr("data-text-text","");
        $("#tr_id_"+textElemID).attr("data-text-border",true);
    }, 15);
    //Push resizable and draggable element's size, position and id into content array
    setTimeout(() => {
        content.push({
            type : "text",
            id : "tr_id_"+textElemID, 
            height : parseFloat($("#tr_id_"+textElemID).attr("data-elem-height")),
            width : parseFloat($("#tr_id_"+textElemID).attr("data-elem-width")),
            top : parseFloat($("#tr_id_"+textElemID).attr("data-top-pos")),
            left : parseFloat($("#tr_id_"+textElemID).attr("data-left-pos")),
            alignment : $("#tr_id_"+textElemID).attr("data-text-alignment"),
            weight : $("#tr_id_"+textElemID).attr("data-text-weight"),
            size : $("#tr_id_"+textElemID).attr("data-text-size"),
            color : $("#tr_id_"+textElemID).attr("data-text-color"),
            text : $("#tr_id_"+textElemID).attr("data-text-text"),
            border : $("#tr_id_"+textElemID).attr("data-text-border"),
        })
    }, 100);

    //Remove borders to all textbox
    $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
    $(".dynamicTextarea").css('border', 'none');
    $(".dynamicTextarea").removeClass("deletable");
    //Remove borders to all images
    $(".dynamicDiv").css('border', 'none');
    $(".dynamicDiv").removeClass("deletable");

    //Add border to the newly added textbox
    $("#tr_id_"+textElemID).append("<div id='bulletSE'></div>")   
    $("#tr_id_"+textElemID).append("<div id='bulletNE'></div>")   
    $("#tr_id_"+textElemID).append("<div id='bulletSW'></div>")   
    $("#tr_id_"+textElemID).append("<div id='bulletNW'></div>")   
    $("#tr_id_"+textElemID).css('border', '1px solid #808080');
    //Make newly added textbox selected and deletable when click on delete
    selectedID = null;
    selectedID = "tr_id_"+textElemID;
    setTimeout(() => {
        $("#tr_id_"+textElemID).addClass("deletable");  
    }, 10); 
}


//--------------------------------------------------------------------------------------
//Put border to selected element
function selectElem(e, id){
    selectedID = null;
    selectedID = id;
    
    $(".dynamicDiv").each(function() {
        if($(this).attr("id")===id){
            $(this).css('border', '1px solid #808080');
            $(this).addClass("deletable");   
            $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
            setTimeout(() => {
                $(this).append("<div id='bulletSE'></div>")   
                $(this).append("<div id='bulletNE'></div>")   
                $(this).append("<div id='bulletSW'></div>")   
                $(this).append("<div id='bulletNW'></div>")   
            }, 10);
        }else{
            $(this).css('border', 'none');
            $(this).removeClass("deletable");  
            $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
        }
    });

    $(".dynamicTextarea").each(function() {
        const oldID = id;
        if($(this).attr("id")===id){
            $(this).css('border', '1px solid #808080');
            $(this).addClass("deletable");   
            $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
            setTimeout(() => {
                $(this).append("<div id='bulletSE'></div>")   
                $(this).append("<div id='bulletNE'></div>")   
                $(this).append("<div id='bulletSW'></div>")   
                $(this).append("<div id='bulletNW'></div>")   
            }, 10);
        }else{
            $(this).css('border', 'none');
            $(this).removeClass("deletable");  
            $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
        }
    });
}

//--------------------------------------------------------------------------------------
//Delete selected element
$(document).keydown(function(e){
    if (e.key === "Delete") {
        var form_data = new FormData();  
        var imgExt = $("#"+selectedID).attr("data-img-ext");
        form_data.append("imageId", selectedID);
        form_data.append("imageExt", imgExt);
        
            $(".dynamicDiv").each(function() {
                if($(this).hasClass("deletable")){
                    $.ajax({
                        url: "delete_image.php",
                        type: "POST",
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData:false,
                        success: function(data){
                            console.log(data);
                        }
                    });

                    for(var i = 0; i < content.length; i++){
                        if(content[i].id === selectedID){
                            content.splice(i, 1)
                        }
                    }

                    setTimeout(() => {
                        document.getElementById(selectedID).remove();
                    }, 10);
                }
            });
    
            if(textBoxCanBeDeleted){
                $(".dynamicTextarea").each(function() {
                    if($(this).hasClass("deletable")){

                        for(var i = 0; i < content.length; i++){
                            if(content[i].id === selectedID){
                                content.splice(i, 1)
                            }
                        }

                        setTimeout(() => {
                            document.getElementById(selectedID).remove();
                        }, 10);
                    }
                });
            }else{
                console.log("Textbox cannot be deleted");
            }
        

    }
})

function checkIfHightLighted(e, id){

    if(isTextSelected(document.getElementById(id)) === "noHighlight"){
        textBoxCanBeDeleted = true;
    }else{
        textBoxCanBeDeleted = false;
    }

}

//--------------------------------------------------------------------------------------
//Display Position
function getPos(){
    console.log("Resize position :", rezPos)
    console.log("Drag position :", dragPos)
}

//--------------------------------------------------------------------------------------
//Remove Border
function removeBorder(){
    var id = selectedID+"_tb";
    document.getElementById(id).style.border = "none";
    $("#"+selectedID).attr("data-text-border",false);
    for(var i = 0; i < content.length; i++){
        if(content[i].id === selectedID){
            content[i].border = false;
        }
    }
}

//--------------------------------------------------------------------------------------
//Get Textbox Text
function getTextboxText(e){
    var text = e.target.value;
    $("#"+selectedID).attr("data-text-text",text.replace(/\n\r?/g, "\n"));
    for(var i = 0; i < content.length; i++){
        if(content[i].id === selectedID){
            content[i].text = text.replace(/\n\r?/g, "\n");
        }
    }
    //.replace(/\n\r?/g, '<br />') converts breaklines into <br/>
}


//--------------------------------------------------------------------------------------
//Upload Image to Server
function uploadImgToServer(imgId, imgExt){
    var file_data = $('#addImage').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append("file", file_data);
    form_data.append("imageId", imgId);
    form_data.append("imageExt", imgExt);
    $.ajax({
        url: "add_image.php",
        type: "POST",
        data: form_data,
        contentType: false,
        cache: false,
        processData:false,
        success: function(data){
            console.log(data);
        }
    });
}

//--------------------------------------------------------------------------------------
//Check if a text is selected - This function will be used in order to detect if is the texbox selected will be entirely deleted 
function isTextSelected(input){
    var text = getSelection(input);
    
    if(text == null || text.length == 0) text = "noHighlight";
    
    return text;         
}

//--------------------------------------------------------------------------------------
function getSelection(textbox){
    var selectedText = null;
    var activeElement = document.activeElement;
    
//--------------------------------------------------------------------------------------
// all browsers (including IE9 and up), except IE before version 9 
    if (window.getSelection && activeElement && 
        (activeElement.tagName.toLowerCase() == "textarea" || (activeElement.tagName.toLowerCase() == "input" && activeElement.type.toLowerCase() == "text")) &&
        activeElement === textbox){    
            var startIndex = textbox.selectionStart;
            var endIndex = textbox.selectionEnd;
            
            if(endIndex - startIndex > 0){
                var text = textbox.value;
                selectedText = text.substring(textbox.selectionStart, textbox.selectionEnd);
            }
    }else if (document.selection && document.selection.type == "Text" &&  document.selection.createRange){       
            var range = document.selection.createRange();
            selectedText = range.text;
    }    

    return selectedText;
}

//--------------------------------------------------------------------------------------
$("#Img_Upl_Form").on("submit",(function(e) {
    e.preventDefault();
    
})); 



function save(){
    // if(content.length != 0){
    //     html2canvas(document.getElementById("canvas")).then(function(canvas) {
    //         document.body.appendChild(canvas);
    //     });
    // }
    
    // setTimeout(() => {
    //     if(content.length == 0){
    //         alert("Canvas empty. There's nothing to save")
    //     }else{
    //         $.ajax({
    //             type: "POST",
    //             url: "add_announcement.php",
    //             data: {"content" : JSON.stringify(content)},
    //             success: function(res){
    //                 alert (res);
    //             }                 
    //         });
    //     } 
    // }, 1000);

    //Remove borders to all images // In other words, this condition deselect the Resizable&Draggable Image
    $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
    $(".dynamicDiv").css('border', 'none');
    $(".dynamicDiv").removeClass("deletable"); 
    //Remove borders to all textbox // this condition deselect the Resizable&Draggable Textbox
    $(".dynamicTextarea").css('border', 'none');
    $(".dynamicTextarea").removeClass("deletable");

        html2canvas(document.getElementById("canvas")).then(function(canvas) {
            document.body.appendChild(canvas);
        });
}

function openAnnounce(announcementName){

    var imgQty = 0;
    var insContent;
    // if(announcementName!=="" || announcementName !== null){
        $.ajax({
            type: "GET",
            url: "add_announcement.php",
            data: {"name" : "testname"},
            success: function(res){
                insContent = JSON.parse(res);
                for(var i = 0; i < insContent.length; i++){
                    if(insContent[i].type === "image"){
                            addimageFromSave(insContent[i].id, insContent[i].top, insContent[i].left, insContent[i].height, insContent[i].width, insContent[i].ext)
                    }
                }
                for(var i = 0; i < insContent.length; i++){
                    if(insContent[i].type === "text"){
                            addtextFromSave(insContent[i].id, insContent[i].top, insContent[i].left, insContent[i].height, insContent[i].width, insContent[i].alignment, insContent[i].weight, insContent[i].size, insContent[i].color, insContent[i].text, insContent[i].border)
                    }
                }
            }                 
        });
   //}
}

function addtextFromSave(id, topparam, leftparam, heightparam, widthparam, alignment, weight, size, color, text, border){

    const dynamicTextarea = document.createElement("div");
          dynamicTextarea.id = id;
          dynamicTextarea.className = "dynamicTextarea";
          dynamicTextarea.onmousedown = function(e) { // Pre-define an event listener
            selectElem(e, dynamicTextarea.id); // This function will be triggered "onmousedown" 
          };


    const dynamicText = document.createElement("textarea");
          dynamicText.rows = "1";
          dynamicText.id = id+"_tb";
          dynamicText.value = text;
          dynamicText.onfocus = function(e){
            textBoxCanBeDeleted = false;
          };
          dynamicText.onblur = function(e){
            textBoxCanBeDeleted = true;
          };
          dynamicText.oninput = function(e){
              getTextboxText(e);
          };


    document.getElementById("canvas").appendChild(dynamicTextarea);
    document.getElementById(id).appendChild(dynamicText);

    $(".dynamicTextarea").draggable({
        containment: "parent",
        scroll: false,
        handles: ".dynamicTextarea",
        drag: function(event,ui){
            $("#"+selectedID).attr("data-top-pos",ui.position.top);
            $("#"+selectedID).attr("data-left-pos",ui.position.left);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].top = ui.position.top;
                    content[i].left = ui.position.left;
                }
            }
        }
    }).resizable({ 
        handles: "ne, se, sw, nw",
        containment: "parent",
        resize: function(event,ui){
            $("#"+selectedID).attr("data-elem-height",ui.size.height);
            $("#"+selectedID).attr("data-elem-width",ui.size.width);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].height = ui.size.height;
                    content[i].width = ui.size.width;
                }
            }
        },
    });

    //Apply styles form Database
    $("#"+id).css("width",widthparam+"px")
    $("#"+id).css("height",heightparam+"px")
    $("#"+id).css("top",topparam)
    $("#"+id).css("left",leftparam)
    $("#"+id+"_tb").css("text-align",alignment)
    $("#"+id+"_tb").css("font-weight",weight)
    $("#"+id+"_tb").css("font-size",size)
    $("#"+id+"_tb").css("color",color)


    //Create custom data attributes to the newly added resizable and draggbale element
    setTimeout(() => {
        $("#"+id).attr("data-top-pos",topparam);
        $("#"+id).attr("data-left-pos",leftparam);
        $("#"+id).attr("data-elem-height",heightparam);
        $("#"+id).attr("data-elem-width",widthparam);
        $("#"+id).attr("data-text-alignment",alignment);
        $("#"+id).attr("data-text-weight",weight);
        $("#"+id).attr("data-text-size",size);
        $("#"+id).attr("data-text-color",color);
        $("#"+id).attr("data-text-text",text);
        $("#"+id).attr("data-text-border",border);
    }, 15);
    //Push resizable and draggable element's size, position and id into content array
    setTimeout(() => {
        content.push({
            type : "text",
            id : id, 
            height : parseFloat($("#"+id).attr("data-elem-height")),
            width : parseFloat($("#"+id).attr("data-elem-width")),
            top : parseFloat($("#"+id).attr("data-top-pos")),
            left : parseFloat($("#"+id).attr("data-left-pos")),
            alignment : $("#"+id).attr("data-text-alignment"),
            weight : $("#"+id).attr("data-text-weight"),
            size : $("#"+id).attr("data-text-size"),
            color : $("#"+id).attr("data-text-color"),
            text : $("#"+id).attr("data-text-text"),
            border : $("#"+id).attr("data-text-border"),
        })
    }, 20);

    //Remove borders to all textbox
    $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
    $(".dynamicTextarea").css('border', 'none');
    $(".dynamicTextarea").removeClass("deletable");
    //Remove borders to all images
    $(".dynamicDiv").css('border', 'none');
    $(".dynamicDiv").removeClass("deletable");
}

function addimageFromSave(id, topparam, leftparam, heightparam, widthparam, ext){
   
    const dynamicDiv = document.createElement("div");
          dynamicDiv.id = id;
          dynamicDiv.className = "dynamicDiv";
          dynamicDiv.onmousedown = function(e) { // Pre-define an event listener
            selectElem(e, dynamicDiv.id); // This function will be triggered "onmousedown" 
          };

    const dynamicImg = document.createElement("img");
          dynamicImg.src = "uploaded_images/"+id+"."+ext;

    document.getElementById("canvas").appendChild(dynamicDiv);
    document.getElementById(id).appendChild(dynamicImg);

    imageFileId = dynamicDiv.id; 

    

    $(".dynamicDiv").draggable({
        containment: "parent",
        scroll: false,
        drag: function(event,ui){
            $("#"+selectedID).attr("data-top-pos",ui.position.top);
            $("#"+selectedID).attr("data-left-pos",ui.position.left);
            //Update content array when the user clicked on an resizable and draggable element
            console.log("=====>",selectedID)

            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].top = ui.position.top;
                    content[i].left = ui.position.left;
                }
            }
        }
    }).resizable({
        handles: "n, e, s, w, ne, se, sw, nw",
        containment: "parent",
        resize: function(event,ui){
            $("#"+selectedID).attr("data-elem-height",ui.size.height);
            $("#"+selectedID).attr("data-elem-width",ui.size.width);
            //Update content array when the user clicked on an resizable and draggable element
            for(var i = 0; i < content.length; i++){
                if(content[i].id === selectedID){
                    content[i].height = ui.size.height;
                    content[i].width = ui.size.width;
                }
            }
        }
    }).selectable();

    //Apply styles form Database
    $("#"+id).css("width",widthparam+"px")
    $("#"+id).css("height",heightparam+"px")
    $("#"+id).css("top",topparam)
    $("#"+id).css("left",leftparam)

    //Create custom data attributes to the newly added resizable and draggbale element
    setTimeout(() => {
        $("#"+id).attr("data-top-pos",topparam);
        $("#"+id).attr("data-left-pos",leftparam);
        $("#"+id).attr("data-elem-height",heightparam);
        $("#"+id).attr("data-elem-width",widthparam);
    }, 15);
    //Push resizable and draggable element's size, position and id into content array
    setTimeout(() => {
        content.push({
            type : "image",
            id : id, 
            height : parseFloat($("#"+id).attr("data-elem-height")),
            width : parseFloat($("#"+id).attr("data-elem-width")),
            top : parseFloat($("#"+id).attr("data-top-pos")),
            left : parseFloat($("#"+id).attr("data-left-pos"))
        })
    }, 20);
    


    //Remove borders to all images
    $("#bulletSE,#bulletNE,#bulletSW,#bulletNW").remove();
    $(".dynamicDiv").css('border', 'none');
    $(".dynamicDiv").removeClass("deletable"); 
    //Remove borders to all textbox
    $(".dynamicTextarea").css('border', 'none');
    $(".dynamicTextarea").removeClass("deletable");

    //Add border to the newly added textbox
    $(id).append("<div id='bulletSE'></div>")   
    $(id).append("<div id='bulletNE'></div>")   
    $(id).append("<div id='bulletSW'></div>")   
    $(id).append("<div id='bulletNW'></div>")   
    $(id).css('border', '1px solid #808080');
    //Make newly added textbox selected and deletable when click on delete
}

