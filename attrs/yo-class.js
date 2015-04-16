import { log, strToObjs  } from '../functions';
import { attr } from '../dynamic';

attr('yo-class', function ($element, $scope, $expr) {
  let
    set;
  
  if( /\s*\{.*\}\s*/.test($expr) )
    
    set = () => {
      
      let
        classes = $scope.$eval($expr);
      
      Object.keys(classes)
        .forEach( key => {
          
          if(classes[key])
            $element.classList.add(key);
          else
            $element.classList.remove(key);
          
        });
    };
  
  else
    set = () => $element.className = ( $scope.$eval($expr) || '' );
    
  strToObjs($expr, $scope)
    .forEach(obj => Object.observe( obj, o => set() ) );
  
  set();
  
});
