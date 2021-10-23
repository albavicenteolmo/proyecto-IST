window.onload = function(){
	varCarg();
    reiniciar();
    conban();
    eventListener();
}

function eventListener(){
	if (document.addEventListener) {
    	document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
	}else {
        document.attachEvent('oncontextmenu', function() {
        											window.event.returnValue = false;
    	});
	}
	document.getElementById("menun").addEventListener("click",function(){
																location.href="../index.html";
	});
	document.getElementById("reset").addEventListener("click",function(){
		reiniciar();
	});
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Windows Phone/i)){
	    sessionStorage.setItem("modoBandera","no");
		document.getElementById("bore2").setAttribute("class","elebot1");
		document.getElementById("bore2").addEventListener("click",bore1);
		document.getElementById("botones2").setAttribute("class","botones2");
	}
}

function bore1(){
	document.getElementById("bore2").setAttribute("class","elebot2");
	document.getElementById("bore2").removeEventListener("click",bore1);
	document.getElementById("bore2").addEventListener("click",bore2);
	sessionStorage.setItem("modoBandera","si");
}
function bore2(){
	document.getElementById("bore2").setAttribute("class","elebot1");
	document.getElementById("bore2").removeEventListener("click",bore2);
	document.getElementById("bore2").addEventListener("click",bore1);
	sessionStorage.setItem("modoBandera","no");
}

function varCarg(){
	var estilos = document.styleSheets[0];	
	var tmp1 = sessionStorage.getItem("tama");
	/*
	estilos.insertRule(".bot { width:"+tmp1+"px; heigth:"+tmp1+"px;}", 20);
	estilos.insertRule(".botd { width:"+tmp1+"px; heigth:"+tmp1+"px;}", 20);
	estilos.insertRule(".band { width:"+tmp1+"px; heigth:"+tmp1+"px;}", 20);
	estilos.insertRule(".botdr { width:"+tmp1+"px; heigth:"+tmp1+"px;}", 20);
	*/
	var son = localStorage.getItem("sonidos");
	if(son==null){
		localStorage.setItem("sonidos","si");
	}
	var tmp = sessionStorage.getItem("tam");
	if(tmp==null){
		sessionStorage.setItem("tam","8");
	}
	tmp = sessionStorage.getItem("tamy");
	if(tmp==null){
		sessionStorage.setItem("tamy","8");
	}
	tmp = sessionStorage.getItem("tamc");
	if(tmp==null){
		sessionStorage.setItem("tamc","64");
	}
	tmp = sessionStorage.getItem("dificul");
	if(tmp==null){
		sessionStorage.setItem("dificul","10");
	}
	tmp = sessionStorage.getItem("primv");
	if(tmp==null){
		sessionStorage.setItem("primv","false");
	}
	tmp = sessionStorage.getItem("pers");
	if(tmp==null){
		sessionStorage.setItem("pers","false");
	}
	tmp = sessionStorage.getItem("perder");
	if(tmp==null){
		sessionStorage.setItem("perder","false");
	}
}

var array=[[],[],[],[],[],[],[],[],[],[]];
var band=[[],[],[],[],[],[],[],[],[],[]];;
var temp12;

function reiniciar(){
	array.length=0;
	band.length=0;
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	array = new Array(tam+2);
	band = new Array(tam+2);
	for(var cont=0;cont<tam+2;cont++){
		array[cont] = new Array(tamy+2);
		band[cont]=new Array(tamy+2);
	}
	perder=false;
	primv=false;
	stoptemp();
	conban();
	document.getElementById("tiemps").innerHTML="00";
	document.getElementById("tiempm").innerHTML="00";
	sessionStorage.setItem("perder",perder);
	sessionStorage.setItem("primv",primv);
	crear();
}

function modo(){
	var dificul = parseInt(sessionStorage.getItem("dificul"));
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	var mod;
	if(dificul==10){
		mod="Principiante";
	}else{
		if(dificul==40){
			mod="Intermedio";
		}else{
			if(dificul==99){
				mod="Experto";
			}else{
				mod="Personalizado: "+tam+"x"+tamy+" - "+dificul+" bombas";
			}
		}
	}
	document.getElementById("modo").innerHTML=mod;
}

