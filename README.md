Events
------

Simple event interface, suitable for prototype mixin.

Example:

    var GreatStuff = function() {}

    // apply the mixin
    Events.call(GreatStuff.prototype)

    GreatStuff.prototype.whatever = function() {
      this.trigger('whatever', { foo: 'bar' }
    }

    // [...]

    var stuff = new GreatStuff()
    stuff.on('whatever', function(e) {
      console.log(e.foo) // "bar"
    })
    stuff.whatever()

Now your class will implement a simple event interface.

Methods:

- on(type, callback)
- off(type, callback)
- trigger(type, params)
- once(type, callback)