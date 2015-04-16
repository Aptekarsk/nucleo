import { log, objToLists } from './functions';

function getScope (element) {
  
  switch(true) {
  case (!element || element == null) : return null;
  case (typeof element.scope == 'object') : return element.scope;
  default: return getScope(element.parentNode);
  }
  
}

function evalIn ($scope, $expr, $args) {
  try {
    
    let
      keys, values, argString, fn;
    
    [ keys, values ] = objToLists($args);
    argString = keys.map(it => `'${ it }'`).join(',');
    fn = eval(`new Function( ${ argString } , " return (${ $expr }); ")`);
    
    return fn.apply($scope, values);
    
  } catch (e) {
    
    log(`evalIn ${$expr}`, e);
    throw e;
    
  }
}

export class Scope {
  
  constructor(props, parent) {
    if(parent) {
      this.prototype = parent;
      
      Object.defineProperty( this, '$parent', {
        writable: true
        , value: parent
      });
    }
    Object.assign(this, props || {});
    
    return this;
  }

  $new(props) {
    let
      Child = this.constructor;
      
    Child.prototype = this;
    
    return (new Child(props, this));
  }
  
  $get(element) {
    
    if(!element)
      return null;
    
    return getScope(element);
    
  }
  
  $eval($expr, args = {}) {
    let
      $args = { $scope: this };
      
    Object.assign($args, args);
    
    return ( evalIn(this, $expr, $args) );
    
  }
}
