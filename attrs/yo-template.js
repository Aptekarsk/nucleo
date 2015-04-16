import { log, Scope, render, $templates } from '../functions';
import { attr } from '../dynamic';

attr('yo-template', function ($element, $scope, $expr) {
  
  $element.template = $scope.$eval($expr, {$templates});
  
  if(!$element.template)
    throw `[yo-template] нет шаблона ${$expr}`;
  
  $element.render = function () {
    
    let
      scope = Scope.prototype.$get($element);
    
    render($element, scope, $element.template);
  };
  
  $element.render();
  
});
