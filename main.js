let addToDoButton = document.getElementById('addToDo');
let todDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let inputWeight = document.getElementById('addWeight');
let inputNumAssess = document.getElementById('addNum');
let inputMaxPts = document.getElementById('addPts');
let inputDone = document.getElementById('addDonePts');
let calculate = document.getElementById('calc');
let inputCutOff = document.getElementById('addCut')

inputCutOff.addEventListener("click", function()	{
	const oldCutOffs = localStorage.getItem("cut_off_values");
	if(oldCutOffs !== null)	{
		var the_cutOff_keys = oldCutOffs.split(",");
		var the_cuts = ""
		var the_grades = ""
		for(var i = 0; i < the_cutOff_keys.length; i++)	{
			var the_set_item = the_cutOff_keys[i].split("_");
			if(i == 0) {
				the_cuts += the_set_item[1]
				the_grades += the_set_item[0]
			}
			else {
				the_cuts += "," + the_set_item[1]
				the_grades += "," + the_set_item[0]
			}
		}
		//sort the values
		var the_cut_vals = the_cuts.split(",")
		var the_grade_vals = the_grades.split(",")
	}
	else {
		the_cut_vals = null
		the_grade_vals = null
	}

	//validate grade first
	var disp = false
	var cont = true

	if(letter.value !== letter.value.trim())	{
		cont = false
		alert("Please leave out additional spaces in the beginning or end of grade")
		disp = true
	}
	if(letter.value.includes("  "))	{
		if(!disp)	{
			alert("Please avoid putting more than one space between grade")
			disp = true
		}
		cont = false
	}
	//ensure no blanks
	var string_check = letter.value.split(" ")
	var pass_through = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass_through == false)	{
			pass_through = true
		}
	}
	if(letter.value == "")	{
		if(!disp)	{
			alert("Grade cannot be blank")
			disp = true
		}
		pass_through = false
	}

	if(the_grade_vals !== null)	{
		if(the_grade_vals.includes(letter.value))	{
			if(!disp)	{
				alert("The grade " + letter.value + " has already been entered")
			}
			pass_through = false
			disp = true
		}
	}

	if (pass_through && cont) {
		var grade_pass = true
	}
	else {
		var grade_pass = false
	}

	//validate cut off value
	
	cont = true
	if((cut_off.value) !== ((cut_off.value).trim()))	{
		cont = false
		alert("Please leave out additional spaces in the beginning or end of cutoff")
		disp = true
	}
	if(cut_off.value.includes("  "))	{
		if(!disp)	{
			alert("Please avoid putting more than one space between cutoff")
			disp = true
		}
		cont = false
	}
	//ensure no blanks
	var string_check = cut_off.value.split(" ")
	pass_through = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass_through == false)	{
			pass_through = true
		}
	}
	if(cut_off.value == "")	{
		if(!disp)	{
			alert("Cut off cannot be blank")
			disp = true
		}
		pass_through = false
	}

	if (isNaN(cut_off.value))	{
		if(!disp) {
			alert("Cut off must be a number!")
			disp = true
		}	
		pass_through = false
	}

	if(pass_through && cont)	{
		if((parseFloat(cut_off.value) < 0) || (parseFloat(cut_off.value) > 100)) {
			alert("Cut off must be between 0 and 100");
			disp = true
			pass_through = false
		}
	}

	if(the_cut_vals !== null)	{
		if(the_cut_vals.includes(cut_off.value))	{
			if(!disp)	{
				alert("The cut off value " + cut_off.value + " has already been entered")
			}
			pass_through = false
			disp = true
		}
	}

	if (pass_through && cont) {
		var cutoff_pass = true
	}
	else {
		var cutoff_pass = false
	}

	if(grade_pass && cutoff_pass) {
		const myCutOffs = localStorage.getItem("cut_off_values");
		document.getElementById("cut_offs_container").innerHTML = ""

		if(myCutOffs == null)	{
			//creating the first cut off
			var cut_off_val = String(letter.value) + "_" + String(cut_off.value)
			localStorage.setItem("cut_off_values", cut_off_val);
			var title = document.createElement('button')
			title.classList.add("cut_off_button")
			title.innerText = letter.value + " >= " + cut_off.value
			document.getElementById("cut_offs_container").appendChild(title);
		}
		else {
			//previous cut offs already exist
			var cutOff_keys = myCutOffs.split(",");
			var cuts = ""
			var grades = ""
			for(var i = 0; i < cutOff_keys.length; i++)	{
				var set_item = cutOff_keys[i].split("_");
				if(i == 0) {
					cuts += set_item[1]
					grades += set_item[0]
				}
				else {
					cuts += "," + set_item[1]
					grades += "," + set_item[0]
				}
			}

			//sort the values
			var cut_vals = cuts.split(",")
			var grade_vals = grades.split(",")
			for(var i = 0; i < cut_vals.length; i++)	{
				cut_vals[i] = parseFloat(cut_vals[i])
			}

			var index = 0;
			var found = false
			while(index < cut_vals.length && !found)	{
				if(parseFloat(cut_off.value) < cut_vals[index])	{
					//keep going
					index += 1;
				}
				else {
					found = true
				}
			}

			cut_vals.splice(index, 0, cut_off.value)
			grade_vals.splice(index, 0, letter.value)
			
			var submission_string = ""

			for(var i = 0; i < cut_vals.length; i++)	{
				if(i == 0)	{
					submission_string = String(grade_vals[i]) + "_" + String(cut_vals[i])
				}
				else {
					submission_string += "," + String(grade_vals[i]) + "_" + String(cut_vals[i])
				}
			}
			localStorage.setItem("cut_off_values", submission_string);
		}
		arrange_grade_buttons_2()
		console.log(localStorage)
	}
	
})

