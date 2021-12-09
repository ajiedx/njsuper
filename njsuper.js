
class NjSuper {
    constructor(dt, objx) {
        if(typeof objx === 'object') {
            if (objx.hasOwnProperty('obj')) {
                this.objx = objx.obj
                delete objx.obj
                
            } else if (objx.hasOwnProperty('objx')) {
                if (objx.objx == false) {
                    this.objx = Object
                    delete objx.obj
                } else {
                    this.objx = objx.objx
                }
            }

            Object.assign(this, objx)
   
        }

        if (this.enum === true) {
            Object.defineProperty(this, 'dt', {
                value: dt,
                enumerable: true,
                writable: true,
                configurable: true
            })
            
        } else {
            this.dt = dt
        }
    }

    define(name, vl, objx) {
        if (objx === false) {
            Object.defineProperty(this, name, {
                value: vl,
                enumerable: true,
                writable: true,
                configurable: true
            })
        } else if (objx.obj) {
            Object.defineProperty(this, name, {
                value: this.resolveObject(vl, objx, name),
                enumerable: true,
                writable: true,
                configurable: true
            })
        } else if (this.objx) {
            Object.defineProperty(this, name, {
                value: this.resolveObject(vl),
                enumerable: true,
                writable: true,
                configurable: true
            })
        } else {
            Object.defineProperty(this, name, {
                value: this.resolveObject(vl),
                enumerable: true,
                writable: true,
                configurable: true
            })
        }
    }

    compareBegining(str, string) {
        string = string[Symbol.iterator]()

        for (const i in str) {
            if (str[i] !== string.next().value) {
                return false
            } 
        }

        return true
    }

    resolveObject(value, obj, name) {
        if (name) {
            if (obj.obj instanceof Object) {
                if (obj.objx) {
                    Object.assign(value, obj.obj)
                    return new obj.obj(name, value)
                } else if (obj.objx == false) {
                    return new obj.obj(value)
                } else {
                    return new obj.obj(name, value)
                }
            } 
        } else if (obj.obj) {
            if (obj.obj instanceof Object) {
                if (obj.objx) {
                    Object.assign(value, obj.obj)
                    return new obj.obj(value, {obj: obj.obj})
                } else if (obj.objx == false) {
                    return new obj.obj(value)
                } else {
                    return new obj.obj(value, obj)
                }
               
            } 
        } else if (this.objx) {
            return new this.objx(value, obj)
        } else {
            return new NjSuper(value)
        }

    }

    instance(of, equals) {
        of = of.constructor.name
        equals = equals.prototype.__proto__constructor.name
        if (of === equals) {
            return true
        } else {
            return false
        }
    }

    instanceAll(of, equals) {
        of = of.constructor.name
        if(of === equals.prototype.__proto__.constructor.name) {
            return true
        } else if (equals.prototype.__proto__.prototype) {
            if (of === equals.prototype.__proto__.prototype.__proto__.constructor.name) {
                return true
            } else if (equals.prototype.__proto__.prototype.__proto__.prototype) {
                if (of === equals.
                    prototype.__proto__.prototype.__proto__.prototype.constructor.name) {
                        return true
                } else if (equals.
                    prototype.__proto__.prototype.__proto__.prototype) {
                    if (of === equals.
                        prototype.__proto__.prototype.__proto__.prototype.constructor.name) {
                            return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
        
    }

    typeof(value) {
        if (typeof value === 'function') {
            return 'function'
        } else if (typeof value === 'string') {
            return 'string'
        } else if (Array.isArray(value)) {
            return 'array'
        } else if (typeof value === 'object') {
            return 'object'
        } else if (typeof value === 'number') {
            return 'number'
        } if (typeof value === 'boolean') {
            return 'boolean'
        } else if (typeof value === 'undefined') {
            return 'undefined'
        }
    }

    valueInArray(value, arr) {
        for (const i in arr) {
            if (this.compareBegining(arr[i], value)) return true
        }
        return false
    }

    countChars(string, char) {
        let count = 0
        for (const i in string) {
            if (string[i] === char) count = count + 1
        }

        return count
    }

    count(obj) {
        if (this.typeof(obj) === 'object') {
            let length = 0
            for (const i in obj) {
                length = length + 1
            }
            return length
        } else if (this.typeof(obj) === 'array') {
            return obj.length
        }
    }

    assign(name, value, number) {
        if (name === 'this') {
            if (number) {
                let number = 0
                for (const i in this) {
                    if (this.typeof(Number(i)) === 'number') {
                        if(number <= Number(i)) {
                            if(!this.has(Number(i) + 1)) {
                                number = Number(i) + 1
                            }
                        }
                    }
                }
                Object.assign(this, {[number]: value})
            } else if (this.typeof(value) === 'object') {
            
                Object.assign(this, value)
                
            } else if (this.typeof(value) === 'string') {
                let number = 0
                for (const i in this) {
                    if (this.typeof(Number(i)) === 'number') {
                        if(number <= Number(i)) {
                            if(!this.has(Number(i) + 1)) {
                                number = Number(i) + 1
                            }
                        }
                    }
                }
                Object.assign(this, {[number]: value})
    
            } else if (this.typeof(value) === 'array') {
                if (this.has('array')) {
                    this.array.push(value)
                } else {
                    this.array = value
                }
            } else if (this.typeof(value) === 'function') {
                const func = value
                Object.assign(this, {func})
            }
        } else {
            if (this.typeof(value) === 'object') {
            
                Object.assign(this[name], value)
                
            } else if (this.typeof(value) === 'string') {
                let number = 0
                for (const i in this[name]) {
                    if (this.typeof(Number(i)) === 'number') {
                        if(number <= Number(i)) {
                            if(!this[name].hasOwnProperty(Number(i) + 1)) {
                                number = Number(i) + 1
                            }
                        }
                    }
                }
                Object.assign(this[name], {[number]: value})
    
            } else if (this.typeof(value) === 'array') {
                if (this[name].hasOwnProperty('array')) {
                    this[name].array.push(value)
                } else {
                    this[name].push(...value)
                }
            } else if (this.typeof(value) === 'function') {
                const func = value
                Object.assign(this[name], {func})
            }
        }
        
    }

    add(value, name, objx) {
        if (!name) {
            this.check(value)
            this.assign('this', value)
        } else {

            this.check(name)
            if (this.has(name)) {
                this.assign(name, value)    
            } else if (objx) {
               this.define(name, value, objx)
            } else {
                this.define(name, value, false)
            }
        }
    }

    check(value) {
        if (value === undefined) {
            throw err
        }
    }

    has(name) {
        return this.hasOwnProperty(name)
    }
    
}

module.exports = { NjSuper }
