import { log, pathAndName, observeProp } from '../functions';
import { attr } from '../dynamic';

attr('yo-model', function ($element, $scope, $expr) {
  
  setTimeout (( () => {
    // Таймаут - быстрый хак в отсутствии приоритетов у атрибутов
    
    let
      [path, name] = pathAndName($expr)
    , obj;
    
    if (!path || !name)
      throw `Направильный синтаксис модели ${$expr}`;

    obj = $scope.$eval(path);

    if(!obj)
      throw `Нет такого объекта ${$path}`;
    
    function setElement (value){
      
      if( $element.scope.model != value )
        $element.scope.model = value;
    }
    
    function setModel (value) {
      
      if(obj[name] !== value)
        obj[name] = value;
    }

    Object.observe( obj, o => 
                    observeProp(o, name, it => setElement(it)));
    
    Object.observe( $element.scope, o => 
                    observeProp(o, 'model', it => setModel(it)));
    
  }), 100); 

  
});
