/**
 * Creates and styles elements
 */
document.body.style.backgroundColor = "black";
document.body.style.fontFamily = "Arial, sans-serif";
 var header = document.createElement("div");
 header.style.backgroundColor = "#00ADBC";
 header.style.padding = ".5em";
 var title = document.createElement("h1");
 title.innerHTML = "XOR Cipher Cracker";
 header.append(title);
 document.body.append(header);
 
 /**
  * Create the elements needed to accept the encrypted message 
  * and decrypt it
  */
var decryptDiv = document.createElement("div");
 
var eText = document.createElement("p");
eText.innerHTML = "Enter your encrypted message below";
decryptDiv.append(eText);
 
var encryptedInput = document.createElement("input");
encryptedInput.style.width = "50%";
decryptDiv.append(encryptedInput);
 
var kText2 = document.createElement("p");
kText2.innerHTML = "Enter your 8 bit binary key below.  <br>If you do not know the key leave this blank and let the XOR cracker do the work!";
decryptDiv.append(kText2);
 
var k2 = document.createElement("input");
//k2.style.width = "50%";
decryptDiv.append(k2);
 
var bHolder2 = document.createElement("p");
var b2 = document.createElement("button");
b2.id = "decrypt";
b2.innerHTML = "submit";
bHolder2.append(b2);
 
decryptDiv.append(bHolder2);
 
decryptDiv.style.backgroundColor = "yellow";
decryptDiv.style.padding = ".5em";
 
document.body.append(decryptDiv);
 
//create a holder to display the dcrypted message
 
 var decryptedMSGHolder = document.createElement("div");
 decryptedMSGHolder.innerHTML = "DECODED MESSAGE";
 decryptedMSGHolder.style.backgroundColor = "pink";
 decryptedMSGHolder.style.padding = "0.5em";
 document.body.append(decryptedMSGHolder);

 //Create a holder to display possibilities
 var outputDiv = document.createElement("div");
outputDiv.style.backgroundColor = "white";
outputDiv.style.padding = ".5em";
document.body.append(outputDiv);
 
 //b2.value = "decrypt";
 b2.addEventListener("click", decryptMSG);
 
 function decryptMSG(e){
     var k;
     if(k2.value != ""){
        k = k2.value;
        decryptedMSGHolder.innerHTML = convertMSG(applyKey(k));
     }else{
         //we want to generate all the possible messages for a given key
         var output = "Below is the output for all possible 8 bit keys<br><br>";
         for(var i = 0; i < 256;i++){
            k = makeKey(i);
            output += k + " == " + convertMSG(applyKey(k)) + "<br>"; 
            
         }
         outputDiv.innerHTML = output;
         
     }
 }
 
 function makeKey(n){
    var bin = "";
    while(n > 0){
        bin = (n%2) + bin;
        n = Math.floor(n/2);
        
    }
    var binLength = bin.length;
    var formattedKey = "";
    for(var i = 0; i < 8 - binLength; i++){
        formattedKey += "0";
    }
    formattedKey += bin;
 return formattedKey;
 }
 
 function applyKey(e){ 
    var key = e;
    var msg = "";
    msg = encryptedInput.value;
     
    var decryptedMSG = "";
 
    for(var j = 0; j < msg.length; j+=key.length){
         var c = msg.substring(j, j + key.length);
         for(m = 0; m < key.length; m++){
             if(c.substring(m, m+1) == key.substring(m, m+1)){
                 decryptedMSG += 1;
             }else{
                 decryptedMSG += 0;
             }
         }
    }
     return decryptedMSG;
 }
 
 
 /**
  * Creates an array which stores the alphabet in all caps
  */
 var alphabet = [];
 makeAlphabetArray();
 
 function makeAlphabetArray(){
 
     for(var i = 65; i < 91;i++){
         alphabet[i-65] = String.fromCharCode(i);
     }
 }
 
 /**
  * Converts a binary message to char 
  * @param {} e 
  */
 function convertMSG(m){
     var secretMSG = "";
     var binMessage = m;
 
     for(var c = 0; c < binMessage.length; c+=8){
         var binNum = Number(binMessage.substring(c, c + 8));
         var e = 0;
         var decNum = 0;
         while(binNum > 0){
             var binPower = Math.pow(2,e);
             var lastDigit = binNum%10;
             var theValue = binPower * lastDigit;
             decNum += theValue;
             e++;
             binNum = Math.floor(binNum/10);
         }
         if(decNum == 32){
             secretMSG += " ";
         }else{
             secretMSG += alphabet[decNum - 65];
         }
         decNum = 0;
         e = 0;
     }
     return secretMSG;
 
 }