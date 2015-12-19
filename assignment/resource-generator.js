var fs = require('fs');
var lineReader = require('readline');
//var filePath = "includes/India2011.csv";
//var hits=[];
var outputArray=[];

/*
fs.readFileSync(filePath).toString().split('\n').forEach(function (lineContent) { 
  var rowDataArray = lineContent.split(",");
   
   if(!hits[rowDataArray[3]]){
    
    var tempArray = {};
    
    tempArray["areaName"]= rowDataArray[3];
    tempArray["illiterateMales" ]= rowDataArray[10];
    tempArray["illiterateFemales" ]= rowDataArray[11];
    tempArray["literaMales"]= rowDataArray[13];
    tempArray["literateFemales"]= rowDataArray[14];
    
    outputArray.push(tempArray);

    hits[rowDataArray[3]] = true;
   } 
});

//removes the first item of an array
outputArray.shift();

//removes the last item of an array
outputArray.pop();
*/

function getRecordByName( areaName , outputArray){
  var record;
  outputArray.forEach(function (item, index, array) {
    
    if(item.areaName === areaName){
      record = item;
    }
  });
   return record;
}

function updateDataFromFile(filePath , outputArray){

  var hits=[];

  fs.readFileSync(filePath).toString().split('\n').forEach(function (lineContent) { 
    var rowDataArray = lineContent.split(",");

    if(!hits[rowDataArray[3]]){
      var record = getRecordByName(rowDataArray[3] , outputArray);

      if(record){
      
        record.illiterateMales= +record.illiterateMales + +rowDataArray[10];
        record.illiterateFemales= +record.illiterateFemales + +rowDataArray[11];
        record.literateMales= +record.literateMales + +rowDataArray[13];
        record.literateFemales= +record.literateFemales + +rowDataArray[14];

        hits[rowDataArray[3]] = true;
        
      }else{
        var tempArray = {};
        
        tempArray["areaName"]= rowDataArray[3];
        tempArray["illiterateMales" ]= rowDataArray[10];
        tempArray["illiterateFemales" ]= rowDataArray[11];
        tempArray["literateMales"]= rowDataArray[13];
        tempArray["literateFemales"]= rowDataArray[14];
        
        outputArray.push(tempArray);

        hits[rowDataArray[3]] = true;
      }
    }
  });

}
updateDataFromFile("includes/India2011.csv" , outputArray);

updateDataFromFile("includes/IndiaSC2011.csv" , outputArray);

updateDataFromFile("includes/IndiaST2011.csv" , outputArray);

//removes the first item of an array
outputArray.shift();

//removes the last item of an array
outputArray.pop();

var data = JSON.stringify(outputArray);

fs.writeFile('resource.json', data, function (err) {
  if (err) throw err;
  console.log("Successfuilly generated resource file.");
});

