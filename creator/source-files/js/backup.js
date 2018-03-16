function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}
$("document").ready(function(){	
	$("html").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"8px",cursorcolor:"#191919",cursoropacitymin:.5,horizrailenabled:false});

	if(blockPage == false){
		
		var continueRow = true, noOfBlockInRow = 0, rowId = 1, previousRow = 0;
		
		$.getJSON('source-files/json/list.json', function(data){
			
			$.each(data, function(key, val){
					
				if(noOfBlockInRow >= 2){
					rowId++;
					noOfBlockInRow = 0;
				}
					
				var filename, 
					name, 
					url = "block.html?id=" + val[0].id + "&blockid=" + val[0].blockid + "&type=" + val[0].type + "&hascustomisationclasses=" + val[0].hascustomisationclasses + "&isvariant=" + val[0].isvariant, 
					rowHTML = '<div class="row" id="' + rowId + '"></div>';
					
				if(val[0].isvariant == true){
					
					filename = val[0].blockid + "-style-" + val[0].variantid; 
					name = "Block " + val[0].blockid + " style " + val[0].variantid;
					url += "&variantid=" + val[0].variantid;
						if(val[0].variantid != 0){
							url += "&useparentdes=" + val[0].useparentdes + "&useparentcustomisationclasses=" + val[0].useparentcustomisationclasses + "&useparentcustomisationnotes=" + val[0].useparentcustomisationnotes + "&parentid=" + val[0].parentid;  
						}
				}else{
					
					filename = val[0].blockid;
					name = "Block " + val[0].blockid;
					
				}
					
				if(previousRow != rowId){
					$(".blocks").append(rowHTML);
				}
										
				$("#" + rowId).append('<div class="col-md-6"><h3><a href="' + url + '">' + name + '</a></h3><img src="source-files/img/blocks/' + val[0].type + '/block-' + filename + '.png" class="img-responsive img-thumbnail"></div>');
					
				noOfBlockInRow++;
				previousRow = rowId;
					
			});

		});
	
	}else if(blockPage == true){
		
		var id = GetURLParameter("id"), 
			type = GetURLParameter("type"), 
			blockid = GetURLParameter("blockid"), 
			isvariant = GetURLParameter("isvariant"), 
			hascustomisationclasses = GetURLParameter("hascustomisationclasses"), 
			filename;
		
		if(isvariant == true){
			var variantid = GetURLParameter("variantid");
				if(variantid != 1){
					var childvariant = true;
					var useparentdes = GetURLParameter("useparentdes");
					var useparentcustomisationclasses = GetURLParameter("useparentcustomisationclasses");
					var useparentcustomisationnotes = GetURLParameter("useparentcustomisationnotes");
					var parentid = GetURLParameter("parentid");
					
				}
			filename = "block-" + blockid + "-style-" + variantid;
		}else{
			filename = "block-" + blockid;
		}
		
	
		
		$.get('source-files/code/blocks/' + type + '/' + filename + ".html", function(data){
			$("#main-code").append(data);
		});
		
		
		$.getJSON('source-files/json/list.json', function(data){
			if(useparentdes){
				$("#desc").append(data[parentid][0].description);
			}else{
				$("#desc").append(data[id][0].description);
			}
			
			console.log(data);
			if(useparentcustomisationclasses && hascustomisationclasses){
				var customisationClasses = data[parentid][1];
			}else{
				var customisationClasses = data[id][1];
			}
				if(hascustomisationclasses == true){
					$.each(customisationClasses, function(key, val){
						$("#classes").append('<div class="cc" cc-code-id="cc-code-' + val.id +'"><div><code>.' + val.name +'</code></div></div>');
						
						$.get('source-files/code/blocks/' + type + '/customisationclasses/' + blockid + "/" + val.id + ".html", function(datacode){
							$("#cc-code").append('<div id="cc-code-' + val.id + '" style="display: none;"><p>' + val.description + '</p><div class="code">' + datacode + '</div></div>');
						});

					});
				}
		});
		
		
		$("#blockid").append("Block ID: " + blockid);
		$("#creatorid").append("Creator ID: " + id);
		$("#type").append("Block Type: " + type);
		$("#display").attr("src", "source-files/img/blocks/" + type + "/" + filename + ".png");
		
		var oldcccode;
		
		$(document).on ("click", ".cc", function () {
       	if(oldcccode != undefined){
				$("#" + oldcccode).css("display", "none");
				$('[cc-code-id="' + oldcccode +'"]').removeClass("active_cc");
			}
			
			$(".cc-code-no-code").css("display", "none");
			
			$("#" + $(this).attr("cc-code-id")).css("display", "block");

			oldcccode = $(this).attr("cc-code-id");
			
			$(this).addClass("active_cc");
			$(".cc-code-inside").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"8px",cursorcolor:"#191919",cursoropacitymin:.5}).updateScrollBar();
		});
	}
	
	$(".nav li").click(function(e){
		$('.active').removeClass('active');
		$(e.target).addClass("active");
		$.getJSON('source-files/json/' + e.target.id + '.json', function(data){
		});
	});
	
});