

/**
 * Create the elements needed to accept the message to be
 * encrypted
 */
var encryptDiv = document.createElement("div");

var iText = document.createElement("p");
iText.innerHTML = "Enter your message below";
encryptDiv.append(iText);

var i = document.createElement("input");
encryptDiv.append(i);

var kText = document.createElement("p");
kText.innerHTML = "Enter your 8 bit binary key below";
encryptDiv.append(kText);

var k = document.createElement("input");
encryptDiv.append(k);

var bHolder = document.createElement("p");
var b = document.createElement("button");
b.id = "encrypt";
b.innerHTML = "submit";
bHolder.append(b);

encryptDiv.style.backgroundColor = "yellow";

encryptDiv.append(bHolder);

document.body.append(encryptDiv);

//create a holder to display the encrypted message

var encryptedMSGHolder = document.createElement("div");
//encryptedMSGHolder.innerHTML = "testing";
encryptedMSGHolder.style.backgroundColor = "pink";
document.body.append(encryptedMSGHolder);

//apply the action listener to encrypt the message
//b.value = "encrypt";
b.addEventListener("click", applyKey);

var hr = document.createElement("hr");
document.body.append(hr);

/**
 * Create the elements needed to accept the encrypted message 
 * and decrypt it
 */
 var decryptDiv = document.createElement("div");

var eText = document.createElement("p");
eText.innerHTML = "Enter your encrypted message below";
decryptDiv.append(eText);

var encryptedInput = document.createElement("input");
decryptDiv.append(encryptedInput);

var kText2 = document.createElement("p");
kText2.innerHTML = "Enter your 8 bit binary key below";
decryptDiv.append(kText2);

var k2 = document.createElement("input");
decryptDiv.append(k2);

var bHolder2 = document.createElement("p");
var b2 = document.createElement("button");
b2.id = "decrypt";
b2.innerHTML = "submit";
bHolder2.append(b2);

decryptDiv.append(bHolder2);

decryptDiv.style.backgroundColor = "yellow";

document.body.append(decryptDiv);

//create a holder to display the dcrypted message

var decryptedMSGHolder = document.createElement("div");
//decryptedMSGHolder.innerHTML = "testing";
decryptedMSGHolder.style.backgroundColor = "pink";
document.body.append(decryptedMSGHolder);

//b2.value = "decrypt";
b2.addEventListener("click", decryptMSG);

function decryptMSG(e){
    decryptedMSGHolder.innerHTML = convertMSG(applyKey(e));
}

function msgToASCII(m){
    
    var msg = m.toUpperCase();
    var msgASCII = "";
    for(var j = 0; j < msg.length;j++){

        msgASCII += ASCIIToBin(msg.charCodeAt(j));
    }
    return msgASCII;
}


function ASCIIToBin(m){
    var mNum = Number(m);
    var bin = "";

    if(mNum == 32){
        return "00100000";//code for space
    }else{

        while(mNum > 0){
            bin = (mNum%2) + bin;
            mNum = Math.floor(mNum/2);
        }
    }
    return "0" + bin;
}

function applyKey(e){ 
    var key;
    if(e.target.id == "encrypt"){
        key = k.value;//assume 8 bit encryption
    }else{
        key = k2.value;
    }
    var msg = "";
    if(e.target.id == "encrypt"){
        msg = msgToASCII(i.value);
    }else{
        msg = encryptedInput.value;
    }

    var encryptedMSG = "";

    for(var j = 0; j < msg.length; j+=key.length){
        var c = msg.substring(j, j + key.length);
        for(m = 0; m < key.length; m++){
            if(c.substring(m, m+1) == key.substring(m, m+1)){
                encryptedMSG += 1;
            }else{
                encryptedMSG += 0;
            }
        }
    }
    encryptedMSGHolder.innerHTML = encryptedMSG;
    return encryptedMSG;
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