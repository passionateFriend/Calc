var str = "";
var operand;
var operator;
var preVal;
//var flag = false;
var bleep=new Audio("http://www.soundjay.com/button/button-29.wav");d
function isOperator(val) {
  return (val === '+' || val === '-' || val === '*' || val === '/') ? true : false;
}
function clear() {
  str = "";
  operand = undefined;
  operator = undefined;
  preVal = undefined;
}
function calc() {
  var res;
  switch(operator) {
    case '+': res = operand + parseFloat(str);
                    break;
    case '-': res = operand - parseFloat(str);
              break;
    case '*': res = operand * parseFloat(str);
              break;
    case '/': res = operand / parseFloat(str);
              break;
  }
  return res;
}
function myFunc(val) {
  bleep.play();
  //console.log("str: " + str + "operand: " + operand + "operator: " + operator + "preVal: " + preVal);
  if(isOperator(preVal)) {
    str = "";
    //console.log("Entered here");
  }
  if(!isNaN(val) || val === '.' ) {
    document.getElementById("C").disabled = false;
    str += val;
    document.getElementById('tf').value = str;
  }
  else if(val === 'C' && str !== '') {
      str = str.slice(0, -1);
      document.getElementById('tf').value = str;
  }
  else if(val === 'CLR') {
    document.getElementById('tf').value = "";
    clear();
    return;
  }
  else if(val === '=') {
    if(isOperator(preVal)) {
      document.getElementById('tf').value = "SYNTAX ERROR";
      clear();
    }
    else if((preVal === '=' || preVal === 'C' || !isNaN(preVal)) && operator === undefined) {
          val = preVal;
    }
    else {
      var res = calc();
      //console.log("res: " + res);
      str = "" + res;
      operand = res;
      operator = undefined;
      document.getElementById('tf').value = str;
    }

  }
  else if(isOperator(val)) {
    document.getElementById("C").disabled = true;
    if(preVal === undefined || isOperator(preVal)) {
      //console.log("Entered here");
      clear();
      document.getElementById('tf').value = "SYNTAX ERROR";
      return;
    }
    if(operator === undefined) {
      operand = parseFloat(str);
      str = "";
      operator = val;
    }
    else {
      var res = calc();
      //console.log("res: " + res);
      str = "" + res;
      operand = res;
      document.getElementById('tf').value = str;
      operator = val;
    }
  }
  preVal = val;
}