letter.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		inputCutOff.click();
		letter.value = "";
		cut_off.value = "";
	}
})

cut_off.addEventListener("keyup", function(event)	{
	event.preventDefault();
	if(event.keyCode === 13)	{
		inputCutOff.click();
		cut_off.value = "";
		letter.value = "";
	}
})

function analyze_grade()	{
	var opportunity_earn = 0;
	var current_earnings = 0;
	var permanent_loss = 0;
	var cur_progress = 0;


	for(var i = 0; i < localStorage.length; i++)	{
		if(localStorage.key(i).includes("category_"))	{
			var cat_name = localStorage.getItem(localStorage.key(i));

			//opportunity to earn
			var earn_opportunity = localStorage.getItem(cat_name + "_opportunity_percent")
			opportunity_earn += parseFloat(earn_opportunity.split(" ")[0])

			//current earnings
			var earnings = localStorage.getItem(cat_name + "_secured_percent")
			current_earnings += parseFloat(earnings.split(" ")[0])

			//permanent loss
			var loss = localStorage.getItem(cat_name + "_loss_percent")
			permanent_loss += parseFloat(loss.split(" ")[0])
		}
	}

	var opportunity = String(opportunity_earn.toFixed(2)) + " %"
	localStorage.setItem("grade_earn_opportunity", opportunity)
	var earning = String(current_earnings.toFixed(2)) + " %"
	localStorage.setItem("grade_current_earnings", earning)
	var lost = String(permanent_loss.toFixed(2)) + " %"
	localStorage.setItem("grade_permanent_loss", lost)

	cur_progress = ((current_earnings / opportunity_earn) * 100).toFixed(2)
	if(isNaN(cur_progress))	{
		cur_progress = "--"
	}
	localStorage.setItem("grade_current_progress", cur_progress + " %")

	var percent_controllable = 100 - opportunity_earn;
	var max_final = (current_earnings + percent_controllable).toFixed(2);
	localStorage.setItem("grade_highest_final", max_final + " %")

	document.getElementById("earn_opportunity").innerHTML = ""
	var earn = document.createElement('p')
	var earn_val = localStorage.getItem("grade_earn_opportunity")
	earn.innerText = "Percent you had the opportunity to earn: " + earn_val
	document.getElementById("earn_opportunity").appendChild(earn);

	document.getElementById("current_earnings").innerHTML = ""
	var current = document.createElement('p')
	var current_val = localStorage.getItem("grade_current_earnings")
	current.innerText = "Total secured percent: " + current_val
	document.getElementById("current_earnings").appendChild(current)

	document.getElementById("permanent_loss").innerHTML = ""
	var perm = document.createElement('p')
	var per_val = localStorage.getItem("grade_permanent_loss")
	perm.innerText = "Total percent permanently lost: " + per_val 
	document.getElementById("permanent_loss").appendChild(perm)

	document.getElementById("current_progress").innerHTML = ""
	var cur = document.createElement('p')
	var cur_val = localStorage.getItem("grade_current_progress")
	cur.innerText = "Current progress and percentage: " + cur_val 
	document.getElementById("current_progress").appendChild(cur)

	document.getElementById("highest_final").innerHTML = ""
	var highest = document.createElement('p')
	var highest_val = localStorage.getItem("grade_highest_final")
	highest.innerText = "Highest possible final score: " + highest_val 
	document.getElementById("highest_final").appendChild(highest)

	//layout the cutoffs
	var cuts_off = localStorage.getItem("cut_off_values")
	var virtual_amounts = ""

	var current_status = parseFloat(localStorage.getItem("grade_current_earnings").split(" ")[0]);
	//percent controllable * x% + current_status = cutoff
	//percent controllable * x% = cutoff - current_status
	//x% = (cutoff - current_status) / percent controllable //multiply by 100

	//update info box
	document.getElementById("amount_info").innerHTML = ""

	if(percent_controllable < 0.0001)	{
		cuts_off = cuts_off.split(",")
		for(var i = 0; i < cuts_off.length; i++)	{
			var letter_val = cuts_off[i].split("_")[0]
			var x_val = document.createElement('p')
			x_val.innerText = "COURSE COMPLETE"
			x_val.classList.add("cut_off_percent")
			document.getElementById("amount_info").appendChild(x_val)
			var y_val = document.createElement('p')
			y_val.innerText = String(letter_val)
			y_val.classList.add("earn_the_grade")
			document.getElementById("amount_info").appendChild(y_val)
			if(virtual_amounts == "")	{
				virtual_amounts = String(letter_val) + "_COURSE COMPLETE"
			}
			else {
				virtual_amounts += "," + String(letter_val) + "_COURSE COMPLETE"
			}
		}
		localStorage.setItem("cut_off_borders", virtual_amounts)
	}
	else {
		cuts_off = cuts_off.split(",")
		for(var i = 0; i < cuts_off.length; i++)	{
			var letter_val = cuts_off[i].split("_")[0]
			var cut_val = parseFloat(cuts_off[i].split("_")[1])
			var x = (((cut_val - current_status) / percent_controllable) * 100).toFixed(2)
			//come back here
			var x_val = document.createElement('p')
			x_val.innerText = String(x) + " %"
			x_val.classList.add("cut_off_percent")
			document.getElementById("amount_info").appendChild(x_val)
			var y_val = document.createElement('p')
			y_val.innerText = String(letter_val)
			y_val.classList.add("earn_the_grade")
			document.getElementById("amount_info").appendChild(y_val)
			if(virtual_amounts == "")	{
				virtual_amounts = String(letter_val) + "_" + String(x)
			}
			else {
				virtual_amounts += "," + String(letter_val) + "_" + String(x)
			}
		}

		localStorage.setItem("cut_off_borders", virtual_amounts)
	}

	
}

