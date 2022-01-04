let addToDoButton = document.getElementById('addToDo');
let todDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let inputWeight = document.getElementById('addWeight');
let inputNumAssess = document.getElementById('addNum');
let inputMaxPts = document.getElementById('addPts');
let inputDone = document.getElementById('addDonePts');
let calculate = document.getElementById('calc');

calculate.addEventListener("click", function()	{
	alert("be patient you fool i'm still working on it")
})


function arrange_work_buttons_2()	{
	//SHOW WORK DONE SO FAR
	document.getElementById("work_so_far").innerHTML = '';
	var completedPts = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_donePts")
	if(completedPts === "")	{
		completedPts = null;
		localStorage.removeItem(document.getElementById("categoryContainer").innerText + "_donePts")
	}
	if(completedPts != null)	{
		let val = document.getElementById("categoryContainer").innerText;
		let max = localStorage.getItem(val + "_maxPts");

		const myVal = completedPts.split(",");
		var cat = document.getElementById("categoryContainer").innerText + " "
		for (var i = 0; i < myVal.length; i++)	{
			var title = document.createElement('button')
			title.classList.add("work_button")

			title.addEventListener('click', function(e)	{
				if(e.target)	{
					var vals_split = e.target.innerText.split(": ");
					val_split = vals_split[0].split(" ");
					var index = val_split[val_split.length - 1] - 1
					var compPts = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_donePts")
					var dummyPts = compPts.split(",")
					var answer = window.confirm("Are you sure you want to delete " + vals_split[0] + "?");
					if(answer)	{
						//temporarily remove that item list
						localStorage.removeItem(document.getElementById("categoryContainer").innerText + "_donePts")
						var new_values = ""
						for(var k = 0; k < dummyPts.length; k++)	{
							if(k !== parseInt(index))	{
								if(new_values === "")	{
									new_values += dummyPts[k]
								}
								else {
									new_values += "," + dummyPts[k]
								}
							}
						}
						localStorage.setItem(document.getElementById("categoryContainer").innerText + "_donePts", new_values);
						console.log(localStorage);
						arrange_work_buttons();
					}
					
				}
			})
			title.innerText = cat + String(i + 1) + ": " + myVal[i] + " / " + max;
			document.getElementById("work_so_far").appendChild(title);
		}
	}
}

