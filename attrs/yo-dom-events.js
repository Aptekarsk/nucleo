import { log, attr, unselectable } from '../functions';
import { attr } from '../dynamic';

attr( 'yo-click', ($element, $scope, $expr) =>
      $element.on('click', ($event) => 
                  $scope.$eval( $expr, { $event } )));


attr('yo-hover', ($element, $scope, $expr) =>
     $element.on('mouseover', ($event) =>
                 $scope.$eval( $expr, { $event } )));

attr('yo-blur', ($element, $scope, $expr) =>
     $element.on('mouseleave', ($event) =>
                 $scope.$eval( $expr, { $event } )));


attr('yo-keydown', ($element, $scope, $expr) =>
     $element.on('keydown', ($event) =>
                 $scope.$eval( $expr, { $event } )));


attr('yo-dragstart', ($element, $scope, $expr) => {
  
  let
    handler = ($event) => {
      $element.off('mousemove', handler);
      $scope.$eval($expr, { $event });
    };
  
  $element.on('mousedown',  $event =>
              $element.on('mousemove', handler));

  window.on('mouseup',  $event =>
            $element.off('mousemove', handler));

});


attr('yo-drag', ($element, $scope, $expr) => {
  
  let
    startX, startY, lastMoveTime, dragTimeout = 10;

  let
    handler = ($event) => {
    
    let
      t = Date.now();
    
    if(t < (lastMoveTime + dragTimeout))
      return;

    if(startX == null || startY == null)
      window.off('mousemove', handler);
    
    lastMoveTime = t;
    
    let
      dx = ($event.clientX - startX)
    , dy = ($event.clientY - startY)
    , $drag = { dx, dy };
    
    $scope.$eval($expr, { $drag, $event });
    
  };
  
  $element.on('mousedown',  $event => {
    
    lastMoveTime = Date.now();
    
    [startX, startY] = [ $event.clientX, $event.clientY ];
    
    window.on('mousemove',  handler);
    
  });

  window.on('mouseup',  $event => {
    
    window.off('mousemove', handler);
    
    [startX, startY] = [null, null];
    
  });

  unselectable($element);
  
});