calculate.addEventListener("click", function()	{

	var follow_through = false

	for(var i = 0; i < localStorage.length; i++)	{
		if(localStorage.key(i).includes("category_"))	{
			follow_through = true
		}
	}

	if(!follow_through)	{
		alert("Please create at least one category!")
	}

	var total_points = 0;
	//ensure that all category requirements are filled out
	for(var i = 0; i < localStorage.length; i++)	{
		if(localStorage.key(i).includes("category_"))	{
			var cat_name = localStorage.getItem(localStorage.key(i));	//name of category
			var max_pts = localStorage.getItem(cat_name + "_maxPts")	//max points on each assignment	
			var weight_value = localStorage.getItem(cat_name + "_weight")	//weight value of category
			var num_total = localStorage.getItem(cat_name + "_num_assess")	//number of total assignments

			if((max_pts == null || weight_value == null || num_total == null) && follow_through)	{
				follow_through = false
				alert("Please make sure category weighting, number of assessments and max pts on each assignment are filled out for category " + cat_name)
			}
			else {
				//add weights to determine total points
				total_points += parseFloat(weight_value)
			}
		}
	}
	if(follow_through)	{
		//iterate through the categories
		for(var i = 0; i < localStorage.length; i++)	{
			if(localStorage.key(i).includes("category_"))	{
				//we found a category 
				var cat_name = localStorage.getItem(localStorage.key(i));	//name of category
				var pts_so_far = localStorage.getItem(cat_name + "_donePts");	//string array of pts earned so far
				var max_pts = localStorage.getItem(cat_name + "_maxPts")	//max points on each assignment	
				var weight_value = localStorage.getItem(cat_name + "_weight")	//weight value of category
				var num_total = localStorage.getItem(cat_name + "_num_assess")	//number of total assignments

				//calculate completed_info
				
				if(pts_so_far == null)	{
					var num_done = 0;
				}
				else {
					pts_so_far = pts_so_far.split(",");
					var num_done = pts_so_far.length;
				}
				
				var num_val = String(num_done) + " / " + String(num_total)

				localStorage.setItem(cat_name + "_completed_info", num_val);

				//calculate current_stand
				var total_earned = 0;
				var total_earned_possible = num_done * parseFloat(max_pts);
				if(pts_so_far != null)	{
					for(var j = 0; j < pts_so_far.length; j++)	{
						total_earned += parseFloat(pts_so_far[j])
					}
				}
				if(num_done !== 0)	{
					var current_stand = ((total_earned / total_earned_possible) * 100).toFixed(2);
					var current_val = String(total_earned.toFixed(2)) + " / " + String(total_earned_possible) + " = " + String(current_stand) + " %" 
				}
				else {
					var current_val = "-- / -- = --  %"
				}
				localStorage.setItem(cat_name + "_current_stand", current_val);

				//calculate final stand
				var total_possible = parseInt(num_total) * parseFloat(max_pts);
				var final_stand = ((total_earned / total_possible) * 100).toFixed(2);
				var final_val = String(total_earned.toFixed(2)) + " / " + String(total_possible) + " = " + String(final_stand) + " %"
				localStorage.setItem(cat_name + "_final_stand", final_val);
			}
		}

		//iterate through once again to establish percent weightings

		var incompletes = ""

		for(var i = 0; i < localStorage.length; i++)	{
			if(localStorage.key(i).includes("category_"))	{

				var cat_name = localStorage.getItem(localStorage.key(i));	//name of category
				var pts_so_far = localStorage.getItem(cat_name + "_donePts");	//string array of pts earned so far
				var max_pts = localStorage.getItem(cat_name + "_maxPts")	//max points on each assignment	
				var weight_value = localStorage.getItem(cat_name + "_weight")	//weight value of category
				var num_total = localStorage.getItem(cat_name + "_num_assess")	//number of total assignments

				//establish the incomplete categories
				var completeness = localStorage.getItem(cat_name + "_completed_info");
				if(completeness.split(" / ")[0] !== completeness.split(" / ")[1])	{
					//the category is not yet complete
					if(incompletes == "")	{
						incompletes = cat_name
					}
					else {
						incompletes += "," + cat_name
					}
				}

				//calculate percent_weighting
				var percent_weight = ((parseFloat(weight_value) / total_points) * 100).toFixed(2)

				var percent_weight_val = String(percent_weight) + " %"
				localStorage.setItem(cat_name + "_percent_weighting", percent_weight_val)

				//calculate opportunity_percent
				var numerator = localStorage.getItem(cat_name + "_current_stand")
				var denominator = localStorage.getItem(cat_name + "_final_stand")
				numerator = numerator.split(" =")
				numerator = numerator[0].split(" / ")
				numerator = numerator[1]
				denominator = denominator.split(" =")
				denominator = denominator[0].split(" / ")
				denominator = denominator[1]
				if(numerator == "--")	{
					numerator = 0;
				}
				numerator = parseFloat(numerator)
				denominator = parseFloat(denominator)
				var percent_opportunity = ((numerator / denominator) * percent_weight).toFixed(2)
				var percent_oppor_val = String(percent_opportunity) + " %"
				localStorage.setItem(cat_name + "_opportunity_percent", percent_oppor_val);

				//calculate secured_percent
				var secure_pts = localStorage.getItem(cat_name + "_final_stand")
				secure_pts = secure_pts.split(" =")
				secure_pts = secure_pts[0].split(" / ")
				secure_pts = secure_pts[0]

				var secure_percent = parseFloat(secure_pts) / denominator
				secure_percent = (secure_percent * percent_weight).toFixed(2)
				var secure_val = String(secure_percent) + " %"
				localStorage.setItem(cat_name + "_secured_percent", secure_val);

				//calculate permanent loss
				var loss = (percent_opportunity - secure_percent).toFixed(2)
				loss = String(loss) + " %"
				localStorage.setItem(cat_name + "_loss_percent", loss);
			}
		}
		localStorage.setItem("incompletes", incompletes);
	}

	let val = document.getElementById("categoryContainer").innerText;
	if(val !== "Select a category")	{
		var comp = localStorage.getItem(val + "_completed_info")
		var curr = localStorage.getItem(val + "_current_stand")
		var final = localStorage.getItem(val + "_final_stand")
		var perc = localStorage.getItem(val + "_percent_weighting")
		var oppor = localStorage.getItem(val + "_opportunity_percent")
		var secur = localStorage.getItem(val + "_secured_percent")
		var loss = localStorage.getItem(val + "_loss_percent")

		if((comp != null) && (curr != null) && (final != null) && (perc != null) && (oppor != null) && (secur != null) && (loss != null)) {
			var complete = document.createElement('p')
			complete.innerText = "Total assessments completed: " + comp;
			document.getElementById("completed_info").innerHTML = '';
			document.getElementById("completed_info").appendChild(complete);

			var current = document.createElement('p')
			current.innerText = "Current standing: " + curr;
			document.getElementById("current_stand").innerHTML = '';
			document.getElementById("current_stand").appendChild(current);

			var finale = document.createElement('p')
			finale.innerText = "Final standing: " + final
			document.getElementById("final_stand").innerHTML = '';
			document.getElementById("final_stand").appendChild(finale);

			var percent = document.createElement('p')
			percent.innerText = "Overall percentage weighting: " + perc
			document.getElementById("percent_weighting").innerHTML = '';
			document.getElementById("percent_weighting").appendChild(percent);

			var opportunity = document.createElement('p')
			opportunity.innerText = "You had the opportunity to earn: " + oppor
			document.getElementById("opportunity_percent").innerHTML = '';
			document.getElementById("opportunity_percent").appendChild(opportunity);

			var secured = document.createElement('p')
			secured.innerText = "Secured percentage: " + secur
			document.getElementById("secured_percent").innerHTML = '';
			document.getElementById("secured_percent").appendChild(secured);

			var lost = document.createElement('p')
			lost.innerText = "Permanent loss: " + loss
			document.getElementById("loss_percent").innerHTML = '';
			document.getElementById("loss_percent").appendChild(lost);
		}
	}
	console.log(localStorage);

	if(follow_through)	{
		//OVERALL GRADE ANALYSIS
		var grade_keys = localStorage.getItem("cut_off_values")
		if(grade_keys !== null && grade_keys !== "")	{
			analyze_grade()
		}
		else {
			var answer = window.confirm("Would you like to use the default cut offs?")
			if(answer)	{
				var defaultCutoffs = "A+_97,A_93,A-_90,B+_87,B_83,B-_80,C+_77,C_73,C-_70,D+_67,D_63,D-_60"
				localStorage.setItem("cut_off_values", defaultCutoffs); 
				arrange_grade_buttons_2()
				analyze_grade()
			}
			else {
				alert("Please go and enter your own cut offs")
				follow_through = false
			}
		}
	}

	//establish the sliders
	if(follow_through)	{
		document.getElementById("input_slider_container").innerHTML = ""

		var not_done = localStorage.getItem("incompletes");
		not_done = not_done.split(",")
		for(var i = 0; i < not_done.length; i++)	{
			var slider_div = document.createElement("div")
			slider_div.classList.add("slider_format")
			var slide = document.createElement("input")
			slide.type = "range"
			slide.classList.add("slider")
			slide.min = "0"
			slide.max = "100"
			slider_div.innerText = not_done[i]

			var selector = document.createElement("div");
			// var selectValue = document.createElement("")
			slider_div.appendChild(slide)
			document.getElementById("input_slider_container").appendChild(slider_div)
		}
	}
})

