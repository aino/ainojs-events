var Events = function() {
  
  var handlers = []

  this.on = function( type, handler ) {
    handlers.push({
      type: type,
      handler: handler
    })
    return this
  }

  this.off = function( type, handler ) {
    var i = handlers.length
    var ev
    while ( i-- ) {
      ev = handlers[i]
      if ( ev === undefined || ( ev.type == type && ( !handler || handler == ev.handler ) ) )
        handlers.splice(i, 1)
    }
    return this
  }

  this.once = function( type, handler ) {
    var fn = function() {
      handler.call( this )
      this.off( type, fn )
    }.bind(this)
    return this.on( type, fn )
  }

  this.trigger = function( type, params, context ) {
    context = context || this
    var i = 0
    var len = handlers.length
    var ev
    var obj = { type: type }
    if ( typeof params == 'object' ) {
      for( var prop in params )
        obj[prop] = params[prop]
    }
    for ( ; i < len; i++ ) {
      ev = handlers[i]
      if ( ev && ev.type == type )
        ev.handler.call(context, obj)
    }
    return this
  }
  return this
}

module.exports = Events