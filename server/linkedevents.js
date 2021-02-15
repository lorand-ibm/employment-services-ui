const axios = require('axios')
let _ = require('lodash');
require('dotenv').config()

const url = 'https://api.hel.fi/linkedevents/v1/event/?publisher=ahjo:u02120030&keyword=yso:p9607';
const eventUrl = process.env.DRUPAL_URL + '/apijson/node/event';
const checkitEventUrl = eventUrl + '?fields[node--event]=field_last_modified_time,field_id,drupal_internal__nid&filter[field_id]=';

const allowedTags = ["Rekry", "Maahanmuuttajat", "Työhönohjaus", "etäosallistuminen", "työnhakijat" ];
const testData = {
  "data":
    {
      "type": "node--event",
      "attributes": {
        "title": "TestData",
        "field_id": "helsinki:af26adz2xm",
        "field_image_name": "Mehiläinen rekrytoi lähihoitajia",
        "field_image_url": "https://api.hel.fi/linkedevents/media/images/mehilainen2.jpg",
        "field_in_language": "https://api.hel.fi/linkedevents/v1/language/fi/",
        "field_last_modified_time": "2020-11-19T10:40:30.481286Z",
        "field_location": "https://api.hel.fi/linkedevents/v1/event/helsinki:af26adz2xm/",
        "field_publisher": "ahjo:u02120030",
        "field_short_description": {
          "value": "Tervetuloa töihin Mehiläisen sosiaalipalveluihin"
        },
        "field_text":  "<p>Tarjoamme koulutetuille hoitajille vakituisen työsuhteen Helsingissä, Espoossa ja Vantaalla sijaitsevissa hoivakodeissamme. Työsuhteen ehdot ja palkkaus määräytyvät yksityisen sosiaalipalvelualan työehtosopimuksen mukaan.</p><p>Toivomme, että haet meille töihin, vaikka osaamisessasi olisi vielä kehitettävää. Neuvomme ja opastamme sinua mielellämme työssäsi ja tuemme kehittymistäsi. Aikaisempaa kokemusta tärkeämpänä pidämme kiinnostustasi ikääntyneiden kanssa toimimiseen ja heidän hyvinvointinsa tukemiseen. Laatulupausten mukaisella toiminnalla<br>mahdollistamme jokaiselle asukkaalle yksilöllisen hyvän elämän ja sinä saat tehdä työtä viihtyisässä ja turvallisessa ympäristössä. </p><p>Mehiläisenä saat ison työnantajan henkilöstöedut, kuten liikuntasaldon, kattavan työterveyshuollon ja mahdollisuuden<br>osallistua säännöllisesti täydennyskoulutuksiin. Olemme joustava työnantaja, työajat voidaan sopia oman elämäntilanteesi mukaan. Meillä työn tekeminen saa olla hauskaa ja arvostamme asioiden eteenpäin viemistä ja meillä jokainen vaikuttaa yksikön toimintaan.</p><p>Voit hakea avoimia tehtäviä lähettämällä avoimen hakemuksen ja CV:n sähköpostilla osoitteeseen: hoivarekrytointi@mehilainen.fi</p><p>Rekrytilaisuuteen pääset osallistumaan alla olevasta linkistä.</p>"
        ,
        "field_title": "Nettirekry: Mehiläinen hakee lähihoitajia",
        "field_start_time": "2020-12-08T11:00:00Z",
        "field_end_time": "2020-12-08T12:00:00Z",
        "field_tags" : allowedTags,
        "path" : {"alias": "/nettirekry-mehilainen-hakee-lahihoitajia"}
      }
    }
}

const mapping = [
  ['title', 'name', 'fi'],
  ['field_id', 'id'],
  ['field_image_name', 'images', 'name'],
  ['field_image_url', 'images', 'url'],
  ['field_in_language', 'in_language', '@id'],
  ['field_location', '@id'],
  ['field_publisher', 'publisher'],
  ['field_short_description', 'short_description', 'fi'],
  ['field_text', 'description', 'fi'],
  ['field_title', 'name', 'fi'],
  ['field_start_time', 'start_time'],
  ['field_end_time', 'start_time'],
  ['field_last_modified_time', 'last_modified_time'],
]

const axiosConfig = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-type': 'application/vnd.api+json'
    },
    auth: {
      username: process.env.DRUPAL_API_LINKEDEVENTS_USER,
      password: process.env.DRUPAL_API_LINKEDEVENTS_PASS,
    }
}

async function makeRequests() {
  // Get linked events
  let [events] = await Promise.all([
    axios.get(url),
  ]);
  let d = events.data.data[0];

  // Check if it is already stored to Drupal
  const drupalUrl = checkitEventUrl + d.id;
  let [drupalEvent] = await Promise.all([
    axios.get(drupalUrl, axiosConfig),
  ]);

  if (drupalEvent.data.meta.count > 0 && d.last_modified_time === drupalEvent.data.data[0].attributes.field_last_modified_time ) {
    console.log('Event ' + d.id + ' [OK]');
    return;
  }

  // Get linked event tags:
  let attributes = {};

  let tagUrls = new Set();
  events.data.data.map((e) => {
    e.keywords.map((key) => {
      tagUrls.add(key['@id']);
    });
  });

  let tagPromises = [];
  tagUrls.forEach(key => {
    tagPromises.push(axios.get(key));
  });
  let tags = await Promise.all(tagPromises);
  let tagNames = _.map(tags, "data.name.fi");
  tagNames = _.intersection(tagNames, allowedTags);

  // Copy linked event fields to Drupal event attributes
  mapping.map((item, index) => {
    attributes[item[0]] = d[item[1]];
    if (item[4]) {
      attributes[item[0]] = d[item[1]][item[2]][item[3]][item[4]];
    }
    else if (item[3]) {
      attributes[item[0]] = d[item[1]][item[2]][item[3]];
    }
    else if (item[2]) {
      attributes[item[0]] = d[item[1]][item[2]]
      if (!attributes[item[0]]) {
        attributes[item[0]] = d[item[1]][0][item[2]];
      }
    }
  });

  attributes.path = {};
  let pathAlias = attributes['field_title'];
  attributes.path.alias = "/" + pathAlias.replace(/[\s:]/g, "-");
  attributes.field_tags = tagNames;

  const drupalData = {
    "data" : {
      "type" : "node--event",
      "attributes" : attributes
    }
  }


  // Post new event
  let [po] = await Promise.all([
    axios.post(eventUrl, drupalData, axiosConfig ),
  ]);

  //console.log(po)
}

const getLinkedEvents = () => {
  makeRequests();
}

module.exports = getLinkedEvents;
