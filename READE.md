Events
------

Simple event interface, sutable for prototype mixin.

Example:

    var GreatStuff = function() {}

    // apply the mixin
    Events.call(GreatStuff.prototype)

    GreatStuff.prototype.whatever = function() {}

Now your class will implement a simple event interface.

Methods:

- on(type, callback)
- off(type, callback)
- trigger(type, params)
- once(type, callback)