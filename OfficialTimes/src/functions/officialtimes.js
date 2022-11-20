var globalimporteddata;
var globalwcaid;






function toMS(str) {
  if(!str.includes(":")) {
     var toreturn = parseFloat(str) * 100;
	 return toreturn;
  } else {
	  var [mins, secms] = str.split(":");
	  var [sec, ms] = secms.split(".");
	  return ((+mins * 60) + +sec) * 100 + +ms ;
  }
}

function loadwcaid() {
	//globalwcaid = document.getElementById('wcaLogin').firstChild.firstChild.innerHTML.slice(32,42);
	
	
	globalwcaid = document.getElementById('rawwcaid').value;
	
	fetchdata();
	
	
	
}

function highlighttimes() {

	timeslist = document.getElementsByClassName("myscroll");

	alltimes = timeslist[0].firstChild.firstChild.rows;

	var ScrambleDiv = document.getElementById('scrambleDiv').firstChild.firstChild;
	var ScrambleCategory = ScrambleDiv.getElementsByTagName('select')[0].value;
	var ScrambleEvent = ScrambleDiv.getElementsByTagName('select')[1].value;
	
	
	switch(ScrambleEvent) {
		case '222so':
			ScrambleEvent = '222';
		break;
		case '333':
			ScrambleEvent = '333';
		break;
		case '444wca':
			ScrambleEvent = '444';
		break;
		case '555wca':
			ScrambleEvent = '555';
		break;
		case '666wca':
			ScrambleEvent = '666';
		break;
		case '777wca':
			ScrambleEvent = '777';
		break;
		case '333ni':
			ScrambleEvent = '333bf';
		break;
		case '333fm':
			ScrambleEvent = '333fm';
		break;
		case '333oh':
			ScrambleEvent = '333oh';
		break;
		case 'clkwca':
			ScrambleEvent = 'clock';
		break;
		case 'mgmp':
			ScrambleEvent = 'minx';
		break;
		case 'pyrso':
			ScrambleEvent = 'pyram';
		break;
		case 'skbso':
			ScrambleEvent = 'skewb';
		break;
		case 'sqrs':
			ScrambleEvent = 'sq1';
		break;
		case '444bld':
			ScrambleEvent = '444bf';
		break;
		case '555bld':
			ScrambleEvent = '555bf';
		break;
	}
	
	//Check if Scramble is set to "WCA" and that the WCA ID attatched has official results for selected scramble
	if ((ScrambleCategory == 0) && globalimporteddata['personal_records'].hasOwnProperty(ScrambleEvent)){
		//for all times in sidebar, highlight green times faster than official records
		for (let item of alltimes) {
			if (typeof item !== "undefined" && item.innerHTML.includes("times")) {
				//Single
				if (typeof item.childNodes[1] !== "undefined"){
				item.childNodes[1].style.backgroundColor = "rgba(0,255,0,0)";
				}
				if (typeof item.childNodes[1] !== "undefined" && typeof globalimporteddata['personal_records'][ScrambleEvent]['single'] !== "undefined" && toMS(item.childNodes[1].innerHTML) < globalimporteddata['personal_records'][ScrambleEvent]['single']['best']){
					item.childNodes[1].style.backgroundColor = "rgba(0,255,0,0.4)";
				}
				//Average
				if (typeof item.childNodes[2] !== "undefined"){
				item.childNodes[2].style.backgroundColor = "rgba(0,255,0,0)";
				}
				if (typeof item.childNodes[2] !== "undefined" && typeof globalimporteddata['personal_records'][ScrambleEvent]['average'] !== "undefined" && toMS(item.childNodes[2].innerHTML) < globalimporteddata['personal_records'][ScrambleEvent]['average']['best']){
					item.childNodes[2].style.backgroundColor = "rgba(0,255,0,0.4)";
				}
			}
		}
	} else {
		document.getElementById("rawwcaid").placeholder = "Invalid Session Scramble";
	}
}

function checkEnter(ele){
	if(event.key === 'Enter') {
        loadwcaid();        
    }
}

function fetchdata() {

	//Grab data from WCA related to 
	fetch('https://www.worldcubeassociation.org/api/v0/persons/' + globalwcaid)
  .then((response) => response.json())
  .then((data) => globalimporteddata = data)
  .then((data) => document.getElementById("rawwcaid").value = "")
  .then((data) => document.getElementById("rawwcaid").placeholder = "WCA id Loaded")
  .then((data) => highlighttimes())
  .catch(function(){
      console.log('404 Not Found');
	  document.getElementById("rawwcaid").value = "";
	  document.getElementById("rawwcaid").placeholder = "Invalid WCA id";
    });
  
}

function insertSetting() {

//optionsInsert = document.getElementsByClassName('opttable')[0].firstChild;

//optionsInsert.innerHTML += '<tr><td colspan="2">Official Times Integration:  <input type="text" id="rawwcaid" style="width: auto;"></input><input type="Submit" name="LoadWCAid" value="load WCA ID" onclick="loadwcaid()"><p id="idcheck">0000XXXX00</p></td><td class="sr"></td></tr>';
 //document.getElementsByClassName('statc')[0].outerHTML += '<div><input type="text" id="rawwcaid" style="width: auto;" placeholder="Enter WCA ID"  onkeydown="checkEnter(this)"></input><span class="click" onclick="loadwcaid()"> Load </span></div>';
 //document.getElementById('timer').innerHTML += '<div style="position: absolute; bottom: 0; left: 50%;z-index: 50; transform: translateX(-50%);"><input type="text" id="rawwcaid" style="width: auto;" placeholder="Enter WCA ID"  onkeydown="checkEnter(this)"></input><span class="click" onclick="loadwcaid()"> Load </span></div>';
 document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',  '<div style="position: absolute; bottom: 0; left: 50%;z-index: 50; transform: translateX(-50%);"><input type="text" id="rawwcaid" style="width: auto;" placeholder="Enter WCA ID"  onkeydown="checkEnter(this)"></input><span class="click" onclick="loadwcaid()"> Load </span></div>');

}


timeslist = document.getElementsByClassName("myscroll");
alltimes = timeslist[0].firstChild.firstChild.rows;

// Select the node that will be observed for mutations
const targetNode = timeslist[0].firstChild.firstChild;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
		highlighttimes();
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);


insertSetting();
