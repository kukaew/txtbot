let 
iteraciya = 222,
slhtml = vshtml = prdhtml = zglhtml = "";
const
BARR = {
"- ": "—&nbsp;",
"- ": "—&nbsp;",
"\"": "«",
"«": null,
"\`": "&#x301;",
"...": "&#x2026;"},
cont = document.getElementById("cont"),
bCreate = document.getElementById("bCreate"),
slovar = document.getElementById("slovar"),
vstavka = document.getElementById("vstavka"),
prd = document.getElementById("prd"),
zgl = document.getElementById("zgl"),
isN = n => !isNaN(parseFloat(n)) && isFinite(n),
OnE = (en,el,fu,kc) =>
{
	let f = e =>
	{
		let tg = e.originalTarget || e.target,
			id = tg.id || tg.classList[0];
		if (!kc && OnEa[en][id] || kc && kc == e.keyCode && OnEa[en][id] || OnEa[en][id] == "*") OnEa[en][id][0](en,tg,kc);
	}
	if (!OnEa[en])
	{
		OnEa[en] = {};
		document.addEventListener(en,f);
	}
	OnEa[en][el] = [fu,kc];
}, OnEa = {},
onAddIn = (en,tg) =>
{
	tg.insertAdjacentHTML("afterEnd", "<span class=\"addIn str inp\" contenteditable></span>");
	tg.classList.remove("addIn");
},
onAddLin = (en,tg) =>
{
	let add = "";
	for(let ii=0; ii<4; ii++) add += "<span class=inp contenteditable></span>";
	tg.insertAdjacentHTML("afterEnd", add);

	tg.parentElement.insertAdjacentHTML("afterEnd", "<div class=\"lin slova\"><span class=num>"+ (Number(tg.previousElementSibling.textContent) + 1) + "</span><span class=\"addLin inp\" contenteditable></span></div></div>");
	tg.classList.remove("addLin");
},
onAddLin2 = (en,tg) =>
{
	tg.parentElement.insertAdjacentHTML("afterEnd", "<div class=\"lin zgl\"><span class=\"addLin2 str inp\" contenteditable></span></div>");
	tg.classList.remove("addLin2");
	tg.parentElement.classList.add("zgl");
	onAddIn(en,tg);
},
OnInput = (en,tg) =>
{
	let id = tg.id || tg.classList[0];
	if (id == "str" && tg.textContent.length == 0) { tg.remove(); return; }

	let OBJ = window.getSelection(),
		RNG = OBJ.getRangeAt(0),
		OFS = RNG.startOffset,
		ROOT = RNG.startContainer,
		TXT = ROOT.data;
	if (TXT) for (let i = 0; i < TXT.length; i++)
	{
		let DSB = TXT.substring(i, OFS), ARB, ARL;
		switch(true)
		{
			case (!BARR[DSB]):
				continue;
			break;
			case (/«[^»]*\"/.test(TXT)):
				ARB = "»";
				ARL = 1;
			break;
			default:
				ARB = BARR[DSB];
				ARL = DSB.length;
			break;
		}
		RNG.setStart(ROOT, OFS-ARL);
		RNG.setEnd(ROOT, OFS);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(RNG);
		document.execCommand("insertHTML", false, ARB);
		break;
	}
},
OnPaste = e =>
{
	e.stopPropagation();
	e.preventDefault();
	let clipboardData = e.clipboardData || window.clipboardData
	,pastedData = clipboardData.getData("Text").replace(/\r|\n/g, "");
	document.execCommand("insertHTML", false, pastedData);
},
onCreate = () =>
{
	Slova = [];
	document.querySelectorAll(".slova > .inp:not(.addLin)").forEach((e)=>
	{
		Slova.push(e.textContent);
	})
	Vstavka = [];
	document.querySelectorAll(".vstavka > .inp").forEach((e)=>
	{
		Vstavka.push(e.textContent);
	})
///////////////////////////////////
	Stroka = [];
	document.querySelectorAll("#prd .zgl").forEach((e,i)=>
	{
		let yy=[];
		e.querySelectorAll(".inp:not(.addLin2):not(.addIn)").forEach((ee)=>
		{
			let x = ee.textContent.split("|");
			if (x.length>1) ee=x;
			else ee = (isN(ee.textContent)) ? Number(ee.textContent) : ee.textContent;
			yy.push(ee);
		})
		Stroka.push(yy);
	})
	Zagolovok = [];
	document.querySelectorAll("#zgl .zgl").forEach((e,i)=>
	{
		let yy=[];
		e.querySelectorAll(".inp:not(.addLin2):not(.addIn)").forEach((ee)=>
		{
			let x = ee.textContent.split("|");
			if (x.length>1) ee=x;
			else ee = (isN(ee.textContent)) ? Number(ee.textContent) : ee.textContent;
			yy.push(ee);
		})
		Zagolovok.push(yy);
	})
///////////////////////////////////
	cont.innerHTML = "";
	for (let i = 0; i < iteraciya; i++)
	{
		cont.innerHTML += "<div id=i"+ i +" class=blk contenteditable><pre class=h>"+ fish(1) +"</pre><pre class=h2>"+ fish(2) +"</pre><pre class=h3>"+ fish(2) +"</pre><pre class=t>"+ fish(3) +"</pre></div>";
	}

	console.log("Slova", Slova);
	console.log("Vstavka", Vstavka);
	console.log("Stroka", Stroka);
	console.log("Zagolovok", Zagolovok);
}



OnE("input", "inp", OnInput);
OnE("input", "str", OnInput);
OnE("click", "bCreate", onCreate);
OnE("keydown", "addLin", onAddLin);
OnE("keydown", "addLin2", onAddLin2);
OnE("keydown", "addIn", onAddIn);
document.addEventListener("paste", OnPaste);
document.addEventListener("keypress", (e) => {if(e.keyCode==13) e.preventDefault()});

for(let i=0; i<Slova.length; i=i+5)
{
	slhtml += "<div class=\"lin slova\"><span class=num>"+ i/5 +"</span>";
	for(let ii=0; ii<5; ii++) slhtml += "<span class=inp contenteditable>" + Slova[i+ii] + "</span>";
	slhtml += "</div>";
}
slovar.innerHTML = slhtml + "<div class=\"lin slova\"><span class=num>"+ Slova.length/5 +"</span><span class=\"addLin inp\" contenteditable></span></div>";

for(let i=0; i<Vstavka.length; i=i+5)
{
	vshtml += "<div class=\"lin vstavka\">";
	for(let ii=0; ii<5; ii++) vshtml += "<span class=inp contenteditable>" + Vstavka[i+ii] + "</span>";
	vshtml += "</div>";
}
vstavka.innerHTML = vshtml;

for(let i=0,txt; i<Stroka.length; i++)
{
	prdhtml += "<div class=\"lin zgl\">";
	for(let ii=0; ii<Stroka[i].length; ii++) 
	{
		txt =  Stroka[i][ii];
		if (typeof txt == "object") txt = txt.join("|");
		prdhtml += "<span class=\"str inp\" contenteditable>" + txt + "</span>";
	}
	prdhtml += "<span class=\"addIn str inp\" contenteditable></span></div>";
}
prd.innerHTML = prdhtml + "<div class=\"lin\"><span class=\"addLin2 str inp\" contenteditable></span></div>";

for(let i=0,txt; i<Zagolovok.length; i++)
{
	zglhtml += "<div class=\"lin zgl\">";
	for(let ii=0; ii<Zagolovok[i].length; ii++)
	{
		txt =  Zagolovok[i][ii];
		if (typeof txt == "object") txt = txt.join("|");
		zglhtml += "<span class=\"str inp\" contenteditable>" + txt + "</span>";
	}
	zglhtml += "<span class=\"addIn str inp\" contenteditable></span></div>";
}
zgl.innerHTML = zglhtml + "<div class=\"lin\"><span class=\"addLin2 str inp\" contenteditable></span></div>";


	console.log(OnEa)