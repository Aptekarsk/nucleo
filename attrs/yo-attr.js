import { log, strToObjs, observeProp } from 'nucleo';
import { attr } from '../dynamic';

attr('yo-attr', function ($element, $scope, $expr) {
  let
    set = () => {
      let
        attrs = $scope.$eval($expr);
      
      Object.keys(attrs)
        .forEach( key =>
          $element.setAttribute(key, attrs[key]) );
      
    };

  strToObjs($expr, $scope)
    .forEach(obj => 
      Object.observe( obj, o => set() ) );
  
  set();
  
});