function crear(){
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	var tamc = parseInt(sessionStorage.getItem("tamc"));
	modo();
	document.getElementById("tablero").innerHTML = "";
	var sal =1;
	var fila =1;
	for(var cont=0;cont!=tamc;cont++){
		var cas = document.createElement("div");
		cas.setAttribute("class","bot");
		cas.setAttribute("id","b"+fila+","+sal);
		cas.setAttribute("onclick","javascript: boto("+fila+","+sal+");");
		cas.setAttribute("onmousedown","javascript: WhichButton(event,"+fila+","+sal+");");
		var per = document.createElement("p");
		per.setAttribute("id","p"+fila+","+sal);
		per.setAttribute("class","flo inv")
		cas.appendChild(per);
		var per1 = document.createElement("p");
		per1.setAttribute("id","pba"+fila+","+sal);
		per1.setAttribute("class","inv");
		per1.innerHTML="f";
		cas.appendChild(per1);
		document.getElementById("tablero").appendChild(cas);		
		sal++;
		
		if(sal==tamy+1){
			sal=1;
			fila++;
			var hrr = document.createElement("br");
			document.getElementById("tablero").appendChild(hrr);
		}
	}
	for(var cont=0;cont!=tam+2;cont++){
		for(var cont1=0;cont1!=tamy+2;cont1++){
			if(cont1!=0 && cont!=0 && cont!=tam+1 && cont1!=tamy+1){
				array[cont][cont1]=0;
				band[cont][cont1]=0;
			}else{
				array[cont][cont1]=-10;
				band[cont][cont1]=-10;
			}
		}
	}
	var dificul = parseInt(sessionStorage.getItem("dificul"));
	if(dificul==tamc){
		bomb(0,0);
		sessionStorage.setItem("primeraVez","no");
	}else{
		sessionStorage.setItem("primeraVez","si");
	}
	
}
function bomb(x1,y1){
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	var dificul = parseInt(sessionStorage.getItem("dificul"));
	for(var cont=0;cont!=dificul;cont++){		
		var x = Math.floor((Math.random() * tam) + 1);
		var y = Math.floor((Math.random() * tamy) + 1);
		if(document.getElementById("p"+x+","+y).innerHTML=="b " || (x==x1 && y==y1)){			
			cont--;
			continue;
		}else{		
			document.getElementById("p"+x+","+y).innerHTML="b ";
			array[x][y]=100;
		}
	}
	
	nume(x1,y1);
}

function nume(x1,y1){
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	for(var cont=1;cont!=tam+1;cont++){
		for(var cont1=1;cont1!=tamy+1;cont1++){
			if(array[cont][cont1]>=100){
				array[cont-1][cont1-1]++; 
                array[cont-1][cont1]++;
                array[cont-1][cont1+1]++;
                array[cont][cont1-1]++;
                array[cont][cont1+1]++;
                array[cont+1][cont1-1]++;
                array[cont+1][cont1]++;
                array[cont+1][cont1+1]++;
			}
		}
	}
	for(var cont=1;cont!=tam+1;cont++){
		for(var cont1=1;cont1!=tamy+1;cont1++){
			if(array[cont][cont1]!=0){
				if(array[cont][cont1]>=100){
					document.getElementById("p"+cont+","+cont1).innerHTML="x";
				}else{
					document.getElementById("p"+cont+","+cont1).innerHTML=array[cont][cont1]+"";
				}
			}
			
		}

	}
	boto(x1,y1);
}
function boto(x,y){
	var perder = sessionStorage.getItem("perder");
	var primv = sessionStorage.getItem("primv");
	var pers = sessionStorage.getItem("pers");
	var bore=sessionStorage.getItem("modoBandera");
	var tod = sessionStorage.getItem("primeraVez");
	if(tod=="si"){
		sessionStorage.setItem("primeraVez","no");
		bomb(x,y);
	}else{
		if(perder=="false" && bore!="si"){
			var son = localStorage.getItem("sonidos");
			if(son=="si"){
				var audio = new Audio('../sonidos/pop.mp3');
			    audio.play();
			}
		    if(primv=="false"){
		    	primv="true";
		    	sessionStorage.setItem("primv",primv);
		    	if(pers=="false"){
		    		temp();
		    	}
		    }
	    	recur(x,y);
	    }    
		comprobar();
		comproband();
	}
	
}
function recur(x,y){
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	var perder = sessionStorage.getItem("perder");
	if(perder=="false"){
		if(y<1 || x<1 || y>=tamy+1 || x>=tam+1 || perder==true){
			return;
		}else{
			var tmp = array[x][y];
			if(array[x][y] >=1 && array[x][y]<10) {               	
	               	document.getElementById("b"+x+","+y).setAttribute("class","botd");

	               	document.getElementById("p"+x+","+y).setAttribute("class","flo");

	               	if(array[x][y]==1){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo1");
	               	}
	               	if(array[x][y]==2){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo2");
	               	}
	               	if(array[x][y]==3){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo3");
	               	}
	               	if(array[x][y]==4){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo4");
	               	}
	               	if(array[x][y]==5){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo5");
	               	}
	               	if(array[x][y]==6){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo6");
	               	}
	               	if(array[x][y]==7){
	               		document.getElementById("p"+x+","+y).setAttribute("class","flo flo7");
	               	}
	               	

	               	band[x][y]=0;               	
		    		document.getElementById("pba"+x+","+y).setAttribute("class","inv");
	        }else{
	        	if(array[x][y] >= 100){
	            	perderw();
	            	return;
	            	//juego acabado
	        	}else{ 
		        	if(array[x][y] == 0){
		            	band[x][y]=0;               	
			    		document.getElementById("pba"+x+","+y).setAttribute("class","inv");
		               	document.getElementById("p"+x+","+y).setAttribute("class","flo");
		               	document.getElementById("b"+x+","+y).setAttribute("class","botd");
		                
		                array[x][y] = -1;

		                recur(x-1,y-1); 
		                recur(x,y-1); 
		                recur(x,y+1);
		                recur(x+1,y);
		                recur(x-1,y);
		                recur(x+1,y-1);
		                recur(x+1,y+1);
		                recur(x-1,y+1);

	        		}
	        	}
			}
		}
	}
}

