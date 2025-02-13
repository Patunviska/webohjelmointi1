// Yliluokka Henkilo
class Henkilo {
  constructor(etunimet, sukunimi, kutsumanimi, syntymavuosi) {
    this.etunimet = etunimet;
    this.sukunimi = sukunimi;
    this.kutsumanimi = kutsumanimi;
    this.syntymavuosi = syntymavuosi;
  }
}

// Aliluokka Urheilija, joka perii Henkilo-luokan
class Urheilija extends Henkilo {
  constructor(
    etunimet,
    sukunimi,
    kutsumanimi,
    syntymavuosi,
    kuva,
    paino,
    laji,
    saavutukset
  ) {
    super(etunimet, sukunimi, kutsumanimi, syntymavuosi);
    this._kuva = kuva;
    this._paino = paino;
    this._laji = laji;
    this._saavutukset = saavutukset;
  }

  get kuva() {
    return this._kuva;
  }

  set kuva(url) {
    this._kuva = url;
  }

  get paino() {
    return this._paino;
  }

  set paino(arvo) {
    if (arvo > 0) {
      this._paino = arvo;
    }
  }

  get laji() {
    return this._laji;
  }

  set laji(nimi) {
    this._laji = nimi;
  }

  get saavutukset() {
    return this._saavutukset;
  }

  set saavutukset(lista) {
    if (Array.isArray(lista)) {
      this._saavutukset = lista;
    }
  }
}

// esimerkkiurheilijat
const urheilija1 = new Urheilija(
  "Heimo",
  "Huima",
  "Heiluri",
  1962,
  "https://esimerkkisivu.fi/heimo.jpg",
  80,
  "Jalkapallo",
  ["World Cup 1977"]
);
const urheilija2 = new Urheilija(
  "Lauri",
  "Leipäjuusto",
  "Lalli",
  2000,
  "https://esimerkkisivu.fi/lalli.jpg",
  120,
  "Paini",
  ["Olympiakulta 2021", "MM-hopea 2022"]
);
const urheilija3 = new Urheilija(
  "Reino",
  "Isander",
  "Repe",
  1988,
  "https://esimerkkisivu.fi/heimo.jpg",
  135,
  "Tikanheitto",
  ["Maailman paras tikkamies 1990 - "]
);

// olioiden tulostus testaamisen vuoksi

console.log(urheilija1);
console.log(urheilija2);
console.log(urheilija3);
