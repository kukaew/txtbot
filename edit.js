let 
iteraciya = 22,
slhtml = vshtml = prdhtml = zglhtml = ""
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
OnInput = e =>
{
	let tg = e.originalTarget || e.target,
		id = tg.id || tg.classList[0]
	if (id == "str" && tg.textContent.length == 0) 
	{
		tg.remove() 
		return 
	}

	let OBJ = window.getSelection(),
		RNG = OBJ.getRangeAt(0),
		OFS = RNG.startOffset,
		ROOT = RNG.startContainer,
		TXT = ROOT.data
	if (TXT) for (let i = 0; i < TXT.length; i++)
	{
		let DSB = TXT.substring(i, OFS), ARB, ARL
		switch(true)
		{
			case (!BARR[DSB]):
				continue
			break
			case (/«[^»]*\"/.test(TXT)):
				ARB = "»"
				ARL = 1
			break
			default:
				ARB = BARR[DSB]
				ARL = DSB.length
			break
		}
		RNG.setStart(ROOT, OFS-ARL)
		RNG.setEnd(ROOT, OFS)
		window.getSelection().removeAllRanges()
		window.getSelection().addRange(RNG)
		document.execCommand("insertHTML", false, ARB)
		break
	}
},
OnPaste = e =>
{
	e.stopPropagation()
	e.preventDefault()
	let clipboardData = e.clipboardData || window.clipboardData
	,pastedData = clipboardData.getData("Text").replace(/\r|\n/g, "")
	document.execCommand("insertHTML", false, pastedData)
},
onCreate = () =>
{
	Slova = []
	document.querySelectorAll(".slova > .inp").forEach((e)=>
	{
		Slova.push(e.textContent)
	})
	Vstavka = []
	document.querySelectorAll(".vstavka > .inp").forEach((e)=>
	{
		Vstavka.push(e.textContent)
	})
///////////////////////////////////
	Stroka = []
	document.querySelectorAll(".prd").forEach((e,i)=>
	{
		let yy=[]
		e.querySelectorAll(".inp").forEach((ee)=>
		{
			let x = ee.textContent.split("|")
			if (x.length>1) ee=x
			else ee = (isN(ee.textContent)) ? Number(ee.textContent) : ee.textContent
			yy.push(ee)
		})
		Stroka.push(yy)
	})
	Zagolovok = []
	document.querySelectorAll(".zgl").forEach((e,i)=>
	{
		let yy=[]
		e.querySelectorAll(".inp").forEach((ee)=>
		{
			let x = ee.textContent.split("|")
			if (x.length>1) ee=x
			else ee = (isN(ee.textContent)) ? Number(ee.textContent) : ee.textContent
			yy.push(ee)
		})
		Zagolovok.push(yy)
	})
///////////////////////////////////
	cont.innerHTML = ""
	for (let i = 0; i < iteraciya; i++)
	{
		cont.innerHTML += "<div id=i"+ i +" class=blk contenteditable><pre class=h>"+ fish(1) +"</pre><pre class=h2>"+ fish(2) +"</pre><pre class=h3>"+ fish(2) +"</pre><pre class=t>"+ fish(3) +"</pre></div>"
	}
}

bCreate.addEventListener("click", onCreate)
document.addEventListener("paste", OnPaste)
document.addEventListener("input", OnInput)
document.addEventListener("keypress", (e) => {if(e.keyCode==13) e.preventDefault()})

for(let i=0; i<Slova.length; i=i+5)
{
	slhtml += "<div class=\"lin slova\"><span class=num>"+ i/5 +"</span>"
	for(let ii=0; ii<5; ii++) slhtml += "<span class=inp contenteditable>" + Slova[i+ii] + "</span>"
	slhtml += "</div>"
}
slovar.innerHTML = slhtml

for(let i=0; i<Vstavka.length; i=i+5)
{
	vshtml += "<div class=\"lin vstavka\">"
	for(let ii=0; ii<5; ii++) vshtml += "<span class=inp contenteditable>" + Vstavka[i+ii] + "</span>"
	vshtml += "</div>"
}
vstavka.innerHTML = vshtml

for(let i=0,txt; i<Stroka.length; i++)
{
	prdhtml += "<div class=\"lin prd\">"
	for(let ii=0; ii<Stroka[i].length; ii++) 
	{
		txt =  Stroka[i][ii]
		if (typeof txt == "object") txt = txt.join("|")
		prdhtml += "<span class=\"str inp\" contenteditable>" + txt + "</span>"
	}
	prdhtml += "</div>"
}
prd.innerHTML = prdhtml

for(let i=0,txt; i<Zagolovok.length; i++)
{
	zglhtml += "<div class=\"lin zgl\">"
	for(let ii=0; ii<Zagolovok[i].length; ii++) 
	{
		txt =  Zagolovok[i][ii]
		if (typeof txt == "object") txt = txt.join("|")
		zglhtml += "<span class=\"str inp\" contenteditable>" + txt + "</span>"
	}
	zglhtml += "</div>"
}
zgl.innerHTML = zglhtml