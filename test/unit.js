var mocha = require('mocha')
var chai = require('chai')
var Events = require('../index')

var assert = chai.assert
var expect = chai.expect
var should = chai.should()

var F = function(){}

beforeEach(function() {
  F = function() {
    Events.call(this)
  }
})

var runner = function(fn) {
  F.prototype.run = fn
  var A = new F()
  A.run()
  return A
}

describe('Events.off', function() {
  it('Should unbind all handlers of the same type if no callback is supplied', function() {
    var A = runner(function() {
      this.on('foo', function(){})
      this.on('foo', function(a){})
      this.off('foo')
    })
    expect(A.getEventHandlers()).to.have.length(0)
  })
  it('Should unbind all handlers of the same type & handler', function() {
    var A = runner(function() {
      var cb = function() { return 'foo' }
      this.on('foo', cb)
      this.on('foo', cb)
      this.off('foo', cb)
    })
    expect(A.getEventHandlers()).to.have.length(0)
  })
})

describe('Events.trigger', function() {
  it('Should trigger methods in the same order they where added', function() {
    runner(function() {
      var n = []
      this.on('foo', function() {
        n.push(1)
      })
      this.on('foo', function() {
        n.push(2)
      })
      this.trigger('foo')
      expect(n).to.eql([1,2])
    })
  })
  it('Should trigger methods with arguments as params', function(done) {
    runner(function() {
      this.on('foo', function(args) {
        expect(args).to.eql({foo:'bar'})
        done()
      })
      this.trigger('foo', { foo: 'bar' })
    })
  })
})

describe('Events.clearEventHandlers', function() {
  it('Should unbind all handlers', function() {
    var A = runner(function() {
      this.on('foo', function(){})
      this.on('foo', function(a){ assert.fail() })
      this.clearEventHandlers()
      this.trigger('foo')
    })
    expect(A.getEventHandlers()).to.have.length(0)
  })
})


