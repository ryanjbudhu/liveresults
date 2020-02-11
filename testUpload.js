const url = "/saveJSON.php";
var emptydata = {};
var sessionEventName = "Women 5k Run CC";
var sessionHeatNumber = "1";
var scoreList1 = { username: 'example' };
const scoreList = {"1":["","1","34","Morgen Caution","Bridgeport","","","","","1","","","","",""],"2":["","2","237","Nicole Imbrogno","Liu Post","","","","","1","","","","",""],"3":["","3","401","Camryn Podgorski","Pace","","","","","1","","","","",""],"4":["","4","170","Shayla Morales","Felician","","","","","1","","","","",""],"5":["","5","338","Sarah Newgarden","Mt. St. Vincent","","","","","1","","","","",""],"6":["","6","655","MaryKate Bailey","Tcnj","","","","","1","","","","",""],"7":["","7","561","Alex Ehrhart","St. Joseph's (L.I.)","","","","","1","","","","",""],"8":["","8","279","Dominique Charles","Medgar Evers","","","","","1","","","","",""],"9":["","9","340","Kate Stack","Mt. St. Vincent","","","","","1","","","","",""],"10":["","10","387","irene Chepleting","Nyit","","","","","1","","","","",""],"11":["","11","350","Annaliza Lagman","New Jersey City","","","","","1","","","","",""],"12":["","12","336","Maiya Foster-Daniels","Mt. St. Vincent","","","","","1","","","","",""],"13":["","13","109","Emily Rosales","Drew","","","","","1","","","","",""],"14":["","14","424","Iuliia Zhukova","Pratt Institute","","","","","1","","","","",""],"15":["","15","563","Cassidy Jacobus","St. Joseph's (L.I.)","","","","","1","","","","",""],"16":["","16","722","Emely Cuevas","York (N.Y.)","","","","","1","","","","",""],"17":["","17","168","Kayla Hightower","Felician","","","","","1","","","","",""],"18":["","18","567","Jennifer O'Connor","St. Joseph's (L.I.)","","","","","1","","","","",""],"19":["","19","261","Brenna Ruhnke","Lock Haven","","","","","1","","","","",""],"20":["","20","81","junior cassidy","Centenary","","","","","1","","","","",""],"21":["","21","592","Joanna Castaneda","St. Peter's","","","","","1","","","","",""],"22":["","22","370","Sarah Morgan","New Jersey Institute","","","","","1","","","","",""],"23":["","23","68","Frieja White","Ccny","","","","","1","","","","",""],"24":["","24","166","Jane Burgoyne","Felician","","","","","1","","","","",""],"25":["","25","236","Kathryn Elnick","Liu Post","","","","","1","","","","",""],"26":["","26","400","Christina Jeroloman","Pace","","","","","1","","","","",""],"27":["","27","332","Ariana Bolourchi","Mt. St. Vincent","","","","","1","","","","",""],"28":["","28","500","Gabrielle Vega","Seton Hall","","","","","1","","","","",""],"29":["","29","22","Delilah Glasper","Berkeley College NJ","","","","","1","","","","",""],"30":["","30","642","Jolisa Wright","Staten Island","","","","","1","","","","",""],"31":["","31","557","Julia Boris","St. Joseph's (L.I.)","","","","","1","","","","",""],"32":["","32","664","Lauren Murphy","Tcnj","","","","","1","","","","",""],"33":["","33","348","ZoeNicole Copeland","New Jersey City","","","","","1","","","","",""],"34":["","34","185","Elizabeth Morriseau","Fordham","","","","","1","","","","",""],"35":["","35","660","Emily Forester","Tcnj","","","","","1","","","","",""],"36":["","36","171","Jillian O'Brien","Felician","","","","","1","","","","",""],"37":["","37","258","Ally Lame","Lock Haven","","","","","1","","","","",""],"38":["","38","37","Kayla Hill","Bridgeport","","","","","1","","","","",""],"39":["","39","238","Margaret McKeever","Liu Post","","","","","1","","","","",""],"40":["","40","637","Deavion Brown","Staten Island","","","","","1","","","","",""],"41":["","41","187","Jessica Walker-Corbett","Fordham","","","","","1","","","","",""],"42":["","42","53","Alysha Ramos","Caldwell","","","","","1","","","","",""],"43":["","43","367","Allison Guajala","New Jersey Institute","","","","","1","","","","",""],"44":["","44","326","Allison Supino","Montclair State","","","","","1","","","","",""],"45":["","45","106","Arya Bondre","Drew","","","","","1","","","","",""],"46":["","46","490","Kiley Britten","Seton Hall","","","","","1","","","","",""],"47":["","47","341","Patricia Umana","Mt. St. Vincent","","","","","1","","","","",""],"48":["","48","413","Lisa Barber","Pratt Institute","","","","","1","","","","",""],"49":["","49","501","Meghan Vizzard","Seton Hall","","","","","1","","","","",""],"50":["","50","582","Tamarre Phajou","St. Joseph's College (Bklyn)","","","","","1","","","","",""]};
//console.log(JSON.stringify(JSON.stringify(scoreList)));
//$('body').html(JSON.stringify(scoreList1));

/*,function (data) {
	console.log(data);
	$('body').html(data);
},'json');*/

updateFile(emptydata);

async function updateFile(oldScoreList) {
		const url = './saveJSON.php';
		if(oldScoreList!=scoreList){
			$.post(url, {"data" : JSON.stringify(scoreList),'event' : sessionEventName,
			'heat' : sessionHeatNumber},
			function (recv) {
				console.log(JSON.parse(recv));
			});
		}
	}

/*

async function updateFile(oldScoreList) {
		const url = './saveJSON.php';
		if (oldScoreList!=scoreList) {
			const data = {'data' : JSON.stringify(scoreList),
							'event' : sessionEventName,
							'heat' : sessionHeatNumber
			};
			//console.log(JSON.stringify(data));

			try {
				const response = await fetch(url, {
					method: 'POST', // or 'PUT'
					body: JSON.stringify(data), // data can be `string` or {object}!
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const json = await response;//.json();
				console.log('Success:', JSON.stringify(json));
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}*/