const data_sv = [
    { type: "Hero", title:'De kommunala sysselsättningsförsöken ',
      text: "Helsingfors stads sysselsättningstjänster har som mål att effektivare än i dagsläget främja sysselsättning och tillgång till utbildning arbetslösa arbetssökande. Ett ytterligare mål är att utveckla nya lösningar för kompetent arbetskraft. "
    },
    { type: "Info", title: "Helsingfors sysselsättningstjänsters webbplats lanseras i mars. ",
        text: "Under tiden kan du läsa de vanligaste frågorna om sysselsättningsförsöket."},
    { type: "Subheading", title: "En kort presentation ", text: ''},
    { type: "Accordion", title: "En kort presentation ", text: 'Genom kommunförsöket med sysselsättning överförs närmare 50 000 arbetssökande i Helsingfors från arbets- och näringsbyrån till Helsingfors stads sysselsättningstjänster. Ändringen träder i kraft den 1 mars 2021. I och med ändringen överförs också omkring 250 anställda från arbets- och näringsbyrån till staden. Också arbets- och näringsbyråns verksamhetslokaler i Östra centrum och Böle övergår till staden.  '},
    { type: "Subheading", title: "Vad innebär kommunförsöken med sysselsättning?", text: ''},
    { type: "Accordion", title: "Vad är de kommunala sysselsättningsförsöken? ",
        text: 'Kommunförsöken med sysselsättning är ett 2,5 år långt nationellt projekt, där en del av arbets- och näringsbyråns lagstadgade sysselsättningstjänster överförs i kommunal regi. I försöken deltar 125 kommuner som bildar 26 försöksområden. I huvudstadsregionen deltar uöver Helsingfors också Esbo och Vanda-Kervo. '},
  { type: "Accordion", title: "Varför genomförs försöken?  ",
        text: 'Syftet med kommunförsöken är att effektivera sysselsättningstjänsterna. Ett ytterligare mål är att förbättra kundupplevelsen och serviceutbudet för arbetssökande. Detta är tänkt att bland annat göra tillgången till kommunens tjänster smidigare. Effektiviteten eftersträvas bland annat att förbättras genom finansiering, sammanföring av kommunens och statens anställda samt överföring av lokaler.  '},
  { type: "Accordion", title: "Gäller det här mig?",
        text: 'Kommunförsöken och överföringen av tjänsterna till Helsingfors stad gäller troligtvis dig om du bor i Helsingfors, är arbetslös arbetssökande eller deltar i sysselsättningstjänster och om \n' +
          '\n' +
          'du är under 30 år \n' +
          'eller \n' +
          '\n' +
          'du har ett främmande språk som modersmål. Du talar något annat språk som modersmål än finska eller svenska. \n' +
          'eller \n' +
          '\n' +
          'du inte har rätt till inkomstrelaterad dagpenning. Du får till exempel FPA:s arbetsmarknadsstöd, utkomststöd eller sjukdagpenning. \n' +
          '\n' +
          'Om du överförs till kommunförsöket kommer du att få ett individuellt meddelande från arbets- och näringsbyrån och i Mina e-tjänster. '},

    { type: "Subheading", title: "Vad betyder förändringen för mig? ", text: ''},
    { type: "Accordion", title: "Hur och när kommer den att ske? ",
        text: 'Riksdagen måste godkänna lagen om kommunförsök innan försöken kan komma igång. Helsingfors stad har berett sig på att försöken ska inledas i mars 2021. De som redan anmält sig som arbetssökande vid arbets- och näringsbyrån och som ingår i målgruppen kommer i så fall att överföras till Helsingfors sysselsättningstjänster runt den 1 mars.  \n' +
          '\n' +
          'Om du blir kund vid Helsingfors sysselsättningstjänster, får du ett individuellt meddelande efter att du förts över från arbets- och näringsbyrån. Informationen kommer också att finnas bland dina uppgifter i Mina e-tjänster. Du kan fortsätta använda Mina e-tjänster på webbplatsen TE-tjanster.fi. Efter att överföringen gjorts kommer du att kontaktas av Helsingfors sysselsättningstjänster. '},
  { type: "Accordion", title: "Påverkar det här mitt arbetsmarknadstöd? ",
        text: 'Ändringen inverkar inte på arbetsmarknadstöd som redan beviljats. \n' +
          '\n' +
          'När kommunförsöken med sysselsättning inleds förblir det arbetskraftspolitiska utlåtande som arbets- och näringstjänsterna har gett betalaren av din arbetslöshetsförmån (FPA eller en arbetslöshetskassa) i kraft. Det påverkas inte av att din kundrelation överförs till Helsingfors sysselsättningstjänster. Försöket påverkar inte behandlingen av ditt ärende vid FPA eller hos arbetslöshetskassan, och det borde inte påverka den tidtabell som gäller ansökan om eller beviljande av arbetslöshetsförmåner vid FPA eller arbetslöshetskassorna.  \n' +
          ' \n' +
          'I början av processen kan det förekomma dröjsmål i fråga om nya beslut som fattas av stadens sysselsättningstjänster. Det kan vara en bra idé att undvika beslut och åtgärder som kräver godkännande under övergångstiden, om det är något du kan påverka.  '},
    { type: "Accordion", title: "Vad behöver jag göra med tanke på förändringen?  ",
        text: 'Förändringen kräver inga åtgärder av dig som arbetssökande.  \n' +
          '\n' +
          'Dina tidigare sysselsättningsplaner eller andra planer gäller fortfarande. Sysselsättningstjänsterna i ditt försöksområde, det vill säga Helsingfors sysselsättningstjänster, kontaktar alla arbetssökande kunder genast när den nya ansvariga sakkunniga valts. I samband med att valet gjorts skickar vi dig mer information om tjänsterna och om din kundrelation vid Helsingfors sysselsättningstjänster.'},
  { type: "Accordion", title: "Kommer jag att ha en ansvarig sakkunnig också i fortsättningen? Får jag en ny sakkunnig?",
        text: 'I fortsättningen kommer så gott som alla arbetssökande kunder att ha en egen ansvarig sakkunnig. \n' +
          '\n' +
          'Det är troligt att du får en ny ansvarig sakkunnig när sysselsättningstjänsterna förs över till staden. Din nya sakkunniga kommer att utses så fort som möjligt efter överföringen. Du får information om den nya sakkunniga per post och i Mina e-tjänster på TE-tjanster.fi genast när den sakkunniga utsetts. Du får den här informationen även om personen inte byts ut. \n' +
          '\n' +
          'Du kan invänta information om den sakkunniga från Helsingfors sysselsättningstjänster.  '},
    { type: "Accordion", title: "Begränsar det här mina möjligheter att uträtta ärenden? ",
        text: 'Under kommunförsöket uträttas ärenden vid sysselsättningstjänsterna enbart i din officiella hemkommun.  \n' +
          '\n' +
          'Till exempel: En Helsingforsbo bor närmare arbets- och näringstjänsterna i Vanda än i Helsingfors, och har därför hittills uträttat ärenden i Vanda. Så länge försöken pågar kan den här personen inte uträtta sina ärenden vid sysselsättningstjänsterna i Vanda.  \n' +
          ' \n' +
          'Arbetssökande som ingår i kommunförsöket kan enbart betjänas av sysselsättningstjänsterna i sin hemkommun.'},
    { type: "Accordion", title: "Förändras de tjänster jag får? ",
        text: 'Som kund inom kommunförsöket får du samma tjänster som du hittills fått vid arbets- och näringsbyrån. I fråga om Helsingfors stads tjänster kan det förekomma smärre förändringar, exempelvis på grund av att antalet kunder ökar kraftigt. \n' +
          ' \n' +
          'Medan kommunförsöket pågår tar vi fram nya sysselsättningstjänster och lösningar. Vi kommer bland annat att stärka samarbetet med social- och hälsovårdstjänsterna och med fostrans- och utbildningstjänsterna för att främja sysselsättningen. Tillgången till service kan alltså öka medan kommunförsöket pågår. '},
  { type: "Accordion", title: "Jag är TYP-kund. Förändras de tjänster jag får?",
        text: 'Du får TYP-service också i fortsättningen, men inom kommunförsöket kommer den att ordnas annorlunda än hittills. Detta kan medföra ändringar i fråga om din ansvariga sakkunniga eller det verksamhetsställe där du brukat uträtta ärenden.  \n' +
          '\n' +
          'Lagen om sektorsövergripande samservice som främjar sysselsättningen förändras inte. Medan kommunförsöket pågår kallar vi de här tjänsterna arbetsrehabiliterande tjänster.  '},
    { type: "Accordion", title: "Vilket språk kommer jag att betjänas på? ",
        text: 'Du kan alltid få service på finska och svenska. Oftast går det också att ordna service på engelska utan särskilda arrangemang och utan bokning. \n' +
          ' \n' +
          '\n' +
          'Tolkningstjänster ordnas för dem som behöver det, precis som vid arbets- och näringsbyrån.'},

    { type: "Subheading", title: "Var får jag service? ", text: ''},
    { type: "Accordion", title: "Var får jag service om jag överförs till Helsingfors sysselsättningstjänster? Och vad gäller för under övergångsperioden? ",
        text: 'På internet kan du utan avbrott använda arbets- och näringstjänsternas E-tjänster precis som hittills. \n' +
          ' \n' +
          'Per telefon får du utan avbrott sysselsättningsservice på arbets- och näringstjänsternas kundservicenummer: 295 025 500 (må–fr kl. 9.00–16.15)  \n' +
          '\n' +
          'I kundtjänsten får du hjälp med att uträtta ärenden, använda internettjänsten Mina e-tjänster och i alla frågor som gäller sysselsättning. Vid behov hänvisas du vidare till tjänster som passar dig bäst. \n' +
          ' \n' +
          '\n' +
          'Efter att kommunförsöket inletts får du service vid följande servicepunkter från och med början av 2021:  \n' +
          '\n' +
          'Kundgatan 3, Östra centrum  \n' +
          '\n' +
          'Bangårdsgatan 7, Böle \n' +
          '\n' +
          'för person under 30 år, Navigatorn på Fredriksgatan 48 i Kampen.  \n' +
          '\n' +
          'Med tidsbokning får du service på Viborgsgatan 2 och Runebergsgatan 5. \n' +
          ' \n' +
          'Fysisk kundtjänst ordnas alltefter coronasituationen.  \n' +
          ' \n' +
          '\n' +
          'Vid Helsingfors-info får du rådgivning och information om Helsingfors stads tjänster, till exempel öppettider eller annan nyttig information.  \n' +
          '\n' +
          'Helsingfors-infos telefonnummer: 09 310 11 111 (må–to kl. 9–16 och fr kl. 10–15) \n' +
          'Helsingfors-infos chatt (må–to kl. 9–16 och fr kl. 10–15) '},
    { type: "Accordion", title: "Var finns det mer information? ",
        text: 'Du kan läsa mer på följande sidor:  \n' +
          '\n' +
          'Om kommunförsöken med sysselsättning på hel.fi \n' +
          'Om kommunförsöken med sysselsättning på arbets- och näringsministeriets webbplats \n' +
          'Helsingfors stads sysselsättningstjänsters twitter \n' +
          '\n' +
          ' \n' +
          'Du kan också följa uppdateringarna på den här sidan och i medier, såsom dagstidningar och tv. \n' +
          '\n' +
          ' \n' +
          'Du kan skicka respons eller allmänna frågor per e-post till Helsingfors sysselsättningstjänster, tyollisyyspalvelut@hel.fi. \n' +
          'Obs! Vi kan inte per e-post ge personlig kundbetjäning som kräver identifiering. Skicka alltså inte konfidentiella uppgifter per e-post – till exempel inte sådant som handlar om ditt hälsotillstånd, din livssituation eller dina personuppgifter. Vi kan bara besvara allmänna frågor per e-post och vidarebefordra respons. '},
  { type: "Accordion", title: "Var ska jag anmäla mig som arbetslös? ",
        text: 'Också i fortsättningen anmäler du dig som arbetslös vid arbets- och näringsbyråns tjänster. Du kan anmäla dig som arbetslös i Mina e-tjänsterna eller vid arbets- och näringsbyråernas serviceställen. Därifrån hänvisas kunder som omfattas av sysselsättningsförsöken vidare till sysselsättningstjänsterna i kundernas hemkommuner. '},

  { type: "Subheading", title: "Sammanfattning på andra språk", text: ''},
  { type: "PDF", title: "Af-Soomaali Somalia", text: 'Af-Soomaali Somalia.pdf'},
  { type: "PDF", title: "اللغة العربية Arabia", text: 'اللغة العربية Arabia.pdf'},
  { type: "PDF", title: "বাংলা Bengali", text: 'বাংলা Bengali.pdf'},
  { type: "PDF", title: "Eesti Viro", text: 'Eesti Viro.pdf'},
  { type: "PDF", title: "English Englanti", text: 'English Englanti.pdf'},
  { type: "PDF", title: " فارسی Farsi", text: ' فارسی Farsi.pdf'},
  { type: "PDF", title: "汉语 Kiina", text: '汉语 Kiina.pdf'},
  { type: "PDF", title: "KURMANCÎ Kurmanji", text: 'KURMANCÎ Kurmanji.pdf'},
  { type: "PDF", title: "Nepali", text: 'Nepali.pdf'},
  { type: "PDF", title: "SQHIP Albania", text: 'SQHIP Albania.pdf'},
  { type: "PDF", title: "Sorani سۆرانی", text: 'Sorani سۆرانی.pdf'},
  { type: "PDF", title: "ภาษาไทย Thai", text: 'Thai.pdf'},
  { type: "PDF", title: "TÜRKÇE Turkki", text: 'TÜRKÇE Turkki.pdf'},
  { type: "PDF", title: "русский Venäjä", text: 'Venaja.pdf'},
  { type: "PDF", title: "VIỆT NAM Vietnam", text: 'Vietnam.pdf'},

];

export default data_sv;
