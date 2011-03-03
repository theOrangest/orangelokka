//
// base on http://d.hatena.ne.jp/cheesepie/20070131/1170172709
// original doesn't run, so modified
//

function Inflector() {}

Inflector.prototype.pluralRules = {
  pluralRules : {
    '/(s)tatus$/i':'$1tatuses',
    '/^(ox)$/i':'$1en',
    '/([m|l])ouse$/i':'$1ice',
    '/(matr|vert|ind)ix|ex$/i':'$1ices',
    '/(x|ch|ss|sh)$/i':'$1es',
    '/(r|t|c)y$/i':'$1ies',
    '/(hive)$/i':'$1s',
    '/(?:([^f])fe|([lr])f)$/i':'$1$2ves',
    '/(.*)sis$/i':'$1ses',
    '/([ti])um$/i':'$1a',
    '/(buffal|tomat)o$/i':'$1oes',
    '/(bu)s$/i':'$1ses',
    '/(alias)/i':'$1es',
    '/(octop|vir)us$/i':'$1i',
    '/(.*)s$/i':'$1s',
    '/(.*)/i':'$1s'
  },
  singularRules : {
    '/(s)tatuses$/i':'$1tatus',
    '/^(ox)en$/i':'$1',
    '/([m|l])ice$/i':'$1ouse',
    '/(matr)ices$/i':'$1ix',
    '/(vert|ind)ices$/i':'$1ex',
    '/(cris|ax|test)es$/i':'$1is', 
    '/(x|ch|ss|sh)es$/i':'$1',
    '/(r|t|c)ies$/i':'$1y',
    '/(movie)s$/i':'$1',
    '/(hive)s$/i':'$1',
    '/([^f])ves$/i':'$1fe',
    '/([lr])ves$/i':'$1f',
    '/(analy|ba|diagno|parenthe|synop|the)ses$/i':'$1sis',
    '/([ti])a$/i':'$1um',
    '/(buffal|tomat)oes$/i':'$1o',
    '/(bu)ses$/i':'$1s',
    '/(alias)es/i':'$1',
    '/(octop|vir)i$/i':'$1us',
    '/(.*)s$/i':'$1',
    '/(.*)/i':'$1'
  },
  uninflected : [
    'deer', 'fish', 'measles', 'ois', 'pox', 'rice', 'sheep', 'Amoyese', 'bison', 'bream', 'buffalo', 'cantus', 'carp', 'cod', 'coitus', 'corps', 'diabetes', 'elk', 'equipment', 'flounder', 'gallows', 'Genevese', 'Gilbertese', 'graffiti', 'headquarters', 'herpes', 'information', 'innings', 'Lucchese', 'mackerel', 'mews', 'moose', 'mumps', 'news', 'nexus', 'Niasese', 'Pekingese', 'Portuguese', 'proceedings', 'rabies', 'salmon', 'scissors', 'series', 'shears', 'siemens', 'species', 'testes', 'trousers', 'trout', 'tuna', 'whiting', 'wildebeest', 'Yengeese'
  ],
  pluralIrregular : {
    'atlas':'atlases',  'child':'children',
    'corpus':'corpuses', 'ganglion':'ganglions',
    'genus':'genera', 'graffito':'graffiti',
    'leaf':'leaves', 'man':'men', 
    'money':'monies', 'mythos':'mythoi', 
    'numen':'numina', 'opus':'opuses',
    'penis':'penises', 'person':'people',
    'sex':'sexes', 'soliloquy':'soliloquies',
    'testis':'testes', 'woman':'women', 
    'move':'moves'
  },
  singularIrregular : {
    'atlases':'atlas', 'children':'child',
    'corpuses':'corpus', 'ganglions':'ganglion',
    'genera':'genus', 'graffiti':'graffito',
    'leaves':'leaf', 'men':'man', 
    'monies':'money', 'mythoi':'mythos',
    'numina':'numen', 'opuses':'opus',
    'penises':'penises', 'people':'person',
    'sexes':'sex', 'soliloquies':'soliloquy',
    'testes':'testis', 'women':'woman',
    'moves':'move'
  }
}

Inflector.prototype.pluralize = function(word) {
  var word = word;
  for(i in this.pluralRules['uninflected']) {
    if(word.toLowerCase() == this.pluralRules['uninflected'][i]){
      return word;
    }
  }
  for(i in this.pluralRules['pluralIrregular']) {
    if(word.toLowerCase() == i) {
      return word = this.pluralRules['pluralIrregular'][i];
    }
  }
  for(i in this.pluralRules['pluralRules']) {
    try{
      var rObj = eval("new RegExp(" +i+ ");");
      if(word.match(rObj)) {
        word = word.replace(rObj, this.pluralRules['pluralRules'][i]);
        return word;
      }
    }catch(e){
      alert(e.description);
    }
  }
  return word;
}

Inflector.prototype.singularize = function(word) {
  var word = word;
  for(i in this.pluralRules['uninflected']) {
    if(word.toLowerCase() == this.pluralRules['uninflected'][i]){
      return word;
    }
  }
  for(i in this.pluralRules['singularIrregular']) {
    if(word.toLowerCase() == i) {
      return word = this.pluralRules['singularIrregular'][i];
    }
  }
  for(i in this.pluralRules['singularRules']) {
    try{
      var rObj = eval("new RegExp(" +i+ ");");
      if(word.match(rObj)) {
        word = word.replace(rObj, this.pluralRules['singularRules'][i]);
        return word;
      }
    }catch(e){
      //alert(e.description);
    }
  }
  return word;
}

Inflector.prototype.addPluralRule = function(pattern, replace) {
  this.pluralRules['pluralRules']["'"+pattern+"'"] = "'"+replace+"'";
}
Inflector.prototype.addSingularRule = function(pattern, replace) {
  this.pluralRules['singularRules']["'"+pattern+"'"] = "'"+replace+"'";
}
Inflector.prototype.addUninflectedRule = function(pattern) {
  this.pluralRules['uninflected'].push("'"+pattern+"'");
}
Inflector.prototype.addPluralIrregularRule = function(pattern, replace) {
  this.pluralRules['pluralIrregular']["'"+pattern+"'"] = "'"+replace+"'";
}
Inflector.prototype.addSingularIrregularRule = function(pattern, replace) {
  this.pluralRules['sinularIrregular']["'"+pattern+"'"] = "'"+replace+"'";
}
