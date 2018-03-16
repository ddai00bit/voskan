var listData, dependenciesList;

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

function getList(data){
	listData = data;
}

function getDependenciesList(data){
	dependenciesList = data;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ready(function(){
	
	
	$.ajax({
		url: "http://paradoxjson.netau.net/php/getlatestnotification.php",
		dataType: "json",
		success: function(data){
			notYearAndMonth = data.timestamp.split("-");
			notDate = notYearAndMonth[2].split(" ")[0];
			
			currentYearAndMonth = data.currentTime.split("-");
			currentDate = currentYearAndMonth[2].split(" ")[0];
				console.log("Not added on " + notDate);
				console.log(currentDate);
				
				console.log("Not added on " + notYearAndMonth[0]);
				console.log(currentYearAndMonth[0]);
				
				console.log("Not added on " + notYearAndMonth[1]);
				console.log(currentYearAndMonth[1]);
			if(notDate == currentDate && notYearAndMonth[0] == currentYearAndMonth[0] && notYearAndMonth[1] == currentYearAndMonth[1]){
			
				$("body").prepend('<div class="container-fluid ' + data.backgroundColor + ' notification" style="display: none;"></div>');
				
				$(".notification").append('<div class="container"><div class="row"><div class="col-md-11"><h3>' + data.heading + '</h3><p>' + data.description + '</p></div><div class="col-md-1"><a href="' + data.buttonLink + '"><div class="btn ' + data.buttonType + '">' + data.buttonText + '</div></a></div></div></div>').show("slow");
			}
		}
	});
	
	if(page == "blocks"){
		$(".nav li").click(function(e){
			$('.active').removeClass('active');
			$(e.target).addClass("active");
			$(".blocks").html("");
			
			var continueRow = true, noOfBlockInRow = 0, rowId = 1, previousRow = 0;
			$.each(listData, function(key, val){
					
				if(noOfBlockInRow >= 2){
					rowId++;
					noOfBlockInRow = 0;
				}
					
				var filename, 
					name, 
					url = "block.html?id=" + val[0].id + "&blockid=" + val[0].blockid + "&type=" + val[0].type + "&hascustomisationclasses=" + val[0].hascustomisationclasses + "&hascustomisationnotes=" + val[0].hascustomisationnotes + "&isvariant=" + val[0].isvariant + "&hasdependency=" + val[0].hasdependency, 
					rowHTML = '<div class="row" id="' + rowId + '"></div>';
					
				if(val[0].isvariant == true){
					
					filename = val[0].blockid + "-style-" + val[0].variantid; 
					name = "Block " + val[0].blockid + " style " + val[0].variantid;
					url += "&variantid=" + val[0].variantid;
						if(val[0].variantid != 1){
							url += "&useparentdes=" + val[0].useparentdes + "&useparentcustomisationclasses=" + val[0].useparentcustomisationclasses + "&useparentcustomisationnotes=" + val[0].useparentcustomisationnotes + "&parentid=" + val[0].parentid;  
						}
				}else{
					
					filename = val[0].blockid;
					name = "Block " + val[0].blockid;
					
				}
					
				if(previousRow != rowId){
					$(".blocks").append(rowHTML);
				}
				
				
					if($(e.target).attr("id") == "content" && val[0].type == "content"){

						$("#" + rowId).append('<div class="col-md-6"><div class="hovereffect"><img class="img-responsive" src="../source-files/img/blocks/' + val[0].type + '/block-' + filename + '.png"><div class="overlay"><h2>' + name +'</h2><a class="info" href="' + url + '">check block information</a></div></div></div>');

						noOfBlockInRow++;
						previousRow = rowId;

					}else if($(e.target).attr("id") == "header" && val[0].type == "header"){
	
						$("#" + rowId).append('<div class="col-md-6"><div class="hovereffect"><img class="img-responsive" src="../source-files/img/blocks/' + val[0].type + '/block-' + filename + '.png"><div class="overlay"><h2>' + name +'</h2><a class="info" href="' + url + '">check block information</a></div></div></div>');
						
						noOfBlockInRow++;
						previousRow = rowId;

					}else if($(e.target).attr("id") == "navigation" && val[0].type == "navigation"){
	
						$("#" + rowId).append('<div class="col-md-6"><div class="hovereffect"><img class="img-responsive" src="../source-files/img/blocks/' + val[0].type + '/block-' + filename + '.png"><div class="overlay"><h2>' + name +'</h2><a class="info" href="' + url + '">check block information</a></div></div></div>');

						noOfBlockInRow++;
						previousRow = rowId;
						
					}else if($(e.target).attr("id") == "footer" && val[0].type == "footer"){

						$("#" + rowId).append('<div class="col-md-6"><div class="hovereffect"><img class="img-responsive" src="../source-files/img/blocks/' + val[0].type + '/block-' + filename + '.png"><div class="overlay"><h2>' + name +'</h2><a class="info" href="' + url + '">check block information</a></div></div></div>');

						noOfBlockInRow++;
						previousRow = rowId;
					}
				
					
			});
			
	
		
		});
	
	}else if(page == "block"){
		
		var id = GetURLParameter("id"), 
			type = GetURLParameter("type"), 
			blockid = GetURLParameter("blockid"), 
			isvariant = GetURLParameter("isvariant"), 
			hascustomisationclasses = GetURLParameter("hascustomisationclasses"), 
			hascustomisationnotes = GetURLParameter("hascustomisationnotes"), 
			hasdependency = GetURLParameter("hasdependency"), 
			name = "Block " + blockid,
			filename;
		
	
		
		if(isvariant == "true"){
			var variantid = GetURLParameter("variantid");
				name += " style " + variantid;
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
		
		
		
		$.get("http://paradoxjson.netau.net/code/code/blocks/" + type + '/' + filename + ".html", function(data){
			$("#main-code").html(data);
			$("#main-code").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"8px",cursorcolor:"#191919",cursoropacitymin:.5});
		});
		
		
			
			if(isvariant == "true" && variantid != 1 && useparentdes == "true"){
				$("#desc").append(listData[parentid][0].description);
			}else if(isvariant == "true" && useparentdes == "false"){
				$("#desc").append(listData[id][0].description);
			}else if(isvariant == "true" && variantid == 1){
				$("#desc").append(listData[id][0].description);
			}else if(isvariant == "false"){
				$("#desc").append(listData[id][0].description);
			}
			
			if(hasdependency == "true"){
				$("#showDependenciesList").css("display", "block");

						dependencies = listData[id][0].dependencies;
					
					
					
					$.each(dependenciesList, function(keyData, valData){
						$.each(dependencies, function(key, value){
							if(valData[0].id == value.id){
								
								if(valData[0].hasdocument == true){
									url = "dependencies/" + valData[0].id + "/" + valData[0].id + ".html";
								}else{
									url = valData[0].url;
								}
								$("#dependenciesList").append("<li><a href='" + url + "'>" + valData[0].name + "</a></li>");
							}
						});
					});
					
					
					
					
			
			
			
			}
			
			if((hascustomisationclasses == "true" && isvariant == "false") || (hascustomisationclasses == "true" && isvariant == "true" && variantid == 1)){
				var customisationClasses = listData[id][1];
			}else if(isvariant == "true" && hascustomisationclasses == "true" && useparentcustomisationclasses == "true"){
				var customisationClasses = listData[parentid][1];
			}else if(isvariant == "true" && hascustomisationclasses == "true" && useparentcustomisationclasses == "false"){
				var customisationClasses = listData[id][1];
			}
				
				if(hascustomisationclasses == "true"){
					$.each(customisationClasses, function(key, val){
						$("#classes").append('<div class="cc" cc-code-id="cc-code-' + val.id +'"><div><code>.' + val.name +'</code></div></div>');

						$.get('http://paradoxjson.netau.net/code/code/blocks/' + type + '/customisationclasses/' + blockid + "/" + val.id + ".html", function(datacode){
							$("#cc-code").append('<div id="cc-code-' + val.id + '" style="display: none;"><p>' + val.description + '</p></textarea><a class="btn-theme copy copy-cc-code" id="cc-code-' + val.id + '-copy">Copy code</a><div class="code" style="clear: both;">' + datacode + '</div><br><textarea class="form-control" style="display: none;" readonly></div>');
						});

					});
				}else{
					$(".no-cc").css("display", "block");
					$(".cc-sel").css("display", "none");
				}
				
				if(hascustomisationnotes == "true"){
					if(isvariant == "true"){
						console.log("is variant");
						if(useparentcustomisationnotes == "true"){
							var customisationNotes = listData[parentid][0].cn;
						}else{
							var customisationNotes = listData[id][0].cn;
						}
					}else{
						var customisationNotes = listData[id][0].cn;
					}
										
					$.each(customisationNotes, function(key, val){
						$("#cn").append('<li>' + val.des +  '</li>');
					});
					
				}else{
					$(".no-cn").css("display", "block");
				}
		
		
		
		$("#blockname").append("Block Name: " + name);
		$(".blck-name").append("<a href='blocks.html'>Blocks</a> > <a href='blocks.html?selected=" + type + "'>" + type.capitalizeFirstLetter() + "s</a> > " + name);
		$("#blockid").append("Block ID: " + blockid);
			
		if(isvariant == "true"){
			$("#variantid").removeAttr("style");
			$("#variantid").append("Variant ID: " + variantid);
			
			$("div.othervar").css("display", "block");
			
			$.each(listData, function(key, val){
				if(val[0].blockid == blockid && val[0].id != id){
					
					varfilename = "block-" + val[0].blockid + "-style-" + val[0].variantid + ".png"; 
				
					url = "block.html?id=" + val[0].id + "&blockid=" + val[0].blockid + "&type=" + val[0].type + "&hascustomisationclasses=" + val[0].hascustomisationclasses + "&hascustomisationnotes=" + val[0].hascustomisationnotes + "&isvariant=" + val[0].isvariant + "&variantid=" + val[0].variantid + "&hasdependency=" + val[0].hasdependency;
					
					if(val[0].variantid != 1){
						url += "&useparentdes=" + val[0].useparentdes + "&useparentcustomisationclasses=" + val[0].useparentcustomisationclasses + "&useparentcustomisationnotes=" + val[0].useparentcustomisationnotes + "&parentid=" + val[0].parentid;  
					}
						
					$("div.row.othervar").append('<div class="col-md-4"><a href="' + url + '"><img class="img-responsive img-thumbnail" src="../source-files/img/blocks/' + val[0].type + '/' + varfilename + '"></a></li>');
				}
			});
		}

		$("#creatorid").append("Creator ID: " + id);
		$("#type").append("Block Type: " + type);
		$("#display").attr("src", "../source-files/img/blocks/" + type + "/" + filename + ".png");
			
		
		var oldcccode;
		
		$(document).on ("click", ".cc", function () {
       	if(oldcccode != undefined){
				$("#" + oldcccode).css("display", "none");
				$('[cc-code-id="' + oldcccode +'"]').removeClass("active_cc");
			}
			
			$(".cc-sel").css("display", "none");
			
			$("#" + $(this).attr("cc-code-id")).css("display", "block");

			oldcccode = $(this).attr("cc-code-id");
			
			$(this).addClass("active_cc");
			$(".cc-code-inside").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"8px",cursorcolor:"#191919",cursoropacitymin:.5});
		});
		
	}else if(page == "dependencies"){
		var noOfCol = 0, rowId = 0, firstRowAppended = false;
						
			$.each(dependenciesList, function(key, val){
				console.log(val);
				if(firstRowAppended === false){
					$(".container").append('<div class="row" id="' + rowId + '"></div>');
					firstRowAppended = true;
				}
				
				if(noOfCol == 4){
					noOfCol = 0;
					rowId++;
					$(".container").append('<div class="row" id="' + rowId + '"></div>');
				}
				
				var url;
				if(val[0].hasdocument == true){
					url = 'dependencies/' + val[0].id + '/' + val[0].id + '.html';
				}else{
					url = val[0].url;
				}
				$("#" + rowId).append('<div class="col-md-3"><div class="dependency"><h2>' + val[0].name + '</h2><h5>' + val[0].used + '</h5><p>Version ' + val[0].version + '</p><a href="' + url + '" class="btn-theme">Check further info</a></div></div>');
				
				noOfCol++;
	
			});
	}else if(page == "dependencypage"){
		var currentCC;
		$(document).on ("click", ".cc", function () {
			if(currentCC != undefined){
				$("#" + currentCC).css("display", "none");
				$("[cc-code-id='" + currentCC +"']").removeClass("active_cc");
			}
			
			currentCC = $(this).attr("cc-code-id");
			
			$("#" + currentCC).css("display", "block");
	
			$(this).addClass("active_cc");		
		});
	}else if(page == "viewtutorial"){
		var name = GetURLParameter("name"), hname = GetURLParameter("hname");
		$(".secondary-header").append('<h3><a href="../index.html">Home</a> > <a href="tutorials.html">Tutorials</a> > ' + hname + '</h3>');
		$('<iframe src="../source-files/tutorials/' + name + '" frameborder="0" scrolling="no" style="width: 100%; height: 642px;"></iframe>').appendTo('.container');
	}
	
});