import { log, strToObjs, observeProp } from '..functions';
import { attr } from '../dynamic';

attr('yo-html', function ($element, $scope, $expr) {
  
  let
    set = () => {
      let value = $scope.$eval($expr) || '';
      $element.innerHTML = value;
    };

  strToObjs($expr, $scope)
    .forEach(obj => Object.observe( obj, x => set()));
  
  set();
});