function WhichButton(event,fil,col) {
	var perder = sessionStorage.getItem("perder");
	var dificul = parseInt(sessionStorage.getItem("dificul"));
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	var bore=sessionStorage.getItem("modoBandera");
    if((event.button==2 || bore=="si") && perder=="false"){
    	if(document.getElementById("b"+fil+","+col).className != "botd"){
	    	var acc=0;
	    	
	    	for(var cont=1;cont!=tam+1;cont++){
		   		for(var cont1=1;cont1!=tamy+1;cont1++){
		   			if(band[cont][cont1]==1){
		   				acc++;
		   			}
	    		}
	  	   	}
	    	if(acc<dificul){
	    		var son = localStorage.getItem("sonidos");
				if(son=="si"){
					var audio = new Audio('../sonidos/popband.mp3');
				    audio.play();
				}
		    	if(band[fil][col]==0){
		    		band[fil][col]=1;
		    		document.getElementById("b"+fil+","+col).setAttribute("class","band");
		    		document.getElementById("pba"+fil+","+col).setAttribute("class","floba");

		    	}else{
		    		band[fil][col]=0;
		    		if(array[fil][col]==-1){
		    			document.getElementById("b"+fil+","+col).setAttribute("class","botd");
		    			document.getElementById("pba"+fil+","+col).setAttribute("class","inv");

		    		}else{
		    			document.getElementById("b"+fil+","+col).setAttribute("class","bot");
		    			document.getElementById("pba"+fil+","+col).setAttribute("class","inv");
		    		}
		    	}
		    	comprobar();
		    }else{
		    	if(array[fil][col]==-1){
		    		document.getElementById("b"+fil+","+col).setAttribute("class","botd");
		    		band[fil][col]=0;
		    	}else{
		   			document.getElementById("b"+fil+","+col).setAttribute("class","bot");
		   			band[fil][col]=0;
		   		}
		    }
	    }
	    conban();
	    comproband();
	}
}

function comprobar(){
	var dificul = parseInt(sessionStorage.getItem("dificul"));
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamc = parseInt(sessionStorage.getItem("tamc"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	conban();
	var acu=0;		    	
	for(var cont=1;cont!=tam+1;cont++){
		for(var cont1=1;cont1!=tamy+1;cont1++){
   			if(array[cont][cont1]>=100 && band[cont][cont1]==1){
				acu++;
		   	}
 		}
	}
	var acu12=0;
	for(var cont=1;cont!=tam+1;cont++){
		for(var cont1=1;cont1!=tamy+1;cont1++){
		    if(document.getElementById("b"+cont+","+cont1).className == "botd"){
				acu12++;
		   	}
		}
	}
	if(acu==dificul && acu12==(tamc-dificul)){
	    ganar12();
	}	
}

function perderw(){
	var perder = sessionStorage.getItem("perder");
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));

	perder="true";
	var son = localStorage.getItem("sonidos");
	if(son=="si"){
		var audio = new Audio('../sonidos/perder.mp3');
	    audio.play();
	}
	for(var x=1;x!=tam+1;x++){
		for(var y =1;y!=tamy+1;y++){
			if(array[x][y]>=100){
				document.getElementById("p"+x+","+y).setAttribute("class","flob");
               	document.getElementById("b"+x+","+y).setAttribute("class","botd bo");
               	document.getElementById("pba"+x+","+y).setAttribute("class","inv");
			}
		}
	}
	sessionStorage.setItem("perder",perder)
	stoptemp();

}

