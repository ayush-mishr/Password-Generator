let passnum=document.querySelector('.len');
let inputslider=document.querySelector("[slides]");
let upperCase=document.querySelector('#l1');
let lowerCase=document.querySelector('#l2');
let number=document.querySelector('#l3');
let symbol=document.querySelector('#l4');
let passdisplay=document.querySelector('#pass');
let displaymessage=document.querySelector('[message]');
let allCheckbox=document.querySelectorAll('input[type="checkbox"]');
let bntOnClick=document.querySelector('#btn');
let firstBntClick=document.querySelector('.fbtn');
let circle=document.querySelector('.color');
let symbols='~`!@#$%^&*()_+=?><"{}[]:;,.';

let password="";
let checkCount=0;
 let passwordlen=10;
 handleslider();
 setindicator("#ccc");
  function handleslider(){
     inputslider.value=passwordlen;
     passnum.innerText=passwordlen;
     
  }

 function  getRandomInteger(mini,maxi){
   return Math.floor(Math.random()*(maxi-mini)) +mini;
  }

function getRandomNumber(){
 return  getRandomInteger(0,9);
}

function getUpperCase(){
   return String.fromCharCode( getRandomInteger(65,90));
}
function getLowerCase(){
   return String.fromCharCode(getRandomInteger(97,122));
}
function getSymbol(){
   const num=getRandomInteger(0,symbols.length);
   return symbols.charAt(num);
}
function setindicator(color){
   circle.style.backgroundColor=color;
}
let upcase=false;
let lcase=false;
let num=false;
let sym=false;
if(upperCase.checked){
   upcase=true;
}
if(lowerCase.checked){
   lcase=true;
}
if(number.checked){
   num=true;
}
if(symbol.checked){
   sym=true;
}
  function strength(){
   if(upcase||lcase||num||sym){
      setindicator("#0f0");
   }
   else if(upcase&&lcase||num&&sym){
      setindicator("#ff0");
   }
  }
  strength();
 
async function copyingmessage(){
   try{
      await navigator.clipboard.writeText(passdisplay.value);
       displaymessage.innerText='copied';
       setTimeout(()=>displaymessage.innerText='',400);

   }
   catch(e){
       displaymessage.innerText='failed';
   }

   displaymessage.classList.add("active");

    setTimeout(()=>displaymessage.classList.remove("active"),200);
};

firstBntClick.addEventListener('click',()=>{
   if(passdisplay.value){
      copyingmessage();
   }
}
);
 function changeHandler(){
   checkCount=0;
   allCheckbox.forEach((checkbox)=>{
      if(checkbox.checked){
         checkCount++;
      }
   });

    if(checkCount>passwordlen){
      passwordlen=checkCount;
      handleslider();
    }

 }


allCheckbox.forEach(
   function(checkbox){
      checkbox.addEventListener('change',changeHandler);
   }
);
    


   inputslider.addEventListener('input',(e)=>{
      passwordlen = e.target.value;
      handleslider();
   });


   bntOnClick.addEventListener('click',()=>{
      if(checkCount==0){
         password="";
         passdisplay.value=password;
         return;
      }
      if(checkCount>passwordlen){
         passwordlen=checkCount;
         handleslider();
       }

      password="";
      let fun=[];
      if(upperCase.checked){
         fun.push(getUpperCase);
      }
      if(lowerCase.checked){
         fun.push(getLowerCase);
      }
      if(number.checked){
         fun.push(getRandomNumber);
      }
      if(symbol.checked){
         fun.push(getSymbol);
      }
        for(let i=0;i<fun.length;i++){
         password+=fun[i]();
        }
        for(let i=0;i<(passwordlen-fun.length);i++){
         let rani=getRandomInteger(0,fun.length);
          password += fun[rani]();
        }
        passdisplay.value=password;

   });
   