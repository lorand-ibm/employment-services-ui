const data_fi = [
  { type: "Hero", title:'Työllisyyden kuntakokeilu alkaa maaliskuussa',
    text: 'Helsingin työllisyyspalveluiden tavoitteena on edistää nykyistä tehokkaammin työttömien työnhakijoiden työllistymistä ja koulutukseen ohjautumista, sekä tuoda uusia ratkaisuja osaavan työvoiman saatavuuteen.' },
    { type: "Info", title: "Helsingin työllisyyspalvelujen varsinaiset sivut aukeavat maaliskuussa 2021. ",
        text: "Sillä välin voit tutustua yleisimpiin kysymyksiin työllisyyden kuntakokeilusta."},
    { type: "Subheading", title: "Lyhyt esittely", text: ''},
    { type: "Text", title: "", text: 'Työllisyyden kuntakokeilu tuo Helsingin työllisyyspalveluiden asiakkaaksi liki 50 000 helsinkiläistä työnhakijaa TE-toimistolta. Muutos astuu voimaan 1.3.2020. Muutoksen myötä TE-toimistosta siirtyy kaupungille myös noin 250 työntekijää sekä toimitiloja Itäkeskuksesta ja Pasilasta.'},

    { type: "Subheading", title: "Mikä työllisyyden kuntakokeilu?", text: ''},
    { type: "Text", title: "",
        text: 'Työllisyyden kuntakokeilu on 2,5 vuoden mittainen valtakunnallinen hanke, jossa osa TE-toimiston lakisääteisistä työllisyyspalveluista siirtyy kunnan järjestettäväksi. Kuntakokeilussa on mukana 125 kuntaa ja niiden muodostamat 26 kokeilualuetta. Helsinki on yksi kokeilualueista yksinään. Pääkaupunkiseudulla on Helsingin lisäksi Espoon sekä Vantaa-Keravan kokeilualueet. '},
    { type: "Accordion", title: "Miksi tämä järjestetään?  ",
        text: 'Kuntakokeilun tarkoitus on parantaa työllisyyspalveluiden vaikuttavuutta sekä työnhakijoiden palveluvalikoimaa ja asiakaskokemusta. Tämä on tarkoitus tehdä mm. sujuvoittamalla kuntien tarjoamien palvelujen äärelle pääsyä. Vaikuttavuutta yritetään parantaa yhdistämällä kuntien ja valtion henkilökuntaa, rahoitusta ja tiloja työllisyydenhoidossa. '},
    { type: "Accordion", title: "Koskeeko tämä minua?",
        text: 'Kuntakokeilu ja palvelujen siirtyminen Helsingin kaupungille koskee todennäköisesti sinua jos olet helsinkiläinen työtön työnhakija tai osallistut työllistämispalveluun ja sinua koskee jokin seuraavista: \n<br>' +
            '\n<br><ul>' +
            '<li>olet alle 30-vuotias \n<br>' +
            'tai \n<br>' +
            '\n<br>' +
            '<li>olet vieraskielinen. Äidinkielesi on joku muu kuin suomi. \n<br>' +
            'tai \n<br>' +
            '\n<br>' +
            '<li>sinulla ei ole oikeutta ansiopäivärahaan. Saat esimerkiksi Kelan työmarkkinatukea, toimeentulotukea tai sairaspäivärahaa. \n<br>' +
            '\n<br></ul>' +
            'Saat vielä henkilökohtaisesti kirjeen TE-toimistosta sekä tiedon Oma asiointi -palvelussa mikäli siirryt kuntakokeiluun. '},

    { type: "Subheading", title: "Muutoksen vaikutukset minuun? ", text: ''},
    { type: "Accordion", title: "Milloin kokeilu on käynnissä?",
        text: "Kuntakokeilu on käynnissä 1.3.2021 – 30.6.2023." },
  { type: "Accordion", title: "Vaikuttaako muutos minun työttömyysturvaani? ",
        text: 'Muutos ei vaikuta jo myönnettyyn työttömyysturvaasi. \n<br>' +
            '\n<br>' +
            'Työllisyyden kuntakokeilun alkaessa TE-palvelujen työttömyysetuutesi maksajalle (KELA tai työttömyyskassa) antama työvoimapoliittinen lausunto jää voimaan, kun asiakkuutesi siirtyy Helsingin työllisyyspalvelujen piiriin. Kuntakokeilu ei vaikuta työttömyysturva-asiasi käsittelyyn Kelassa tai työttömyyskassasi. Uudistuksen ei pitäisi vaikuttaa suuresti työttömyysetuutesi hakemisen tai myöntämisen aikatauluun Kelasta tai työttömyyskassasta.  \n<br>' +
            ' \n<br>' +
            'Muutoksen alkuvaiheessa kaupungin palvelu voi olla hivenen ruuhkautunut uusien päätösten tekemisen osalta. Sinun kannattaa välttää päätöksiä ja hyväksyntää vaativia toimenpiteitä juuri siirtymäaikana, jos siihen suinkin voit itse vaikuttaa.'},

    { type: "Accordion", title: "Mitä minun tarvitsee tehdä tämän muutoksen takia?  ",
        text: 'Työnhakijana sinun ei tarvitse tehdä mitään muutoksen vuoksi.  \n<br>' +
            '\n<br>' +
            'Aiemmat työllistymissuunnitelmasi tai muut suunnitelmasi ovat edelleenkin voimassa. Kuntakokeilualueesi työllisyyspalvelut eli helsinkiläisten osalta Helsingin työllisyyspalvelut ovat yhteydessä jokaiseen työnhakija-asiakkaaseen heti, kun uusi vastuuasiantuntija on valittu. Valinnan yhteydessä lähetämme sinulle lisätietoa Helsingin työllisyyspalvelujen palveluista ja asiakkuudestasi.  '},
    { type: "Accordion", title: "Onko minulla vastuuasiantuntija jatkossakin? Vaihtuuko asiantuntijani? ",
        text: 'Jatkossakin liki jokaisella työnhakija-asiakkaalla on oma vastuuasiantuntija. \n<br>' +
            '\n<br>' +
            'Vastuuasiantuntijasi todennäköisesti vaihtuu, kun palvelu siirtyy kaupungille. Uusi vastuuasiantuntijasi määritellään siirron jälkeen niin pian kuin mahdollista. Saat tiedon vastuuasiantuntijastasi sekä kirjeitse että Oma asiointi -palvelussa heti kun tämä on tehty. Saat tämän tiedon siinäkin tapauksessa, että vastuuasiantuntijasi ei vaihdu. \n<br>' +
            '\n<br>' +
            'Voit odottaa tietoa vastuuasiantuntijastasi Helsingin työllisyyspalveluilta. '},
    { type: "Accordion", title: "Rajoittaako tämä jotenkin asiointiani? ",
        text: 'Kuntakokeilun myötä asioit jatkossa vain oman virallisen asuinkuntasi työllisyyspalveluissa.  \n<br>' +
            '\n<br>' +
            'Esimerkiksi: Helsinkiläinen asuu lähempänä Vantaan TE-palveluja kuin Helsingin TE-palveluja, ja hän on aiemmin asioinut siellä. Häntä ei voida enää palvella Vantaan TE-palveluissa kuntakokeilun aikana.  \n<br>' +
            ' \n<br>' +
            'Työnhakijoita, jotka ovat kuntakokeilun asiakkaita, voidaan palvella vain kotikunnan työllisyyspalveluissa.  '},
    { type: "Accordion", title: "Muuttuuko saamani palvelut?",
        text: 'Kuntakokeilun asiakkaana saat samoja palveluita kuin aiemminkin olet saanut TE-palveluista. Helsingin kaupungin palvelujen osalta pienet muutokset ovat mahdollisia kun asiakasmäärä muuttuu huomattavasti. \n<br>' +
            ' \n<br>' +
            'Työllisyyden kuntakokeilun aikana kehitämme uusia palveluja ja ratkaisuja työllisyydenhoitoon, sekä vahvistamme yhteistyötä mm. sosiaali- ja terveyspalvelujen ja kasvatus- ja koulutuspalvelujen kanssa työllistämisen edistämiseksi. Palvelumahdollisuutesi siis voivat laajentua kuntakokeilun aikana. '},
    { type: "Accordion", title: "Olen TYP-asiakas. Muuttuuko palveluni?",
        text: 'Saat TYP-palvelua jatkossakin, mutta se järjestetään kuntakokeilussa eri tavalla kuin aiemmin. Tämä voi tarkoittaa, että asiointipisteesi tai vastuuasiantuntijasi voi muuttua.  \n<br>' +
            '\n<br>' +
            'Laki työllistymistä edistävästä monialaisesta yhteispalvelusta ei muutu ja kuntakokeilun aikana kutsumme näitä palveluja työhön kuntouttaviksi palveluiksi.  '},
    { type: "Accordion", title: "Millä kielillä saan palvelua? ",
        text: 'Saat suomen- ja ruotsinkielistä palvelua aina. Useimmiten saat palvelua ilman erityisjärjestelyjä myös englanniksi ilman ajanvarausta.   \n<br>' +
            ' \n<br>' +
            'Tulkkauspalvelut asioinnin avuksi järjestetään niitä tarvitseville kuten TE-palveluissakin.  '},

    { type: "Subheading", title: "Mistä saan palvelua? ", text: ''},
    { type: "Accordion", title: "Mistä saan palvelua, jos siirryn Helsingin työllisyyspalveluiden asiakkaaksi? Entä siirtymävaiheessa? ",
        text: '<b>Verkossa</b> voit käyttää TE-palvelujen ylläpitämää <a href="https://asiointi.mol.fi/omaasiointi/">Oma asiointi</a> -palvelua kuten ennenkin keskeytyksettä. \n<br>' +
            ' \n<br>' +
            '<b>Puhelimitse</b> saat työllisyyspalvelua keskeytyksettä TE-palvelujen ylläpitämästä asiakaspalvelunumerosta: <b>0295 025 500</b> (ma–pe klo 9.00–16.15)  \n<br>' +
            '\n<br>' +
            'Puhelinpalvelusta saat apua asiointiin, Oma asiointi -verkkopalvelun käyttöön ja työllistymiseen liittyviin asioihin. Tarvittaessa saat jatko-ohjauksen muihin sinulle sopiviin palveluihin. \n<br>' +
            ' \n<br>' +
            '\n<br>' +
            '<b>Saat aulapalvelua</b> työllisyyden kuntakokeilun käynnistyttyä seuraavissa osoitteissa:  \n<br>' +
            '\n<br><ul>' +
            '<li>Asiakkaankatu 3 Itäkeskuksessa  \n<br>' +
            '\n<br>' +
            '<li>Ratapihantie 7 Pasilassa \n<br>' +
            '\n<br>' +
            '<li>alle 30-vuotiaille Ohjaamo osoitteessa Fredrikinkatu 48 Kampissa.  \n<br>' +
            '\n</li></ul><br>' +
            'Lisäksi palvelua ajanvarauksella annetaan osoitteissa Viipurinkatu 2 ja Runeberginkatu 5. \n<br>' +
            ' \n<br>' +
            'Kasvokkain asiakaspalvelu toteutuu koronatilanteen salliessa.  \n<br>' +
            ' \n<br>' +
            '\n<br>' +
            '<b>Helsinki-infossa</b> saat palveluneuvontaa Helsingin palveluista, eli esimerkiksi aukioloaikatietoa tai muuta perustietoa.  \n<br>' +
            '\n<br>' +
            'Helsinki-infon puhelinnumero: <b>09 310 11 111</b> (ma–to klo 9–16 ja pe klo 10–15) \n<br>' +
            'Helsinki-infon <a href="https://www.hel.fi/kanslia/neuvonta-fi"/>chatti</a> (ma–to klo 9–16 ja pe klo 10–15) '},
    { type: "Accordion", title: "Mistä saan lisätietoa?",
        text: 'Voit lukea lisätietoja seuraavilta sivuilta:  \n<br>' +
            '\n<br>' +
            '<a href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/yritykset/tyollisyys/tyollisyyden-kuntakokeilu/">Työllisyyden kuntakokeilusta hel.fi -sivulla</a> \n<br>' +
            '<a href="https://tem.fi/tyollisyyskokeilut">Työllisyyden kuntakokeilusta työllisyys- ja elinkeinoministeriön sivulla </a>\n<br>' +
            '<a href="https://twitter.com/tyollisyyshki">Helsingin työllisyyspalveluiden twitter </a>\n<br>' +
            '\n<br>' +
            ' \n<br>' +
            'Seuraathan myös tämän sivun päivityksiä sekä mediaa, kuten lehtiä ja televisiouutisointia. \n<br>' +
            '\n<br>' +
            ' \n<br>' +
            'Voit myös lähettää sähköpostitse palautetta tai yleisluontoisia kysymyksiä Helsingin työllisyyspalveluille osoiteeseen <a href="mailto:tyollisyyspalvelut@hel.fi">tyollisyyspalvelut@hel.fi</a>. \n<br>' +
            '<b>Huom!</b> Sähköpostitse emme voi tarjota tunnistautumista edellyttävää henkilökohtaista asiakaspalvelua. Ethän lähetä meille sähköpostitse arkaluontoisia tietoja esimerkiksi terveydentilastasi tai elämäntilanteestasi tai henkilötietojasi. Voimme vastata sähköpostitse vain yleisluontoisiin kysymyksiin ja viedä palautetta eteenpäin. '},
    { type: "Accordion", title: "Mihin ilmoittaudun työttömäksi?  ",
        text: 'Työttömäksi ilmoittaudutaan jatkossakin TE-palvelujen kautta. Voit ilmoittautua työttömäksi Oma asiointi -palvelussa tai TE-palvelujen asiointipisteissä. TE-palvelut ohjaavat työllisyyden kuntakokeilujen asiakkaat työnhakijoiden kotikuntien työllisyyspalveluihin. ' +
            ''},

    { type: "Subheading", title: "Yhteenveto muilla kielillä", text: ''},
  { type: "PDF", title: "Af-Soomaali Somalia", text: 'Somalia.pdf'},
  { type: "PDF", title: "اللغة العربية Arabia", text: 'Arabia.pdf'},
  { type: "PDF", title: "বাংলা Bengali", text: 'Bengali.pdf'},
  { type: "PDF", title: "Eesti Viro", text: 'Viro.pdf'},
  { type: "PDF", title: "Englanti English", text: 'Englanti.pdf'},
  { type: "PDF", title: "España Espanja", text: 'Espanja.pdf'},
  { type: "PDF", title: " فارسی Farsi", text: 'Farsi.pdf'},
  { type: "PDF", title: "汉语 Kiina", text: 'Kiina.pdf'},
  { type: "PDF", title: "KURMANCÎ Kurmanji", text: 'Kurmanji.pdf'},
  { type: "PDF", title: "Nepali", text: 'Nepali.pdf'},
  { type: "PDF", title: "Sorani سۆرانی", text: 'Sorani.pdf'},
  { type: "PDF", title: "SQHIP Albania", text: 'Albania.pdf'},
  { type: "PDF", title: "Svenska Ruotsi", text: 'Ruotsi.pdf'},
  { type: "PDF", title: "ภาษาไทย Thai", text: 'Thai.pdf'},
  { type: "PDF", title: "TÜRKÇE Turkki", text: 'Turkki.pdf'},
  { type: "PDF", title: "русский Venäjä", text: 'Venaja.pdf'},
  { type: "PDF", title: "VIỆT NAM Vietnam", text: 'Vietnam.pdf'},


];

export default data_fi;
