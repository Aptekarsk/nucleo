import { dynamic } from '../dynamic';

export function render ($element, $scope = {}, $template = '') {
  
  if (!$element) return;
  
  if (typeof $template === 'string')
    $element.innerHTML = $template;
  
  else
    if (typeof $template === 'function')
    
    $element.innerHTML = $template($scope);

  setTimeout( (() => dynamic($element)), 100 );
  
  $element.emit('rendered');
}
