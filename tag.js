import { render } from './render';
import { Scope } from './scope';

export function tag (name, props = {}) {
  // String -> Object -> (Element)
  
  return document.registerElement( name, {
    
    prototype: Object.create(HTMLElement.prototype, {
      
      createdCallback: {
        
        value: function () {
          let
            self = this;

          if(props.isolated)
            
            self.scope = new Scope(props.scope || {});
          
          else {
            let
              currentScope = Scope.prototype.$get(self);
            
            if(currentScope)
              self.scope = currentScope.$new(props.scope || {});
            else
              self.scope =  new Scope(props.scope || {});
          }

          if(props.scope && (typeof props.scope === 'object'))
            Object.assign(self.scope, props.scope);

          if(props.template)
            self.template = props.template;

          self.render = function () {
            render(self, self.scope, self.template);
          };

          if (props.controller) {
            self.controller = new props.controller(self, self.scope);
          }
          
          if(self.template)
            self.render();

          self.emit('initialized');

        }
      }
      
      , attachedCallback: {
        
        value: function () {
          let
            self = this;
          
          if(this.scope) {
            // обновляем Scope для данной местности
            let
              parent = Scope.prototype.$get(self.parentNode);
            
            if( parent ) {
              this.scope.__proto__ = parent;
              this.scope.$parent = parent;
            }
          }
          
          this.emit('attached');
          
        }
      }
      , detachedCallback: {
        value: function () {
          this.emit('detached');
        }
      }
    })
  });
}

