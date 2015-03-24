module.exports = function() {
  
  var handlers = []

  this.on = function( type, callback ) {
    handlers.push({
      type: type,
      callback: callback
    })
    return this
  }

  this.off = function( type, callback ) {
    var i = 0
    var len = handlers.length
    var ev
    var filtered = []
    for( ; i<len; i++) {
      ev = handlers[i]
      if (!( ev === undefined || ( ev.type == type && ( typeof callback == 'undefined' || callback == ev.callback ) ) ))
        filtered.push(ev)
    }
    handlers = filtered
    return this
  }

  this.once = function( type, callback ) {
    var fn = function() {
      callback.call( this )
      this.off( type, fn )
    }.bind(this)
    return this.on( type, fn )
  }

  this.trigger = function( type, params, context ) {
    context = context || this
    var i = 0
    var len = handlers.length
    var ev
    for ( ; i < len; i++ ) {
      ev = handlers[i]
      if ( ev && ev.type == type )
        ev.callback.call(context, params)
    }
    return this
  }

  this.getEventHandlers = function() {
    return handlers
  }

  return this
}

module.exports.mixin = function(scope) {
  return module.exports.call(scope)
}
