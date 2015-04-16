import { log, strToObjs, observeProp } from '../functions';
import { attr } from '../dynamic';

attr('yo-text', function ($element, $scope, $expr) {
  
  let
    set = () => {
      let value = $scope.$eval($expr);
      if (value == null) value = '';
      $element.innerText = value;
      $element.textContent = value;
    };

  strToObjs($expr, $scope)
    .forEach(obj => Object.observe( obj, x => set() ));
  
  set();
});