function ganar12(){
	var son = localStorage.getItem("sonidos");
	if(son=="si"){
		var audio = new Audio('../sonidos/ganar.mp3');
	    audio.play();
	}
	stoptemp();
	alert("Has Ganado");
	var pers = sessionStorage.getItem("perder");
	if(pers!="true"){
		recordg();
	}
}

function temp(){
   temp12 = setInterval(contador, 1000);          
}

function stoptemp(){
	clearInterval(temp12);
}

function contador(){
         var tiemps = document.getElementById("tiemps").innerHTML; 
         var ss;
         if(tiemps.charAt(0)=="0"){
         	ss = parseInt(tiemps.charAt(1));
         	ss++;
         	if(ss==10){
         		document.getElementById("tiemps").innerHTML=""+ss;
         	}else{
         		document.getElementById("tiemps").innerHTML="0"+ss;
         	}
         }else{
         	ss = parseInt(tiemps);
         	ss++;
         	document.getElementById("tiemps").innerHTML=""+ss;
         }
         var tiempm = parseInt(document.getElementById("tiempm").innerHTML); 
         if(ss>59){
         	tiempm++;
         	document.getElementById("tiempm").innerHTML="0"+tiempm;
         	document.getElementById("tiemps").innerHTML="00";

         }
              
 }
 function conban(){
 	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	var dificul = parseInt(sessionStorage.getItem("dificul"));
 	var acu=0;		    	
	for(var cont=1;cont!=tam+1;cont++){
		for(var cont1=1;cont1!=tamy+1;cont1++){
   			if(band[cont][cont1]==1){
				acu++;
		   	}
 		}
	}
	document.getElementById("cnban").innerHTML= acu+"/"+dificul;
 }


function comproband(){
	var tam = parseInt(sessionStorage.getItem("tam"));
	var tamy = parseInt(sessionStorage.getItem("tamy"));
	for(var cont=0;cont!=tam+1;cont++){
		for(var cont1=0;cont1!=tamy+1;cont1++){
			if(array[cont][cont1]>0 && array[cont][cont1]<100){
				if(document.getElementById("b"+cont+","+cont1).className == "botd" || document.getElementById("b"+cont+","+cont1).className == "botdr"){
					
					var num=array[cont][cont1];
					var acu=0;
					

					if(band[cont-1][cont1-1]==1){
						acu++;
					}
					if(band[cont-1][cont1]==1){
						acu++;
					}
					if(band[cont-1][cont1+1]==1){
						acu++;
					}
					if(band[cont][cont1-1]==1){
						acu++;
					}
					if(band[cont][cont1+1]==1){
						acu++;
					}
					if(band[cont+1][cont1-1]==1){
						acu++;
					}
					if(band[cont+1][cont1]==1){
						acu++;
					}
					if(band[cont+1][cont1+1]==1){
						acu++;
					}
					document.getElementById("b"+cont+","+cont1).setAttribute("class","botd");
					if(acu>0){
						if(acu<num){
							document.getElementById("b"+cont+","+cont1).setAttribute("class","botd");
						}else{
							if(acu>num){
								document.getElementById("b"+cont+","+cont1).setAttribute("class","botdr");
							}
						}
					}else{
						document.getElementById("b"+cont+","+cont1).setAttribute("class","botd");
					}
				}
			}
		}
	}
}



function recordg() {
    var min =parseInt(document.getElementById("tiempm").innerHTML);
    var seg =parseInt(document.getElementById("tiemps").innerHTML);
    var tot =(min*60)+seg;
    var salir=false;
    var dificul=sessionStorage.getItem("dificul");
    for(var cont=1;cont<4 && salir==false;cont++){
    	for(var cont1=1;cont1<4 && salir==false;cont1++){
    		var sss = parseInt(localStorage.getItem("sr"+cont+""+cont1));
    		var mmm = parseInt(localStorage.getItem("mr"+cont+""+cont1));
    		if(mmm==0){
    			var ttt = sss;
    		}else{
    			var ttt = sss * mmm;
    		}
    		
    		if(dificul==10 && cont==1){
    			if(tot<ttt){	
    				ggrec(1,cont1);
    				salir=true;
    			}
    		}
    		if(dificul==40 && cont==2){
    			if(tot<ttt){	
    				ggrec(2,cont1);
    				salir=true;
    			}
    		}
    		if(dificul==99 && cont==3){
    			if(tot<ttt){	
    				ggrec(3,cont1);
    				salir=true;
    			}
    		}
    	}
    }
}

