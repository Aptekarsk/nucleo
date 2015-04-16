let
  DEBUG = true;

export let log = (DEBUG && console && console.log) ? console.log.bind(console) : function () {};

export function objToLists (object) {
  // Object -> [Array, Array]
  
  let
    keys = []
  , values = [];
  
  for (let key in object) {
    keys.push(key);
    values.push(object[key]);
  }
  
  return [keys, values];
}

export function getParentByTagName (element, tagName) {
  switch (true) {
  case !element : return null;
  case element.tagName.toLowerCase() == tagName.toLowerCase : return element;
    default : return getParentByTagName(element.parentNode, tagName);
  }
}

export function strToPaths (x) {
  let
    rx = /([\$_a-zA-Z0-9\.]+\.[\$_a-zA-Z0-9]+)/gi
  , res = x.match(rx);
  
  return unique(res.map(x => x.replace(/\.[^\.]+$/gmi, '')));
}

export function strToObjs (str, $scope) {
  let
    paths = strToPaths(str);
  
  if(paths && paths.length > 0)
    
    return paths.map( path => $scope.$eval(path));
  
  else
    
    return [];
}

export function pathAndName (str) {
  let
    initial, last, obj;
  
  [,initial, last] = /^(.*)\.([^\.]*)$/gi.exec(str);
  
  return [initial, last];
  
}

export function unique (arr) {
  let
    u = {}
  , a = [];
  
  arr.forEach(it => {
    if(!u.hasOwnProperty(it)) {
      a.push(it);
      u[it] = 1;
    }
  });
  
  return a;
}

export function observeProp (o, key, fn) {
  let
    update = Array.from(o).find( it => it.name == key );
  
  if( update )
    fn(update.object[update.name], update.oldValue);
  
};

export function scrollToBottom (el) {
  if( el )
    el.scrollTop = el.scrollHeight;
  
}

export function emptyImg ( el ) {
  
  let
    img = document.createElement('img');
  
  img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  
  return img;
}

export function unselectable (node) {

  if( node.nodeType == 1) {
    node.setAttribute('unselectable', true);
    node.classList.add('unselectable');
  }

}
