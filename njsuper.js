
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

    addArray(array) {
        let ll = array.length
        for (var i = 1; i < arguments.length; i++) {
            if (this.typeof(arguments[i]) === 'array') {
                for (var l = 0; l < arguments[i].length; l++) {
                    array[ll] = arguments[i][l], ll = ll + 1
                }
            } else {
                array[ll] = arguments[i], ll = ll + 1
            }
        }
    }

    mergeInArray() {
        let array = [], ia = 0
        for (var i = 0; i < arguments.length; i++) {
            if (this.typeof(arguments[i]) === 'array') {
                for (var l = 0; l < arguments[i].length; l++) {
                    array[ia] = arguments[i][l], ia = ia + 1
                }
            } else {
                array[ia] = arguments[i], ia = ia + 1
            }
        }
        return array
    }

    isEnd(str, string) {
        const reg = new RegExp(str+'$', 's')
        if (string.match(reg)) return true
        else return false
    }

    isIntro(str, string) {
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
            if (this.isIntro(arr[i], value)) return true
        }
        return false
    }

    filterChars(string, chars, rep) {
        let newstring = ''
        let char = false
        for (let i = 0; i < string.length; i++) {
            char = true
            for (const l in chars) {
                if (chars[l] === string[i]) char = false
            }

            if (char) newstring = newstring + string[i]
            else if (rep) newstring = newstring + rep
        }

        return newstring
    }

    splitCharsFilter(string, chars, filter) {
        let array = [''], split = false, char = false, id = 0

        for (let i in string) {
            for (const l in chars) {
                if (chars[l] !== string[i]) split = false
                else {
                    split = true
                    break
                }
            }

            for (const l in filter) {
                if (filter[l] !== string[i]) char = true
                else {
                    char = false
                    break
                }
            }

            if (char) {
                if (split) array[id] = array[id] + string[i], id = id + 1, split = false
                else if (array[id]) array[id] = array[id] + string[i]
                else array[id] = string[i]
            } else {
                if (split) id = id + 1, split = false
            }
        }

        return array
    }

    splitOnce(string, cut, right, last) {
        let split = false, i = 0, l = 0, v = string.length - 1

        let strings = {0: '', 1: ''}, cutlength = cut.length - 1, linelength = 1
        if (last) {
            for(;;) {
                if (!split)
                    i = Number(cutlength), l = 0
                    for (let i in cut) {
                        if (strings[1][i] === cut[i]) split = true
                        else {
                            split = false; break
                        }
                    }

                if (split) {
                    strings[0] = string[v] + strings[0]
                } else {
                    strings[1] = string[v] + strings[1]
                }
                if (v < 1) break
                v = v - 1
            }

            if (!right) {
                strings[0] = strings[0] + cut
                const zeroclone = strings[1]
                strings[1] = ''

                for (let i in zeroclone) {
                    if (cut[i] !== zeroclone[i]) strings[1] = strings[1] + zeroclone[i]
                }
            }
        } else {
            if (right) strings[1] = cut
            for (let v in string) {
                if (!split)
                    i = cutlength, l = 2
                    for (;;) {
                        if (strings[0][linelength - l] === cut[i]) split = true
                        else {
                            split = false; break
                        }
                        if (i < 1) break
                        i = i - 1, l = l + 1
                    }

                if (split) {
                    strings[1] = strings[1] + string[v]
                } else {
                    strings[0] = strings[0] + string[v]
                    linelength = linelength + 1
                }
            }



            if (right) {
                const zeroclone = strings[0]
                strings[0] = ''
                for (let s = 0; s < zeroclone.length - cutlength - 1; s++) {
                    strings[0] = strings[0] + zeroclone[s]
                }
            }
        }


        return strings
    }

    splitOnceChars(string, chars) {
        let array = ['', ''], split = false

        for (let i in string) {
            if (!split)
                for (const l in chars) {
                    if (chars[l] === string[i]) split = true
                }

            if (split) array[1] = array[1] + string[i]
            else array[0] = array[0] + string[i]
        }
        return array
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

    pin(obj, value, n) {
        if (n) {
            Object.assign(obj, {[n]: value, last: n})
        } else {
            let n = 0
            for (let i in obj) {
                if (!isNaN(i)) {
                    if (n <= i) {
                        i = Number(i)
                        if (!obj.hasOwnProperty(i + 1)) {
                            n = i + 1
                        }
                    }
                }
            }
            Object.assign(obj, {[n]: value, len: n})
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
            if (number) {
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

            } else if (this.typeof(value) === 'object') {

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

    output(item, dp, endp) {
        if (typeof window === 'object') this.outputBrowser(item, dp, endp)
        else this.outputNode(item, dp, endp)
    }

    outputNode(item, dp, endp) {
        this.dps = 0
        if (this.typeof(dp) === 'number') this.dps = dp
        else if (this.typeof(endp) === 'number') this.dps = endp
        const output = (item, depth=0, curly) => {
            const {stdout} = require('process')
            let tabs = '', endstr = ''
            let d9s0xcA = Date.now().toString()
            let ssn = Number(d9s0xcA[d9s0xcA.length - 1])
            let ccn = Number(d9s0xcA[d9s0xcA.length - 2])
            let iin = Number(d9s0xcA[d9s0xcA.length - 3])
            let colors = []
            colors = ['3', '2', '5', '6', '1',
                '3', '2', '5', '7', '4']

            let brc = colors[Number(d9s0xcA[d9s0xcA.length - 2])], idc = colors[Number(d9s0xcA[d9s0xcA.length - 3])]
            let smc = colors[Number(d9s0xcA[d9s0xcA.length - 4])], stc = colors[Number(d9s0xcA[d9s0xcA.length - 5])]
            let dnc = colors[Number(d9s0xcA[d9s0xcA.length - 6])]
            brc = `\x1b[3${brc}m`, idc = `\x1b[9${idc}m`, smc = `\x1b[3${smc}m`, stc = `\x1b[5m\x1b[9${stc}m`
            dnc = `\x1b[9${dnc}m`
            let symbsign = ['|', ':', '^', '.', '+', '()', '{}', '[]', '*', '?']

            for (var s = 0; s < depth -1; s++) {
                if (symbsign[ssn].length === 1) tabs = tabs + '    ' + symbsign[ssn]
                else tabs = tabs + '   ' + symbsign[ssn]
            }

            if (depth > 0) {
                tabs = tabs + '    '
            }

            if (this.dps !== 0 && this.dps < depth) {

                return
            }

            if (this.typeof(item) === 'object' || this.typeof(item) === 'array') {
                let count = 0, scount = 0, objcount = 0, sh = [], its = []
                for (let c in item) {
                    count = count + 1
                }

                let obcount = count
                if (count > 11) {
                    let shc = 0
                    for (var i = 0; i < 11; i++) {
                        if (i < 5) sh.push(i)
                        else sh.push(count - shc), shc = shc + 1

                    }
                }

                for (let i in item) {
                    if (!isNaN(i)) idc = dnc
                    if (this.typeof(item[i])  === 'object' ) {
                        obcount = obcount - 1
                        let its = [], rec = 0
                        for (let s in item[i]) {
                            rec = rec + 1
                            if (this.typeof(item[i][s]) === 'object') if (item[i][s].len) its.push(s+': {'+item[i][s].len+'}'); else its.push(s+': {}');
                            else if (this.typeof(item[i][s]) === 'function') its.push(s+'() => { }')
                            else if (this.typeof(item[i][s]) === 'array') its.push(s+ ': []')
                            else if (this.typeof(item[i][s]) === 'string') its.push(s+': '+this.filterChars(item[i][s].slice(0, 7), '\n')+'..')
                            // else its.push(s+': '+item[i][s])
                        }
                        let sum = rec - 6
                        if (Math.sign(sum) == -1) its = its.join(', ')
                        else {
                            its = its.slice(sum, its.length)
                            its = its.join(', ')
                        }

                        stdout.write(`${brc}${tabs}\x1b[0m`)
                        stdout.write(`${idc}${i}\x1b[0m`)
                        stdout.write(`${smc}: \x1b[0m`)
                        stdout.write(`${stc}{ \x1b[0m`)
                        stdout.write(`\x1b[2m\x1b[47m\x1b[40m${its}\x1b[0m`)
                        stdout.write(`${stc} } \x1b[0m\n`)
                        // if (this.dps !== 0 && this.dps - 1 < depth) {
                        //
                        // } else {
                        //     console.log('%c' +  tabs  + '%c' + i + `%c:%c ${its} `, brc, idc, smc, 'color: #fff; background-color: #3636')
                        // }
                        output(item[i], depth + 1, obcount)

                    } else if (this.typeof(item) === 'array') {
                        obcount = obcount - 1

                        if (this.typeof(item[i]) === 'string' || this.typeof(item[i]) === 'number') {
                            if (item[i].length === 0) {
                                // console.log('%c' +  tabs  + '%c' + i + `%c: ${item[i]}`+`%c|`, brc, idc, smc, stc)
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`${smc}: ${item[i]}\x1b[0m`)
                                stdout.write(`\x1b[5m\x1b[97m|\x1b[0m\n`)
                            } else if (this.typeof(item[i]) === 'number') {
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`${smc} = \x1b[0m`)
                                stdout.write(`${stc}${item[i]}\x1b[0m\n`)
                                // console.log('%c' +  tabs  + '%c' + i + `%c = %c${item[i]}`, brc, idc, smc, stc)
                            } else {
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`${smc}: \x1b[0m`)
                                stdout.write(`${stc}${item[i]}\x1b[0m`)
                                stdout.write(`\x1b[5m\x1b[97m|\x1b[0m\n`)
                                // console.log('%c' +  tabs  + '%c' + i + `%c: ${item[i]}`+`%c ${item[i].length}|`, brc, idc, smc, stc)
                            }

                        } else {

                            if (i == 0) {
                                stdout.write(`${brc}${tabs}...\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`\x1b[5m${smc}[ \x1b[0m`)
                                stdout.write(`${stc}${item[i]}\x1b[0m`)
                                stdout.write(`\x1b[5m${smc}] \x1b[0m\n`)
                                // console.log('%c' +  tabs  + '...%c' + i + `%c[%c${item[i].length}%c]`, brc, brc, smc, stc, smc)
                            } else {
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`\x1b[5m${stc}[ \x1b[0m`)
                                stdout.write(`${smc}${item[i]}\x1b[0m`)
                                stdout.write(`\x1b[5m${stc}] \x1b[0m\n`)
                                // console.log('%c' +  tabs  + '%c' + i + `%c[%c${item[i].length}%c]`, brc, idc, stc, smc, stc)
                            }

                            output(item[i], depth + 1, obcount)
                        }

                    } else {
                        // let loc = 0
                        // if (this.typeof(item[i]) === 'function') {
                        //     item[i] = this.filterChars(item[i].toString().split('\n')[0], '{')
                        //     loc = item[i].length
                        // }
                        if (scount !== count - 1) {
                            obcount = obcount - 1
                            if (sh.length > 1) {
                                for (let s in sh) {
                                    if (scount === sh[s]) {
                                        if (scount === 4) {
                                            stdout.write(`${brc}${tabs}\x1b[0m`)
                                            stdout.write(`${idc}${i}\x1b[0m`)
                                            stdout.write(`${smc}: \x1b[0m`)
                                            stdout.write(`${stc}${item[i]}\x1b[0m\n`)
                                            // console.log('%c' + tabs + '%c' +  i + '%c: ' + `%c ${item[i]} `,
                                                        // brc, idc, smc, stc)
                                            stdout.write(`${smc}${tabs}\x1b[0m`)
                                            stdout.write(`${brc}...\x1b[0m\n`)

                                            // console.log('%c' + tabs + '%c' + '...', smc, brc)
                                        } else {
                                            stdout.write(`${brc}${tabs}\x1b[0m`)
                                            stdout.write(`${idc}${i}\x1b[0m`)
                                            stdout.write(`${smc}: \x1b[0m`)
                                            stdout.write(`${stc}${item[i]}\x1b[0m\n`)
                                            // console.log('%c' +tabs +'%c' +i + '%c: ' +  `%c ${item[i]} `,
                                                        // brc, idc, smc, stc)
                                        }

                                    }
                                }
                            } else {
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`${smc}: \x1b[0m`)
                                stdout.write(`${stc}${item[i]}\x1b[0m`)
                                // if (loc > 0) stdout.write(`${brc}{\x1b[0m`), stdout.write(`${stc}${loc}\x1b[0m`), stdout.write(`\x1b[5m${idc}|\x1b[0m`), stdout.write(`${brc}}\x1b[0m`)
                                stdout.write('\n')
                                // console.log('%c' + tabs + '%c' + i + '%c: ' +  `%c ${item[i]}`,
                                            // brc, idc, smc, stc)
                            }
                        } else {
                            if (depth === 0) {
                                if (this.typeof(dp) === 'string') endstr = dp
                                else if (this.typeof(endp) === 'string') endstr = endp
                            }
                            obcount = obcount - 1
                            let cur = ''
                            if (curly > 0) {
                                for (var cu = 0; cu < obcount + 1; cu++) {
                                    cur = cur + ' }'
                                }
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`${smc}: \x1b[0m`)
                                stdout.write(`${stc}${item[i]}${cur} \x1b[0m`)
                                stdout.write(`${idc}${endstr}\x1b[0m\n`)
                                // console.log('%c' + tabs + '%c' + i + '%c: '  +  `%c ${item[i]}`+ cur +`${endstr}`,
                                            // brc, idc, smc, stc)
                            } else {
                                stdout.write(`${brc}${tabs}\x1b[0m`)
                                stdout.write(`${idc}${i}\x1b[0m`)
                                stdout.write(`${smc}: \x1b[0m`)
                                stdout.write(`${stc}${item[i]} \x1b[0m`)
                                stdout.write(`${brc}${tabs.slice(0, tabs.length - 6)}\x1b[0m`)
                                stdout.write(`${stc} } } \x1b[0m`)
                                stdout.write(`${idc}${endstr}\x1b[0m\n`)
                                // console.log(`%c${tabs}` + `%c${i}` + '%c: ' + `%c ${item[i]}`+ `%c${tabs.slice(0, tabs.length - 6)}`+`%c } } ${endstr}` ,
                                            // brc, idc, smc, stc, brc, smc)
                            }

                        }
                    }
                    scount = scount + 1

                }
            } else {
                console.log(item)
            }
        }

        output(item)
    }

    outputBrowser(item, dp, endp) {
        this.dps = 0
        if (this.typeof(dp) === 'number') this.dps = dp
        else if (this.typeof(endp) === 'number') this.dps = endp
        const output = (item, depth=0, curly) => {
            let tabs = '', theme = 'f', endstr = ''
            let d9s0xcA = Date.now()
            d9s0xcA = String(d9s0xcA)
            let ssn = Number(d9s0xcA[d9s0xcA.length - 1])
            let ccn = Number(d9s0xcA[d9s0xcA.length - 2])
            let iin = Number(d9s0xcA[d9s0xcA.length - 3])
            let colors = []
            if (theme === 'f') {
                colors = ['#f01a3a', '#1653fa', '#aa00ff', '#000000', '#000000',
                '#f01a3a', '#1653fa', '#aa00ff', '#000000', '#02ccf0']
            } else {
                colors = ['#de3131', '#b06f15', '#e3dc0b', '#24e30b', '#0be3c6',
                '#0b82e3', '#850be3', '#e30b9b', '#ffffff', '#ccc5b8']
            }
            let brc = colors[Number(d9s0xcA[d9s0xcA.length - 2])], idc = colors[Number(d9s0xcA[d9s0xcA.length - 3])]
            let smc = colors[Number(d9s0xcA[d9s0xcA.length - 4])], stc = colors[Number(d9s0xcA[d9s0xcA.length - 5])]
            let dnc = colors[Number(d9s0xcA[d9s0xcA.length - 6])]
            brc = `color: ${brc};`, idc = `color: ${idc}; background-color: #eeeeee`, smc = `color: ${smc};`, stc = `color: ${stc};`
            dnc = `color: ${dnc};`
            let symbsign = ['|', ':', '^', '.', '+', '()', '{}', '[]', '*', '?']

            for (var s = 0; s < depth -1; s++) {
                if (symbsign[ssn].length === 1) tabs = tabs + '    ' + symbsign[ssn]
                else tabs = tabs + '   ' + symbsign[ssn]

            }

            if (depth > 0) {
                tabs = tabs + '    '
            }

            if (this.dps !== 0 && this.dps < depth) {

                return
            }

            if (this.typeof(item) === 'object' || this.typeof(item) === 'array') {
                let count = 0, scount = 0, objcount = 0, sh = [], its = []
                for (let c in item) {
                    count = count + 1
                }

                let obcount = count
                if (count > 11) {
                    let shc = 0
                    for (var i = 0; i < 11; i++) {
                        if (i < 5) sh.push(i)
                        else sh.push(count - shc), shc = shc + 1

                    }
                }

                for (let i in item) {
                    if (!isNaN(i)) idc = dnc
                    if (this.typeof(item[i])  === 'object' ) {
                        obcount = obcount - 1
                        let its = []
                        for (let s in item[i]) {
                            if (this.typeof(item[i][s]) === 'object') if (item[i][s].len) its.push(s+': {'+item[i][s].len+'}'); else its.push(s+': {}');
                            else if (this.typeof(item[i][s]) === 'array') its.push(s+ ': []')
                            else if (this.typeof(item[i][s]) === 'string') its.push(s+': '+item[i][s].slice(0, 7)+'..')
                            else its.push(s+': '+item[i][s])
                        }
                        let sum = count - 11
                        if (Math.sign(sum) === -1) its = its.join(', ')
                        else its = its.slice(sum, its.length), its = its.join(', ')
                        console.log('%c' +  tabs  + '%c' + i + `%c: %c { %c ${its} `, brc, idc, smc, stc, 'color: #fff2f6; background-color: #080c14')
                        // if (this.dps !== 0 && this.dps - 1 < depth) {
                        //
                        // } else {
                        //     console.log('%c' +  tabs  + '%c' + i + `%c:%c ${its} `, brc, idc, smc, 'color: #fff; background-color: #3636')
                        // }
                        output(item[i], depth + 1, obcount)

                    } else if (this.typeof(item) === 'array') {
                        obcount = obcount - 1

                        if (this.typeof(item[i]) === 'string' || this.typeof(item[i]) === 'number') {
                            if (item[i].length === 0) {
                                console.log('%c' +  tabs  + '%c' + i + `%c: ${item[i]}`+`%c|`, brc, idc, smc, stc)
                            } else if (this.typeof(item[i]) === 'number') {
                                console.log('%c' +  tabs  + '%c' + i + `%c = %c${item[i]}`, brc, idc, smc, stc)
                            } else {
                                console.log('%c' +  tabs  + '%c' + i + `%c: ${item[i]}`+`%c ${item[i].length}|`, brc, idc, smc, stc)
                            }

                        } else {

                            if (i == 0) {
                                console.log('%c' +  tabs  + '...%c' + i + `%c[%c${item[i].length}%c]`, brc, brc, smc, stc, smc)
                            } else {
                                console.log('%c' +  tabs  + '%c' + i + `%c[%c${item[i].length}%c]`, brc, idc, stc, smc, stc)
                            }

                            output(item[i], depth + 1, obcount)
                        }

                    } else {

                        if (scount !== count - 1) {
                            obcount = obcount - 1
                            if (sh.length > 1) {
                                for (let s in sh) {
                                    if (scount === sh[s]) {
                                        if (scount === 4) {
                                            console.log('%c' + tabs + '%c' +  i + '%c: ' + `%c ${item[i]} `,
                                                        brc, idc, smc, stc)
                                            console.log('%c' + tabs + '%c' + '...', smc, brc)
                                        } else {
                                            console.log('%c' +tabs +'%c' +i + '%c: ' +  `%c ${item[i]} `,
                                                        brc, idc, smc, stc)
                                        }

                                    }
                                }
                            } else {
                                console.log('%c' + tabs + '%c' + i + '%c: ' +  `%c ${item[i]}`,
                                            brc, idc, smc, stc)
                            }
                        } else {
                            if (depth === 0) {
                                if (this.typeof(dp) === 'string') endstr = dp
                                else if (this.typeof(endp) === 'string') endstr = endp
                            }
                            obcount = obcount - 1
                            let cur = ''
                            if (curly > 0) {
                                for (var cu = 0; cu < obcount + 1; cu++) {
                                    cur = cur + ' }'
                                }
                                console.log('%c' + tabs + '%c' + i + '%c: '  +  `%c ${item[i]}`+ cur +`${endstr}`,
                                            brc, idc, smc, stc)
                            } else {
                                console.log(`%c${tabs}` + `%c${i}` + '%c: ' + `%c ${item[i]}`+ `%c${tabs.slice(0, tabs.length - 6)}`+`%c } } ${endstr}` ,
                                            brc, idc, smc, stc, brc, smc)
                            }

                        }
                    }
                    scount = scount + 1

                }
            } else {
                console.log(item)
            }
        }

        output(item)
    }



}

module.exports = { NjSuper }
