var fs = require('fs');
var hits={};
var countryContinentMap ={};
fs.readFileSync("includes/Countries-Continents.csv").toString().split('\n').forEach(function (lineContent) {
	var rowDataArray = lineContent.split(",");
	var continent = rowDataArray[0];
	var country = rowDataArray[1];

	if(hits[continent]){
		countryContinentMap[continent].push(country);
	}else{
		hits[continent]= true;
		countryContinentMap[continent] = [country];
	}

});

delete countryContinentMap["Continent"];
delete countryContinentMap[""];

var arableland_India ={};
var africanCountries = countryContinentMap["Africa"];
var arableland_Africa = [];
var INDICATORS = ["Arable land (% of land area)", "Arable land (hectares per person)" , "Arable land (hectares)" ];

fs.readFileSync("includes/WDI_Data.csv").toString().split('\n').forEach(function (lineContent) {

	var rowDataArray = lineContent.split(",");
	var indicatorName = rowDataArray[2];
	var countryName = rowDataArray[0];

	if((INDICATORS.indexOf(indicatorName) != -1) && (countryName === "India") ){
		var array =[];
		for (var year = 1960, index=4; year <= 2015; year++, index++) {
			var obj={};
			obj["year"] = year;
			obj["landAreaPercentage"] = +rowDataArray[index];
		
			array.push(obj);
		};
		arableland_India[indicatorName] = array;
	}

	if( (africanCountries.indexOf(countryName) != -1) && (indicatorName == "Arable land (% of land area)") ){
		var obj = {};
		obj["country"] = countryName;
		obj["landAreaPercentage"] = +rowDataArray[rowDataArray.length-6];
	
		arableland_Africa.push(obj);
	}

});

fs.writeFile('includes/arableland_India.json', JSON.stringify(arableland_India), function (err) {
  if (err) throw err;

  console.log("Successfully generated Arable land for India json file.");
});

fs.writeFile('includes/arableland_Africa_2010.json', JSON.stringify(arableland_Africa), function (err) {
  if (err) throw err;

  console.log("Successfully generated Arable land for Africa in 2010 json file.");
});

// Free some memory
arableland_India = null;
arableland_Africa = null;
africanCountries = null;
INDICATORS = null;

function getContinent(countryName){
	var keys = Object.keys(countryContinentMap);

	for (var i = 0,len=keys.length; i < len; i++) {
		if(countryContinentMap[keys[i]].indexOf(countryName) > -1){
			return keys[i];
		}
	};

}

var totalArablelandAcrossContinents = {};

fs.readFileSync("includes/WDI_Data.csv").toString().split('\n').forEach(function (lineContent) {

	var rowDataArray = lineContent.split(",");
	var indicatorName = rowDataArray[2];
	var countryName = rowDataArray[0];

	var continent = getContinent(countryName);
	if( (continent !== undefined) &&  (indicatorName == "Arable land (hectares)")){

		for (var year = 1960, index=4; year <= 2015; year++, index++) {
				
				var record = totalArablelandAcrossContinents[year];

				if(record){
					var continentValue = +record[continent] || 0;
					var value = +rowDataArray[index] || 0;
					record[continent] = continentValue + value;
				}else{
					var obj={};
					obj["year"] = year;
					obj[continent] = +rowDataArray[index] ||  0;
					totalArablelandAcrossContinents[year]= obj;
				}
			}
	}
});

//data format change to suite for D3 graphs
var arablelandAcrossContinentsData= [];
var keys = Object.keys(totalArablelandAcrossContinents);

for (var i =0 ,len= keys.length ; i < len; i++) {
	
	arablelandAcrossContinentsData.push(totalArablelandAcrossContinents[keys[i]]);
};


fs.writeFile('includes/arableland_Aggregated_Continent.json', JSON.stringify(arablelandAcrossContinentsData), function (err) {
  if (err) throw err;

  console.log("Successfully generated Arable land (hectares) aggregated by continent json file.");
});