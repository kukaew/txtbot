let	
	rnd = (min,max) => {if(!max)max=min+5;let rand=min+Math.random()*(max-min);return Math.round(rand)},
	BDY = document.querySelector("body"),
	UL = BDY.querySelector("ul"),
	H1 = BDY.querySelector("h1"),
	Slovaed = [],
	fishtxt,
	otvt,
	col,
	Nofish = 1,
	fishkey = false,
	wrdR2 = rnd(0,4),
	wrdR3 = rnd(5,14),
	wrdR4 = rnd(20,24),
	prg_rnd = rnd(0,col);

const
	uniq = a => {return Array.from(new Set(a))},
	fish = t =>
	{
		String.prototype.cap=function(){return this.charAt(0).toUpperCase()+this.slice(1)}
		Array.prototype.sort=function(){let m=this.length,i;while(m){i=(Math.random()*m--)>>>0;[this[m],this[i]]=[this[i],this[m]]}return this;}

	let wrd = (a,b) => {if(!b)b=5;if(a+window["r"+a]>=a*2+b)window["r"+a]=a;return Slova[window["r"+a]++]},//+a/5
		wrd2 = () => {if(wrdR2>=5)wrdR2=0;return wrdR2++},
		wrd3 = () => {if(wrdR3>=14)wrdR3=5;return Vstavka[wrdR3++]},
		wrd4 = () => {if(wrdR4>=24)wrdR4=20;return Vstavka[wrdR4++]},
		isA = mix => {return(mix instanceof Array)},
		isN = n => {return !isNaN(parseFloat(n))&& isFinite(n)},

		prgFun = (n,propusk,zg) => 
		{
			let str = ret = VpRs = "";
			if (prg_rnd>=col) prg_rnd=0;
			prgf = window["txt"+prg_rnd++];
			for (let i=0;i<prgf.length;i++) 
			{
				if (typeof prgf[i]=="number") str += " "+wrd(prgf[i]*5);
				else if (isA(prgf[i])) str += prgf[i][rnd(0,prgf[i].length-1)]+" ";
				else str += prgf[i]+" ";
			};
			switch(true) 
			{
				case(zg==1):
					ret = str.slice(1).cap();
					break;//зглвк
				case(!isN(prgf[prgf.length-1])):
					if (otvt) ret = otvt.cap() + " " + str.slice(1);
					else ret = str.slice(1).cap();
					otvt = false;
					break;//в конце не циифрa = прдл!
				case(rnd(0,1)>0 && n<col-1 && isN(prgf[prgf.length-1]) && fishtxt.slice(-2)!="? "):
					VpRs = wrd2();
					otvt = Vstavka[VpRs + 15];
					if (n>1) ret = wrd4().cap() + " " + Vstavka[VpRs] + " " + str.slice(1) + "? ";
					else ret = Vstavka[VpRs].cap() + " " + str.slice(1) + "? ";
					break;//не последняя, в конце цифрa, предыдущее не вопрос = вопрос.
				case(rnd(0,1)>0 && n>1 && isN(prgf[prgf.length-1]) && fishtxt.slice(-2) != "? "):
					ret = wrd3().cap() + str + ". ";
					break;//не первое, в конце цифрa, предыдущее не вопрос = прдл. с предлогом.
				default: 
					if (otvt) ret = otvt.cap() + " " + str.slice(1) + ". ";
					else  ret = str.slice(1).cap() + ". ";
					otvt = false;// = прдл.
			}
			if (zg!=1) Slovaed.push(Stroka[n]);
			return ret;
		};

		Stroka = Stroka.sort();
		Zagolovok = Zagolovok.sort();
		for (let i=0;i<=Slova.length;i=i+5){window["r"+ i]=rnd(i);}
		fishtxt="", col=0;

		switch (t) 
		{
			case 1:
				for(let i=0;i<Zagolovok.length;i++){window["txt"+col++]=Zagolovok[i];}
				fishtxt+= prgFun(0,0,1);
				break;

			case 2:
				for(i=0;i<Stroka.length;i++){window["txt"+col++]=Stroka[i];}
				fishtxt+=prgFun();
				break;

			case 3:
				for(let i=0;i<Stroka.length;i++){window["txt"+col++]=Stroka[i];}
				for(let i=0;i<col;i++){fishtxt+=prgFun(i,2);}
				break;
		}
		return fishtxt;
	};