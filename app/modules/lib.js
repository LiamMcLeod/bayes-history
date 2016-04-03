    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
    Array.prototype.isEmpty = function(){if(this.length===0) {return true;}else{return false;}};

function emboldenTerm(input, term) {return input.replace(new RegExp('(^|\)(' + term + ')(\|$)','ig'), '$1<strong>$2</strong>$3');}

// function dateToYear(y){return y.substring(0,4);}

function shortenString(x, amount){if (x.length>amount&& x.charAt(amount-1) != "?"){x= x.substring(0, amount);x+="...";}return x}

function isInt(x) {return !isNaN(x) && parseInt(Number(x)) == x &&!isNaN(parseInt(x, 10));}

function removeTags(x){return x.replace(/<(?:.|\n)*?>/gm, '');}

function escapeSquare(x){x = x.replace(new RegExp('\\['), '\\[');x = x.replace(new RegExp('\\]'), '\\]');return x;}

function rnd(){
    //TODO Adjust for each BG
    var x = Math.floor((Math.random() * 10) + 1);
    while(x>3){
        x=Math.floor((Math.random() * 10) + 1);
    }
    return x;
}
exports.emboldenTerm = emboldenTerm;
exports.shortenString = shortenString;
exports.isInt = isInt;
exports.removeTags =  removeTags;
exports.escapeSquare =  escapeSquare;
exports.rnd = rnd;

exports.Array =  Array;
exports.String = String;