function ggrec(cate,pos){
	var son = localStorage.getItem("sonidos");
	if(son=="si"){
		var audio = new Audio('../sonidos/record.mp3');
	    audio.play();
	}
	var tmp;
	alert("Nuevo Record!");
	if(pos==1){
			localStorage.setItem("sr"+cate+"3",localStorage.getItem("sr"+cate+"2"));
			localStorage.setItem("mr"+cate+"3",localStorage.getItem("mr"+cate+"2"));
			localStorage.setItem("ar"+cate+"3",localStorage.getItem("ar"+cate+"2"));
			localStorage.setItem("sr"+cate+"2",localStorage.getItem("sr"+cate+"1"));
			localStorage.setItem("mr"+cate+"2",localStorage.getItem("mr"+cate+"1"));
			localStorage.setItem("ar"+cate+"2",localStorage.getItem("ar"+cate+"1"));
			while(true){
				var nom=prompt("Por favor Introduce 4 iniciales");
				if(nom.length>4 || nom.length<4){
					alert("Vuelve a Introducir las Iniciales por favor");
				}else{
					localStorage.setItem("ar"+cate+"1",nom);
					localStorage.setItem("sr"+cate+"1",document.getElementById("tiemps").innerHTML);
					localStorage.setItem("mr"+cate+"1",document.getElementById("tiempm").innerHTML);
					break;
				}
			}
	}
	if(pos==2){
			localStorage.setItem("sr"+cate+"3",localStorage.getItem("sr"+cate+"2"));
			localStorage.setItem("mr"+cate+"3",localStorage.getItem("mr"+cate+"2"));
			localStorage.setItem("ar"+cate+"3",localStorage.getItem("ar"+cate+"2"));
			while(true){
				var nom=prompt("Por favor Introduce 4 iniciales");
				if(nom.length>4 || nom.length<4){
					alert("Vuelve a Introducir las Iniciales por favor");
				}else{
					localStorage.setItem("ar"+cate+"2",nom);
					localStorage.setItem("sr"+cate+"2",document.getElementById("tiemps").innerHTML);
					localStorage.setItem("mr"+cate+"2",document.getElementById("tiempm").innerHTML);
					break;
				}
			}
	}
	if(pos==3){
			
			while(true){
				var nom=prompt("Por favor Introduce 4 iniciales");
				if(nom.length>4 || nom.length<4){
					alert("Vuelve a Introducir las Iniciales por favor");
				}else{
					localStorage.setItem("ar"+cate+"3",nom);
					localStorage.setItem("sr"+cate+"3",document.getElementById("tiemps").innerHTML);
					localStorage.setItem("mr"+cate+"3",document.getElementById("tiempm").innerHTML);
					break;
				}
			}
	}
}


function rec1() {
	document.getElementById("bot1").setAttribute("class","bttod");
	document.getElementById("bot2").setAttribute("class","btto");
	document.getElementById("bot3").setAttribute("class","btto");
    document.getElementById("ol1").setAttribute("class","ull");
    document.getElementById("ol2").setAttribute("class","inv");
    document.getElementById("ol3").setAttribute("class","inv");
}

function rec2() {

	document.getElementById("bot1").setAttribute("class","btto");
	document.getElementById("bot2").setAttribute("class","bttod");
	document.getElementById("bot3").setAttribute("class","btto");
    document.getElementById("ol2").setAttribute("class","ull");
    document.getElementById("ol1").setAttribute("class","inv");
    document.getElementById("ol3").setAttribute("class","inv");
}

function rec3() {

	document.getElementById("bot1").setAttribute("class","btto");
	document.getElementById("bot2").setAttribute("class","btto");
	document.getElementById("bot3").setAttribute("class","bttod");
    document.getElementById("ol3").setAttribute("class","ull");
    document.getElementById("ol1").setAttribute("class","inv");
    document.getElementById("ol2").setAttribute("class","inv");
}


