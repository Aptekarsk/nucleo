import { Scope } from './scope';

let attrs = new Object();

function applyAttr ($element, $scope, $key) {
  let
    $fn = attrs[$key]
  , $expr = $element.getAttribute($key);

  $element.$$attrs = $element.$$attrs || [];
  
  if($element.$$attrs.indexOf($key) >= 0)
    return;

  if ( $fn && $expr ) {
    $element.$$attrs.push($key);
    new $fn( $element, $scope, $expr ); 
  }
  
}

function dynamic ($element) {
  let
    $scope = $element.scope;
  
  if($scope)
    
    Object.keys( attrs ).forEach( key => {
      
      if($element.getAttribute(key))
        applyAttr( $element, $scope, key );
      
      Array.from( $element.querySelectorAll( `[${key}]` ))
        .forEach( it => {
          let
            scope = (Scope.prototype.$get(it) || $scope);
          applyAttr( it, scope, key );
        });
    });
}

function attr (key, fn) {
  attrs[key] = fn;
}  

export { dynamic as dynamic }
export { attr as attr }
