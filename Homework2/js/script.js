let textbox = "";
let beforeOperator = true;


let equation = {
    'firstValue': 0.0,
    'secondValue': 0.0,
    operator: 'notset'
};


function evaluateEquation() {
    if (equation.operator == "+") {
        return equation.firstValue + equation.secondValue;
    }
    if (equation.operator == "-") {
        return equation.firstValue - equation.secondValue;
    }
    if (equation.operator == "*") {
        return equation.firstValue * equation.secondValue;
    }
    if (equation.operator == "X") {
        return equation.firstValue * equation.secondValue;
    }
    if (equation.operator == "x") {
        return equation.firstValue * equation.secondValue;
    }
    if (equation.operator == "/") {
        return equation.firstValue / equation.secondValue;
    }
}
document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#zero");
    btn.addEventListener('click', (e) => {
        textbox += "0";
        
        document.querySelector("#textbox").innerHTML = textbox;
        
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#one");
    btn.addEventListener('click', (e) => {
        textbox += "1";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#two");
    btn.addEventListener('click', (e) => {
        textbox += "2";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#three");
    btn.addEventListener('click', (e) => {
        textbox += "3";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#four");
    btn.addEventListener('click', (e) => {
        textbox += "4";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#five");
    btn.addEventListener('click', (e) => {
        textbox += "5";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#six");
    btn.addEventListener('click', (e) => {
        textbox += "6";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#seven");
    btn.addEventListener('click', (e) => {
        textbox += "7";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#eight");
    btn.addEventListener('click', (e) => {
        textbox += "8";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#nine");
    btn.addEventListener('click', (e) => {
        textbox += "9";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#decimal");
    btn.addEventListener('click', (e) => {
        textbox += ".";
        
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#plussign");
    btn.addEventListener('click', (e) => {
       

        if (beforeOperator) {
            equation.firstValue = parseFloat(textbox);
            beforeOperator = false;
            textbox= "";
        }
        
        
        else if (!beforeOperator) {
                
            equation.secondValue = parseFloat(textbox);
            beforeOperator = true;
            textbox = evaluateEquation();
                
                

                
            item = document.createElement('p');
            item.innerHTML = textbox;
            document.querySelector("#historyList").appendChild(item);
            equation.firstValue = equation.secondValue;
            textbox = "";
            document.querySelector("#textbox").innerHTML = textbox;

                
                
        }
           
            
        equation.operator = "+";
        document.querySelector("#textbox").innerHTML = textbox;
        //++operatorCount;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#minussign");
    btn.addEventListener('click', (e) => {
        if (beforeOperator) {
            equation.firstValue = parseFloat(textbox);
            beforeOperator = false;
            textbox= "";
        }
        
        
        else if (!beforeOperator) {
                
            equation.secondValue = parseFloat(textbox);
            beforeOperator = true;
            textbox = evaluateEquation();
                
                

                
            item = document.createElement('li');
            item.innerHTML = textbox;
            document.querySelector("#historyList").appendChild(item);
            equation.firstValue = equation.secondValue;
            textbox = "";
            document.querySelector("#textbox").innerHTML = textbox;

                
                
        }
           
            
        equation.operator = "-";
        document.querySelector("#textbox").innerHTML = textbox;
        //++operatorCount;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#Xsign");
    btn.addEventListener('click', (e) => {
        if (beforeOperator) {
            equation.firstValue = parseFloat(textbox);
            beforeOperator = false;
            textbox= "";
        }
        
        
        else if (!beforeOperator) {
                
            equation.secondValue = parseFloat(textbox);
            beforeOperator = true;
            textbox = evaluateEquation();
                
                

                
            item = document.createElement('li');
            item.innerHTML = textbox;
            document.querySelector("#historyList").appendChild(item);
            equation.firstValue = equation.secondValue;
            textbox = "";
            document.querySelector("#textbox").innerHTML = textbox;

                
                
        }
           
            
        equation.operator = "*";
        document.querySelector("#textbox").innerHTML = textbox;
       // ++operatorCount;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#slash");
    btn.addEventListener('click', (e) => {
        if (beforeOperator) {
            equation.firstValue = parseFloat(textbox);
            beforeOperator = false;
            textbox= "";
        }
        
        
        else if (!beforeOperator) {
                
            equation.secondValue = parseFloat(textbox);
            beforeOperator = true;
            textbox = evaluateEquation();
                
                

                
            item = document.createElement('li');
            item.innerHTML = textbox;
            document.querySelector("#historyList").appendChild(item);
            equation.firstValue = equation.secondValue;
            textbox = "";
            document.querySelector("#textbox").innerHTML = textbox;

                
                
        }
           
            
        equation.operator = "/";
        document.querySelector("#textbox").innerHTML = textbox;
        //++operatorCount;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#clear");
    btn.addEventListener('click', (e) => {
        textbox = "";
        document.querySelector("#textbox").innerHTML = textbox;
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#Equals");
    btn.addEventListener('click', (e) => {
        if (!beforeOperator) {
                    
            equation.secondValue = parseFloat(textbox);
            beforeOperator = true;
            textbox = evaluateEquation();
            
            

            
            item = document.createElement('li');
            item.innerHTML = textbox;
            document.querySelector("#historyList").appendChild(item);
            // textbox = "";
            document.querySelector("#textbox").innerHTML = textbox;
            
        }
        else if (beforeOperator) {
            textbox = "error";
            document.querySelector("#textbox").innerHTML = textbox;
        }
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#clearHistory");
    btn.addEventListener('click', (e) => {
        document.querySelector("#historyList").innerHTML = "";
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    document.addEventListener('keydown', (e) => {
        if (e.key == "Backspace") {
            textbox = textbox.toString();
            textbox = textbox.substring(0, textbox.length - 1);
            document.querySelector("#textbox").innerHTML = textbox;
        }
        else {
            const isDigit = parseFloat(e.key);
            if (e.key == "+" || e.key=="-" || e.key=="/" ||  e.key=="*" || e.key=="x" || e.key=="X") {                
                if (beforeOperator) {
                    equation.firstValue = parseFloat(textbox);
                    beforeOperator = false;
                    textbox= "";
                }
                
                
                else if (!beforeOperator) {
                        
                    equation.secondValue = parseFloat(textbox);
                    beforeOperator = true;
                    textbox = evaluateEquation();
                        
                        
    
                        
                    item = document.createElement('li');
                    item.innerHTML = textbox;
                    document.querySelector("#historyList").appendChild(item);
                    equation.firstValue = equation.secondValue;
                    textbox = "";
                    document.querySelector("#textbox").innerHTML = textbox;

                        
                        
                }
                   
                    
                equation.operator = e.key;
                document.querySelector("#textbox").innerHTML = textbox;
                //++operatorCount;
            }
            else if (e.key == "Enter") {
                if (!beforeOperator) {
                    
                    equation.secondValue = parseFloat(textbox);
                    let mah = parseFloat("+100");
                    let bah = parseFloat("11");
                    console.log(mah + bah);
                    beforeOperator = true;
                    textbox = evaluateEquation();
                    
                    

                    
                    item = document.createElement('li');
                    item.innerHTML = textbox;
                    document.querySelector("#historyList").appendChild(item);
                    
                    document.querySelector("#textbox").innerHTML = textbox;
                    
                }
                else if (beforeOperator) {
                    textbox = "error";
                    document.querySelector("#textbox").innerHTML = textbox;
                }
                


            }
            else if (!isNaN(isDigit) || e.key==".") {
                
                textbox += e.key;
                
                document.querySelector("#textbox").innerHTML = textbox;
   
            }
        }
    })
   });



  