addToDoButton.addEventListener('click', function(){
	//search for duplicate values first
	var pass = true;
	for(var x = 0; x < localStorage.length; x++)	{
		if(localStorage.getItem(localStorage.key(x)) === inputField.value)	{
			alert(localStorage.getItem(localStorage.key(x)) + " has already been entered!");
			pass = false;
		}
	}

	if (pass == true)	{
		localStorage.setItem("category_" + String(localStorage.length + 1), inputField.value);
		var paragraph = document.createElement('button')
		paragraph.classList.add("button_format")
		paragraph.innerText = inputField.value;

		var cancel = document.createElement('button')
		cancel.classList.add("cancel_button")
		cancel.innerText = inputField.value;
		
		cancel.addEventListener('click', function(e)	{
			if(e.target)	{
				var title = document.createElement('p')
				var answer = window.confirm("Are you sure you want to delete the category " + e.target.innerText + "?");
				if(answer)	{
					//delete the category
					var dummy_storage = {};
					Object.assign(dummy_storage, localStorage);
					localStorage.clear()
					var text = e.target.innerText;
					for (const [key, value] of Object.entries(dummy_storage))	{
						if((value !== text) && (key !== (text + "_weight")) && (key !== (text + "_num_assess")) && (key !== (text + "_maxPts")) && (key !== (text + "_donePts")))	{
							localStorage.setItem(key, value);
						}
					}
					console.log(localStorage)
					document.getElementById("toDoContainer").innerHTML = '';
					document.getElementById("del").innerHTML = '';

					document.getElementById("categoryContainer").innerHTML = 'Select a category';
					document.getElementById("categoryTitle").innerHTML = 'Select a category';
					document.getElementById("weight_info").innerHTML = "Weight: --"
					document.getElementById("num_info").innerHTML = 'Number of assessments: --'
					document.getElementById("max_points").innerHTML = "Max pts on each assessment: --"
					document.getElementById("work_so_far").innerHTML = ''
					reload();
				}
			}
		})
		del.appendChild(cancel);

		paragraph.addEventListener('click', function(e){
			if(e.target)	{
				var title = document.createElement('p')
				title.innerText = e.target.innerText;
				var title2 = document.createElement('p')
				title2.innerText = e.target.innerText + " information";

				document.getElementById("categoryContainer").innerHTML = '';
				document.getElementById("categoryContainer").appendChild(title)
				document.getElementById("categoryTitle").innerHTML = '';
				document.getElementById("categoryTitle").appendChild(title2)

				//SHOW WEIGHT
				var weightage = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_weight")
				var title = document.createElement('p')
				document.getElementById("weight_info").innerHTML = '';
				if(weightage != null)	{
					title.innerText = "Weight: " + weightage
				}
				else {
					title.innerText = "Weight: --"
				}
				document.getElementById("weight_info").appendChild(title);

				//SHOW NUM ASSESSMENTS
				var num_assessments = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_num_assess")
				var title = document.createElement('p')
				document.getElementById("num_info").innerHTML = '';
				if(num_assessments != null)	{
					title.innerText = "Number of assessments: " + num_assessments
				}
				else {
					title.innerText = "Number of assessments: --"
				}
				document.getElementById("num_info").appendChild(title);
				
				//SHOW MAX PTS
				var max_point_val = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_maxPts")
				var title = document.createElement('p')
				document.getElementById("max_points").innerHTML = '';
				if(max_point_val != null)	{
					title.innerText = "Max pts on each assessment: " + max_point_val
				}
				else {
					title.innerText = "Max pts on each assessment: --"
				}
				document.getElementById("max_points").appendChild(title);

				arrange_work_buttons_2();
			}
		})
		toDoContainer.appendChild(paragraph);
	}
	inputField.value = "";
})

inputField.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		addToDoButton.click();
		inputField.value = "";
	}
})


//WEIGHT VALUES
inputWeight.addEventListener('click', function()	{
	let val = document.getElementById("categoryContainer").innerText;
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if (localStorage.getItem(document.getElementById("categoryContainer").innerText + "_weight") != null)	{
		alert("Weight already entered!")
	}
	else if (isNaN(weight.value))	{
		alert("Value entered must be a number!")
	}
	else if(weight.value === "")	{
		alert("Value cannot be blank!")
	}
	else if (parseFloat(weight.value) < 0)	{
		alert("Weight cannot be negative!")
	}
	else {
		localStorage.setItem(document.getElementById("categoryContainer").innerText + "_weight", weight.value);
		var title = document.createElement('p')
		document.getElementById("weight_info").innerHTML = '';
		title.innerText = "Weight: " + weight.value
		document.getElementById("weight_info").appendChild(title);
		weight.value = "";
		console.log(localStorage)
	}
})

weight.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		inputWeight.click();
		weight.value = "";
	}
})


//NUMBER OF ASSESSMENT VALUES
inputNumAssess.addEventListener('click', function()	{
	let val = document.getElementById("categoryContainer").innerText;
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if (localStorage.getItem(document.getElementById("categoryContainer").innerText + "_num_assess") != null)	{
		alert("Number of assesments already entered!")
	}
	else if (!Number.isInteger(Number(num_asses.value)))	{
		alert("Value must be an integer!")
	}
	else if (num_asses.value < 0)	{
		alert("Number of assessments cannot be negative!")
	}
	else {
		localStorage.setItem(document.getElementById("categoryContainer").innerText + "_num_assess", num_asses.value);
		var title = document.createElement('p')
		document.getElementById("num_info").innerHTML = '';
		title.innerText = "Number of assessments: " + num_asses.value
		document.getElementById("num_info").appendChild(title);
		num_asses.value = "";
	}
})