function arrange_grade_buttons_2()	{
	//SHOW CUT OFFS SO FAR
	document.getElementById("cut_offs_container").innerHTML = ""
	var off_cut = localStorage.getItem("cut_off_values")
	if(off_cut === "")	{
		off_cut = null;
		localStorage.removeItem("cut_off_values")
	}
	if(off_cut != null)	{
		var cut_off_nums = off_cut.split(",")
		for(var i = 0; i < cut_off_nums.length; i++)	{
			var pairs = cut_off_nums[i].split("_")
			var title = document.createElement("button")
			title.classList.add("cut_off_button")
			title.innerText = pairs[0] + " >= " + pairs[1]

			title.addEventListener('click', function(e)	{
				if(e.target)	{
					var vals_split = e.target.innerText.split(" >= ")
					var answer = window.confirm("Are you sure you want to delete the cut off " + e.target.innerText)
					var dummy_vals = off_cut.split(",")
					if(answer)	{
						//temporarily remove the item list
						localStorage.removeItem("cut_off_values")
						var new_values = ""
						for(var i = 0; i < dummy_vals.length; i++)	{
							var check_grade = dummy_vals[i].split("_")
							if(check_grade[0] !== vals_split[0] && check_grade[1] !== vals_split[1])	{
								if(new_values === "")	{
									new_values = dummy_vals[i]
								}
								else {
									new_values += "," + dummy_vals[i]
								}
							}
						}
						localStorage.setItem("cut_off_values", new_values)
						console.log(localStorage)
						arrange_grade_buttons_2()
					}
				}
			})
			document.getElementById("cut_offs_container").appendChild(title)
		}
	}
}

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
	//ensure no additional spaces
	var disp = false
	var cont = true

	if(inputField.value !== inputField.value.trim())	{
		cont = false
		alert("Please leave out additional spaces in the beginning or end of input")
		disp = true
	}

	if(inputField.value.includes("  "))	{
		if(!disp)	{
			alert("Please avoid putting more than one space between words!")
			disp = true
		}
		cont = false
	}

	//ensure no blanks
	var string_check = inputField.value.split(" ")
	var pass_through = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass_through == false)	{
			pass_through = true
		}
	}

	if(inputField.value == "")	{
		if(!disp)	{
			alert("Value cannot be blank")
		}
		pass_through = false
	}

	//search for duplicate values first
	var pass = true;
	for(var x = 0; x < localStorage.length; x++)	{
		if(localStorage.getItem(localStorage.key(x)) === inputField.value)	{
			alert(localStorage.getItem(localStorage.key(x)) + " has already been entered!");
			pass = false;
		}
	}

	if (pass && pass_through && cont)	{

		//avoid replacing a previously reserved category key
		var i = 0;
		//search for a free position
		while(localStorage.getItem("category_" + String(i)) != null)	{
			i += 1;
		}
		localStorage.setItem("category_" + String(i), inputField.value);

		console.log(localStorage);
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
						var v1 = text + "_weight"
						var v2 = text + "_num_assess"
						var v3 = text + "_maxPts"
						var v4 = text + "_donePts"
						var v5 = text + "_completed_info"
						var v6 = text + "_current_stand"
						var v7 = text + "_final_stand"
						var v8 = text + "_percent_weighting"
						var v9 = text + "_opportunity_percent"
						var v10 = text + "_secured_percent"
						var v11 = text + "_loss_percent"

						if((value !== text) && (key != v1) && (key != v2) && (key != v3) && (key != v4) && (key != v5) && (key != v6) && (key != v7) && (key != v8) && (key != v9) && (key != v10) && (key != v11))	{
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

					var complete = document.createElement('p')
					complete.innerText = "Total assessments completed: -- / --"
					document.getElementById("completed_info").innerHTML = '';
					document.getElementById("completed_info").appendChild(complete);

					var current = document.createElement('p')
					current.innerText = "Current standing: -- / -- = --  %";
					document.getElementById("current_stand").innerHTML = '';
					document.getElementById("current_stand").appendChild(current);

					var finale = document.createElement('p')
					finale.innerText = "Final standing: -- / -- = -- %"
					document.getElementById("final_stand").innerHTML = '';
					document.getElementById("final_stand").appendChild(finale);

					var percent = document.createElement('p')
					percent.innerText = "Overall percentage weighting: -- %"
					document.getElementById("percent_weighting").innerHTML = '';
					document.getElementById("percent_weighting").appendChild(percent);

					var opportunity = document.createElement('p')
					opportunity.innerText = "You had the opportunity to earn: -- %"
					document.getElementById("opportunity_percent").innerHTML = '';
					document.getElementById("opportunity_percent").appendChild(opportunity);

					var secured = document.createElement('p')
					secured.innerText = "Secured percentage: -- %"
					document.getElementById("secured_percent").innerHTML = '';
					document.getElementById("secured_percent").appendChild(secured);

					var lost = document.createElement('p')
					lost.innerText = "Permanent loss: -- %"
					document.getElementById("loss_percent").innerHTML = '';
					document.getElementById("loss_percent").appendChild(lost);
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

				//display calc_info information
				var comp = localStorage.getItem(e.target.innerText + "_completed_info")
				var curr = localStorage.getItem(e.target.innerText + "_current_stand")
				var final = localStorage.getItem(e.target.innerText + "_final_stand")
				var perc = localStorage.getItem(e.target.innerText + "_percent_weighting")
				var oppor = localStorage.getItem(e.target.innerText + "_opportunity_percent")
				var secur = localStorage.getItem(e.target.innerText + "_secured_percent")
				var loss = localStorage.getItem(e.target.innerText + "_loss_percent")

				if((comp != null) && (curr != null) && (final != null) && (perc != null) && (oppor != null) && (secur != null) && (loss != null)) {
					var complete = document.createElement('p')
					complete.innerText = "Total assessments completed: " + comp;
					document.getElementById("completed_info").innerHTML = '';
					document.getElementById("completed_info").appendChild(complete);

					var current = document.createElement('p')
					current.innerText = "Current standing: " + curr;
					document.getElementById("current_stand").innerHTML = '';
					document.getElementById("current_stand").appendChild(current);

					var finale = document.createElement('p')
					finale.innerText = "Final standing: " + final
					document.getElementById("final_stand").innerHTML = '';
					document.getElementById("final_stand").appendChild(finale);

					var percent = document.createElement('p')
					percent.innerText = "Overall percentage weighting: " + perc
					document.getElementById("percent_weighting").innerHTML = '';
					document.getElementById("percent_weighting").appendChild(percent);

					var opportunity = document.createElement('p')
					opportunity.innerText = "You had the opportunity to earn: " + oppor
					document.getElementById("opportunity_percent").innerHTML = '';
					document.getElementById("opportunity_percent").appendChild(opportunity);

					var secured = document.createElement('p')
					secured.innerText = "Secured percentage: " + secur
					document.getElementById("secured_percent").innerHTML = '';
					document.getElementById("secured_percent").appendChild(secured);

					var lost = document.createElement('p')
					lost.innerText = "Permanent loss: " + loss
					document.getElementById("loss_percent").innerHTML = '';
					document.getElementById("loss_percent").appendChild(lost);
				}
				else {
					var complete = document.createElement('p')
					complete.innerText = "Total assessments completed: -- / --"
					document.getElementById("completed_info").innerHTML = '';
					document.getElementById("completed_info").appendChild(complete);

					var current = document.createElement('p')
					current.innerText = "Current standing: -- / -- = --  %";
					document.getElementById("current_stand").innerHTML = '';
					document.getElementById("current_stand").appendChild(current);

					var finale = document.createElement('p')
					finale.innerText = "Final standing: -- / -- = -- %"
					document.getElementById("final_stand").innerHTML = '';
					document.getElementById("final_stand").appendChild(finale);

					var percent = document.createElement('p')
					percent.innerText = "Overall percentage weighting: -- %"
					document.getElementById("percent_weighting").innerHTML = '';
					document.getElementById("percent_weighting").appendChild(percent);

					var opportunity = document.createElement('p')
					opportunity.innerText = "You had the opportunity to earn: -- %"
					document.getElementById("opportunity_percent").innerHTML = '';
					document.getElementById("opportunity_percent").appendChild(opportunity);

					var secured = document.createElement('p')
					secured.innerText = "Secured percentage: -- %"
					document.getElementById("secured_percent").innerHTML = '';
					document.getElementById("secured_percent").appendChild(secured);

					var lost = document.createElement('p')
					lost.innerText = "Permanent loss: -- %"
					document.getElementById("loss_percent").innerHTML = '';
					document.getElementById("loss_percent").appendChild(lost);
				}
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
	//ensure no additional spaces
	var cont = true

	if(weight.value !== weight.value.trim())	{
		cont = false
	}

	if(weight.value.includes("  "))	{
		cont = false
	}

	var string_check = weight.value.split(" ")
	var pass = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass == false)	{
			pass = true
		}
	}
	
	let val = document.getElementById("categoryContainer").innerText;
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if(!cont)	{
		alert("Please leave out additional spaces in the beginning or end of input")
	}
	else if (localStorage.getItem(document.getElementById("categoryContainer").innerText + "_weight") != null)	{
		alert("Weight already entered!")
	}
	else if (isNaN(weight.value))	{
		alert("Value entered must be a number!")
	}
	else if (!pass)	{
		alert("Value cannot be blank!")
	}
	else if(weight.value === "")	{
		alert("Value cannot be blank!")
	}
	else if (parseFloat(weight.value) < 0)	{
		alert("Weight cannot be negative!")
	}
	else if (parseFloat(weight.value) == 0)	{
		alert("Weight cannot be 0")
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
	//ensure no additional spaces
	var cont = true

	if(num_asses.value !== num_asses.value.trim())	{
		cont = false
	}

	if(num_asses.value.includes("  "))	{
		cont = false
	}

	var string_check = num_asses.value.split(" ")
	var pass = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass == false)	{
			pass = true
		}
	}

	let val = document.getElementById("categoryContainer").innerText;
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if (!cont)	{
		alert("Please leave out additional spaces in the beginning or end of input")
	}
	else if (localStorage.getItem(document.getElementById("categoryContainer").innerText + "_num_assess") != null)	{
		alert("Number of assesments already entered!")
	}
	else if (!Number.isInteger(Number(num_asses.value)))	{
		alert("Value must be an integer!")
	}
	else if (!pass)	{
		alert("Value cannot be blank!")
	}
	else if (parseInt(num_asses.value) < 0)	{
		alert("Number of assessments cannot be negative!")
	}
	else if (parseInt(num_asses.value) == 0)	{
		alert("Number of assessments cannot be 0")
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
	//ensure no additional spaces
	var cont = true

	if(max_pts.value !== max_pts.value.trim())	{
		cont = false
	}

	if(max_pts.value.includes("  "))	{
		cont = false
	}

	var string_check = max_pts.value.split(" ")
	var pass = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass == false)	{
			pass = true
		}
	}

	let val = document.getElementById("categoryContainer").innerText;
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if(!cont)	{
		alert("Please leave out additional spaces in the beginning or end of input")
	}
	else if (localStorage.getItem(document.getElementById("categoryContainer").innerText + "_maxPts") != null)	{
		alert("Max pts already entered!")
	}
	else if (isNaN(max_pts.value))	{
		alert("Value entered must be a number!")
	}
	else if (!pass)	{
		alert("Value cannot be blank!")
	}
	else if(max_pts.value === "")	{
		alert("Value cannot be blank!")
	}
	else if (parseFloat(max_pts.value) < 0)	{
		alert("Max pts cannot be negative!")
	}
	else if (parseFloat(max_pts.value) == 0)	{
		alert("Max pts cannot be 0")
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
	//ensure no additional spaces
	var cont = true

	if(asses_done.value !== asses_done.value.trim())	{
		cont = false
	}

	if(asses_done.value.includes("  "))	{
		cont = false
	}

	var string_check = asses_done.value.split(" ")
	var pass = false
	for(var x = 0; x < string_check.length; x++)	{
		if(string_check[x] != "" && pass == false)	{
			pass = true
		}
	}

	let val = document.getElementById("categoryContainer").innerText;
	let weight_val = localStorage.getItem(val + "_weight");
	let num = localStorage.getItem(val + "_num_assess");
	let max = localStorage.getItem(val + "_maxPts");
	if(val === "Select a category")	{
		alert("Please select a category")
	}
	else if (!cont)	{
		alert("Please leave out additional spaces in the beginning or end of input")
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
	else if (!pass)	{
		alert("Value cannot be blank!")
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
