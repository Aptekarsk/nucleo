import { log, strToObjs, observeProp } from '../functions';
import { attr } from '../dynamic';

attr('yo-bind', function ($element, $scope, $expr) {
  let
    strObj, strProp, obj;
  
  if($element.tagName.toLowerCase() != 'input')
    throw '[yo-bind] работает только с input';

  [, strObj, strProp] = /^(.*)\.(.*)$/.exec($expr);

  if(!strObj || !strProp)
    throw `[yo-bind] Что-то не так с моделью ${$expr}`;
  
  obj = $scope.$eval(strObj);
  
  let
    setValue = () => {
      
      let
        value = $scope.$eval($expr) || '';
      
      if($element.value != value)
        $element.value = value;
      
    };

  let setModel = () => {
    if(obj && strProp)
      obj[strProp] = $element.value;
  };

  strToObjs($expr, $scope)
    .forEach(obj => Object.observe( obj, x => setValue()));

  $element.on('change', $event => setModel() );
  
  $element.on('keyup', $event => setModel() );  

  if($element.value)
    setModel();
  else
    setValue();
  
});
