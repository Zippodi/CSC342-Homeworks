document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#zero");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("0");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#one");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("1");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#two");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("2");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#three");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("3");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#four");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("4");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#five");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("5");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#six");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("6");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#seven");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("7");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#eight");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("8");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#nine");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("9");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#decimal");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode(".");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#plussign");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("+");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#minussign");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("-");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#Xsign");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("X");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    let btn = document.querySelector("#slash");
    btn.addEventListener('click', (e) => {
        const textnode = document.createTextNode("/");
        
        document.querySelector("#textbox").appendChild(textnode);
    });
   });

   document.addEventListener('DOMContentLoaded', (e) => {
    document.addEventListener('keydown', (e) => {
        if (e.key == "Backspace") {
            console.log(document.querySelector("#textbox").childNodes.length);
            if (document.querySelector("#textbox").childNodes.length != 0) {
                document.querySelector("#textbox").removeChild(document.querySelector("#textbox").lastChild);
            }
        }
        else {
            const isDigit = parseInt(e.key);
            console.log(isDigit);
            if (!isNaN(isDigit) || e.key == "+" || e.key=="-" || e.key=="/" ||  e.key==".") {
                const textnode = document.createTextNode(e.key);
                document.querySelector("#textbox").appendChild(textnode);
            }
            else if(e.key == "*" || e.key == "x" || e.key == "X") {
                const textnode = document.createTextNode("*");
                document.querySelector("#textbox").appendChild(textnode);
            }
        }
    })
   });