num_asses.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		inputNumAssess.click();
		num_asses.value = "";
	}
})

//MAX PTS VALUES
inputMaxPts.addEventListener('click', function()	{
	let val = document.getElementById("categoryContainer").innerText;
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if (localStorage.getItem(document.getElementById("categoryContainer").innerText + "_maxPts") != null)	{
		alert("Max pts already entered!")
	}
	else if (isNaN(max_pts.value))	{
		alert("Value entered must be a number!")
	}
	else if(max_pts.value === "")	{
		alert("Value cannot be blank!")
	}
	else if (parseFloat(max_pts.value) < 0)	{
		alert("Max pts cannot be negative!")
	}
	else {
		localStorage.setItem(document.getElementById("categoryContainer").innerText + "_maxPts", max_pts.value);
		var title = document.createElement('p')
		document.getElementById("max_points").innerHTML = '';
		title.innerText = "Max pts on each assessment: " + max_pts.value
		document.getElementById("max_points").appendChild(title);
		max_pts.value = "";
	}
})

max_pts.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		inputMaxPts.click();
		max_pts.value = "";
	}
})

//COMPLETED ASSIGNMENT VALUES
inputDone.addEventListener('click', function()	{
	let val = document.getElementById("categoryContainer").innerText;
	let weight_val = localStorage.getItem(val + "_weight");
	let num = localStorage.getItem(val + "_num_assess");
	let max = localStorage.getItem(val + "_maxPts");
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if (weight_val == null)	{
		alert("Please enter category weighting")
	}
	else if (num == null)	{
		alert("Please enter number of assessments")
	}
	else if (max == null)	{
		alert("Please enter max pts on each assessment")
	}
	else {
		const myPts = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_donePts")
		if(isNaN(asses_done.value))	{
			alert("Value entered must be a number!")
		}
		else if(asses_done.value === "")	{
			alert("Value cannot be blank!")
		}
		else if(parseFloat(asses_done.value) > parseFloat(max))	{
			alert("Point value cannot exceed max points!")
		}
		else if(parseFloat(asses_done.value) < 0)	{
			alert("Point value cannot be negative");
		}
		else if(myPts == null)	{
			localStorage.setItem(document.getElementById("categoryContainer").innerText + "_donePts", asses_done.value);

			var title = document.createElement('button')
			title.classList.add("work_button")
			var cat = document.getElementById("categoryContainer").innerText + " "
			title.innerText = cat + "1: " + asses_done.value + " / " + max;
			document.getElementById("work_so_far").appendChild(title);
		}
		else {
			var donePts = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_donePts")
			const doneVals = donePts.split(",");
			if(doneVals.length >= num)	{
				alert("Number of assessments entered exceeded number of total assessments!")
			}
			else	{
				localStorage.setItem(document.getElementById("categoryContainer").innerText + "_donePts", donePts + "," + asses_done.value);
				var completedPts = localStorage.getItem(document.getElementById("categoryContainer").innerText + "_donePts")
				const myVal = completedPts.split(",");

				document.getElementById("work_so_far").innerHTML = '';
				var cat = document.getElementById("categoryContainer").innerText + " "
				if(myVal.length === 0)	{
					var title = document.createElement('button')
					title.classList.add("work_button")
					title.innerText = cat + "1: " + myVal + " / " + max;
					document.getElementById("work_so_far").appendChild(title);
				}
				else{
					for (var i = 0; i < myVal.length; i++)	{
						var title = document.createElement('button')
						title.classList.add("work_button")
						title.innerText = cat + String(i + 1) + ": " + myVal[i] + " / " + max;
						document.getElementById("work_so_far").appendChild(title);
					}
				}
					
			}
		}
		asses_done.value = "";	
	}
	arrange_work_buttons_2();
})

asses_done.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		inputDone.click();
		asses_done.value = "";
	}
})




