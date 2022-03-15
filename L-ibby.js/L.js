const L = (() => {

    'use strict';

    /**
     * Create the C
     * @param {String} selector The selector to use
     */
    const C = function (s) {
        if (''+s===s) {
            // const l = document.querySelectorAll(s);
            L.each(document.querySelectorAll(s), (i, e) => {
                this[i] = e;
            });
        }
        else if (~L.type(s).indexOf('element')) { //same as L.type(selector).indexOf('element') > -1
            this[0] = s;
        }
        Object.defineProperty(this, 'length', {
            value: L.size(this),
            enumarable: 0,
            writable: 1
        });
    };

    /**
     * Run a callback on each item
     * @param  {Function} callback The callback function to run
     * @example L('selector').each(function(){})
     */
    C.prototype.e = function (c) {
        let i = 0;
        for (let k in this) {
            if (this.hasOwnProperty(k)) c(this[k], i, k);
            i++;
        }
        return this;
    };

    /**
     * Do ajax stuff
     * @param  {String} url The URL to get
     */
    // C.prototype.ajax = function (url) {
    //     // Do some LHR/Fetch thing here
    //     console.log(url);
    // };

    C.prototype.attr = function (a, v) {
        let r = [];
        this.e((i, j) => {
            if (L.type(a) === 'object') {
                L.each(a, (k, v) => {
                    i[k] = v;
                });
                r = this;
            }
            else {
                if (''+v===v) {
                    i.setAttribute(a, v);
                    r = this;
                }
                else {
                    let s;
                    if (a.pop) {
                        r[j] = {};
                        L.each(a, (k, v) => {
                            s = i.getAttribute(v);
                            r[j][v] = (''+s===s) ? s
                                                 : undefined;
                        });
                        r[j].length = L.size(r[j]);
                    }
                    else {
                        s = i.getAttribute(a);
                        r[j] = (''+s===s) ? s
                                          : undefined;
                    }
                }
            }
        });
        return (r.length > 1 || r === this) ? r
                                            : r[0];
    };

    C.prototype.val = function (v) {
        let r = [];
        this.e((i, j) => {
            if (''+v===v) {
                i.value = v;
                r = this;
            }
            else {
                r[j] = i.value;
            }
        });
        return (r === this || r.length > 1) ? r
                                            : r[0];
    };

    C.prototype.text = function (v) {
        let r = v ? this : [];
        this.e((i, j) => {
            L.truly(v, {z: 1, s: 1}) ? i.textContent = v.toString()
                                     : r[j] = i.textContent;
        });
        return (r === this || r.length > 1) ? r
                                            : r[0];
    };

    /**
     * Specify elements style
     * @param {String} style CSS style
     */
    C.prototype.css = function (p, v) {
        let r = [];
        this.e((i, j) => {
            if (L.type(p) === 'object') {
                L.each(p, (k, v) => {
                    i.style.setProperty(k, v);
                });
                r = this;
            }
            else {
                if (v) {
                    i.style.setProperty(p, v); //In case of camel cased prop name
                    r = this;
                }
                else {
                    let s;
                    if (p.pop) {
                        r[j] = {};
                        L.each(p, (k, v) => {
                            s = getComputedStyle(i).getPropertyValue(v);
                            r[j][v] = (''+s===s) ? s
                                                 : undefined;
                        });
                        r[j].length = L.size(r[j]);
                    }
                    else {
                        s = getComputedStyle(i).getPropertyValue(p);
                        r[j] = (''+s===s) ? s
                                          : undefined;
                    }
                }
            }
        });
        return (r === this || r.length > 1) ? r
                                            : r[0];
    };

    // C.prototype.getClass = function (c) {
    //     let r = [];
    //     this.e((i) => {
    //         r.push(c[0] === '^' ? i.className.baseVal ? !!~i.className.baseVal.indexOf(c.slice(1))
    //                                                   : !!~i.className.indexOf(c.slice(1))
    //                             : i.className.baseVal ? !!~i.className.baseVal.split(' ').indexOf(c)
    //                                                   : i.classList.contains(c));
    //     });
    //     return r[1] ? r : r[0];
    // };

    /**
     * Check if elements class exost
     * @param {String} className Class / classes name to check
     */
    C.prototype.hasClass = function (c) {
        let r = [];
        this.e((i) => {
            r.push(c[0] === '^' ? i.className.baseVal ? !!~i.className.baseVal.indexOf(c.slice(1))
                                                      : !!~i.className.indexOf(c.slice(1))
                                : i.className.baseVal ? !!~i.className.baseVal.split(' ').indexOf(c)
                                                      : i.classList.contains(c));
        });
        return r[1] ? r : r[0];
    };

    /**
     * Add a class to elements
     * @param {String} className Class / classes name
     */
    C.prototype.addClass = function (c) {
        this.e((i) => {
            i.className.baseVal ? i.className.baseVal += ' ' + c
                                : i.className += ' ' + c;
        });
        return this;
    };

    C.prototype.remove = function () {
        this.e((i) => {
            i.remove();
        });
        return this;
    };

    /**
     * Remove a class to elements
     * @param {String} className Class / classes name
     */
    C.prototype.removeClass = function (c, t) {
        this.e((i) => {
            // i.className.baseVal?c?"^"===c[0]?"*"===c.slice(-1)?i.className.baseVal=i.className.baseVal.replace(RegExp("\\s+"+c.slice(1,-1)+"[^\\s]*","g"),""):i.className.baseVal=i.className.baseVal.replace(RegExp(c.slice(1)+"[^\\s]*"),"").trim():i.classList.remove(c):i.className.baseVal="":c?"^"===c[0]?"*"===c.slice(-1)?i.className=i.className.replace(RegExp("\\s+"+c.slice(1,-1)+"[^\\s]*","g"),""):i.className=i.className.replace(RegExp(c.slice(1)+"[^\\s]*"),"").trim():i.classList.remove(c):i.className="";
            i.className.baseVal?c?"^"===c[0]?i.className.baseVal=i.className.baseVal.replace(RegExp(c.slice(1)+"[^\\s]*","g"),"").trim():i.classList.remove(c):i.className.baseVal="":c?"^"===c[0]?i.className=i.className.replace(RegExp(c.slice(1)+"[^\\s]*","g"),"").trim():i.classList.remove(c):i.className="";
            // Inminified
           // if (i.className.baseVal) {
           //    if (c) {
           //      if (c[0] === '^') { // SELECT STRING THAT STARTS WITH
           //          i.className.baseVal = i.className.baseVal.replace(RegExp(c.slice(1) + '[^\\s]*', 'g'), '').trim();
           //      }
           //      else {
           //        i.classList.remove(c);
           //      }
           //    }
           //    else {
           //      i.className.baseVal = '';
           //    }
           //  }
           //  else {
           //    if (c) {
           //      if (c[0] === '^') {
           //          i.className = i.className.replace(RegExp(c.slice(1) + '[^\\s]*', 'g'), '').trim();
           //      }
           //      else {
           //        i.classList.remove(c);
           //      }
           //    }
           //    else {
           //      i.className = '';
           //    }
           //  }
        });
        return this;
    };

    // C.prototype.toggleClass = function (c) {
    //     this.e((i) => {
    //         i.classList.toggle(c);
    //     });
    //     return this;
    // };

    C.prototype.swapClass = function (f, t) {
        this.e((i) => {
            // i.className.baseVal?"^"===f[0]?i.className.baseVal=~i.className.baseVal.indexOf(f.slice(1))?i.className.baseVal.replace(RegExp(f.slice(1)+"[^\\s]*"),t):i.className.baseVal+(t?" "+t:""):"*"===f[0]?i.className.baseVal=~i.className.baseVal.indexOf(f.slice(1))?i.className.baseVal.replace(RegExp("\\w*"+f.slice(1)+"\\w*"),t):i.className.baseVal+(t?" "+t:""):i.className.baseVal=i.className.baseVal.replace(f,t):"^"===f[0]?i.className=~i.className.indexOf(f.slice(1))?i.className.replace(RegExp(f.slice(1)+"[^\\s]*"),t):i.className+(t?" "+t:""):"*"===f[0]?i.className=~i.className.indexOf(f.slice(1))?i.className.replace(RegExp("\\w*"+f.slice(1)+"\\w*"),t):i.className+(t?" "+t:""):i.className=i.className.replace(f,t);
            // i.className.baseVal?"^"===f[0]&&~i.className.baseVal.indexOf(f.slice(1))?i.className.baseVal=i.className.baseVal.replace(RegExp(f.slice(1)+"[^\\s]*"),t):"*"===f[0]&&~i.className.baseVal.indexOf(f.slice(1))?i.className.baseVal=i.className.baseVal.replace(RegExp("\\w*"+f.slice(1)+"\\w*"),t):i.className.baseVal=i.className.baseVal.replace(f,t):"^"===f[0]&&~i.className.indexOf(f.slice(1))?i.className=i.className.replace(RegExp(f.slice(1)+"[^\\s]*"),t):"*"===f[0]&&~i.className.indexOf(f.slice(1))?i.className=i.className.replace(RegExp("\\w*"+f.slice(1)+"\\w*"),t):i.className=i.className.replace(f,t);
            i.className.baseVal?"^"===f[0]?i.className.baseVal=i.className.baseVal.replace(RegExp(f.slice(1)+"[^\\s]*","g"),t).trim():"*"===f[0]?i.className.baseVal=i.className.baseVal.replace(RegExp("[^\\s]*"+f.slice(1)+"[^\\s]*","g"),t).trim():i.className.baseVal=i.className.baseVal.replace(f,t).trim():"^"===f[0]?i.className=i.className.replace(RegExp(f.slice(1)+"[^\\s]*","g"),t).trim():"*"===f[0]?i.className=i.className.replace(RegExp("[^\\s]*"+f.slice(1)+"[^\\s]*","g"),t).trim():i.className=i.className.replace(f,t).trim();

// if (i.className.baseVal) {
// if (f[0]==='^') { // SELECT STRING THAT STARTS WITH
//       i.className.baseVal = i.className.baseVal.replace(RegExp(f.slice(1) + '[^\\s]*', 'g'), t).trim();
// }
// else if (f[0] === '*') { // SELECT WHOLE STRING THAT CONTAINS
//     i.className.baseVal = i.className.baseVal.replace(RegExp('[^\\s]*' + f.slice(1) + '[^\\s]*', 'g'), t).trim();
// }
// else {
//     i.className.baseVal = i.className.baseVal.replace(f, t).trim();
// }
// }
// else {
//   if (f[0]==='^') {
//       i.className = i.className.replace(RegExp(f.slice(1) + '[^\\s]*', 'g'), t).trim();
// }
// else if (f[0] === '*') {
//     i.className = i.className.replace(RegExp('[^\\s]*' + f.slice(1) + '[^\\s]*', 'g'), t).trim();
// }
// else {
//     i.className = i.className.replace(f, t).trim();
// }
// }
        });
        return this;
    };

    C.prototype.concatClass = function (f, c) {
        this.e((i) => {
            // if(i.className.baseVal){const s=i.className.baseVal.indexOf(f);i.className.baseVal=~s?i.className.baseVal.slice(0,s)+f+c+i.className.baseVal.slice(s+f.length):i.className.baseVal+" "+c}else{const s=i.className.indexOf(f);i.className=~s?i.className.slice(0,s)+f+c+i.className.slice(s+f.length):i.className+" "+c}
            // if(i.className.baseVal)if("^"===f[0]){const a=i.className.baseVal.match(RegExp("[^\\s]*"+f+"[^\\s]*"));a&&(i.className.baseVal=i.className.baseVal.replace(a[0],a[0]+c))}else i.className.baseVal=i.className.baseVal.replace(f,f+c);else if("^"===f[0]){const a=i.className.match(RegExp("[^\\s]*"+f+"[^\\s]*"));a&&(i.className=i.className.replace(a[0],a[0]+c))}else i.className=i.className.replace(f,f+c);
            if(i.className.baseVal)if("^"===f[0]){const a=i.className.baseVal.match(RegExp("[^\\s]*"+f+"[^\\s]*","g"));for(let k=0;k<a.length;k++)i.className.baseVal=i.className.baseVal.replace(a[k],a[k]+c).trim()}else i.className.baseVal=i.className.baseVal.replace(f,f+c).trim();else if("^"===f[0]){const a=i.className.match(RegExp("[^\\s]*"+f+"[^\\s]*","g"));for(let k=0;k<a.length;k++)i.className=i.className.replace(a[k],a[k]+c).trim()}else i.className=i.className.replace(f,f+c).trim();
//             if (i.className.baseVal) {
//   if (f[0] === '^') { 
//       const m = i.className.baseVal.match(RegExp('[^\\s]*' + f + '[^\\s]*', 'g'));
//       for (let i = 0; i < m.length; i++) {
//             i.className.baseVal = i.className.baseVal.replace(m[i], m[i] + c).trim();
//       }
//   }
//   else {
//      i.className.baseVal = i.className.baseVal.replace(f, f + c).trim();
//   }
// }
// else {
//   if (f[0] === '^') {
//       const m = i.className.match(RegExp('[^\\s]*' + f + '[^\\s]*', 'g'));
//       for (let i = 0; i < m.length; i++) {
//             i.className = i.className.replace(m[i], m[i] + c).trim();
//       }
//   }
//   else {
//      i.className = i.className.replace(f, f + c).trim();
//   }
// }
        });
        return this;
    };

    C.prototype.disable = function () {
        this.e((i) => {
            i.disabled = 1;
        });
        return this;
    };

    C.prototype.enable = function () {
        this.e((i) => {
            i.disabled = 0;
        });
        return this;
    };

    C.prototype.put = function (p, o) {
        this.e((i) => {
            switch (p) {
                case 'after':
                i.insertAdjacentHTML('afterend', o);
                break;
                case 'before':
                i.insertAdjacentHTML('beforebegin', o);
                break;
                case 'inbegin':
                i.insertAdjacentHTML('afterbegin', o);
                break;
                case 'inend':
                i.insertAdjacentHTML('beforeend', o);
                break;
            }
        });
        return this;
    };

    C.prototype.toggleView = function (p, d) {
        this.e((i) => {
            if (p) {
                const s = getComputedStyle(i);
                switch (p) {
                    case 'display':
                    s.display === 'none' ? i.style.display = d ? d 
                                                               : 'block'
                                         : i.style.display = 'none';
                    break;
                }
            }
            else {
                // console.log('toggleView opacity ', style.opacity);
                d = getComputedStyle(i);
                if (d.opacity === '0') {
                    i.style.opacity = '1';
                    i.style.setProperty('pointer-events', 'auto');
                }
                else {
                    i.style.opacity = '0';
                    i.style.setProperty('pointer-events', 'none');
                }
            }
        });
        return this;
    };

    C.prototype.toggleAttr = function (a) {
        this.e((i) => {
            const v = i.getAttribute(a);
            if (v) {
                i.setAttribute(a + '-off', v);
                i.removeAttribute(a);
            }
            else {
                i.setAttribute(a, i.getAttribute(a + '-off'));
                i.removeAttribute(a + '-off');
            }
        });
        return this;
    };

    C.prototype.swapAttr = function (a, n) {
        this.e((i) => {
            if (n) {
                if (n.toFixed) {
                    const v = i.getAttribute(a);
                    const l = i.getAttribute(a + '-s').split(';');
                // console.log('list is ', list);
                    i.setAttribute(a, l[n]);
                    l[n] = v;
                    i.setAttribute(a + '-s', l.join(';'));
                }
                else {
                    i.setAttribute(a, [i.getAttribute(n), i.setAttribute(n, i.getAttribute(a))][0]);
                }
            }
            else {
                i.setAttribute(a, [i.getAttribute(a + '-s').split(';')[0], i.setAttribute(a + '-s', i.getAttribute(a))][0]);
            }
        });
        return this;
    };

    C.prototype.empty = function () {
        this.e((i) => {
            while (i.firstChild) {
                i.removeChild(i.firstChild);
            }
        });
        return this;
    };

    C.prototype.n = function (n) {
        //Create property for selected objects preservation
        //if it doesnt exist
        if (!this.hasOwnProperty('elStack')) {
            Object.defineProperty(this, 'elStack', {
                value: {},
                writable: 1,
                enumarable: 0
            });
            L.deepClone({target: this.elStack, source: this, exclude: ['elStack']});
        }
        //If search doesnt match any item within object list
        //delete it and recount object length
        this.e((i, j, k) => {
            // console.log('type is ', L.type(k));
            (k==n && this[n]) || delete this[k];
        });
        if (!this[n] && this.elStack[n]) this[n] = this.elStack[n];
        this.length = L.size(this);

        return this;
    };

    C.prototype.not = function (n) {
        //If search doesnt match any item within object list
        //delete it and recount object length
        this.e((i, j, k) => {
            if (k==n && this[n]) delete this[k];
        });
        this.length = L.size(this);
        return this;
    };

    /**
     * I a new C
     *
     * Assign C into L const on window load
     * @return {Object}
     */
    const I = function (s) {
        // const C = new C(selector);
        return new C(s);
    };

    I.type = function (o, n) {
        if (n) {
            return n.split('?').some((e) => {
                return (e === Object.prototype.toString.call(o).split(' ')[1].slice(0, -1).toLowerCase());
            });
        }
        else {
            return Object.prototype.toString.call(o).split(' ')[1].slice(0, -1).toLowerCase();
        }
    };

    I.post = function(o) {
        const t = o.responseType || '';
        //Content-type обязателе
        //Необходимо сделать возможным доп. хедеры и перезапись Content-Type
        const h = Object.assign({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, o.requestHeader);
        // if (options.requestHeader) Object.assign(requestHeader, options.requestHeader);
        // console.log('requestHeader is ', requestHeader);
        // const responseTypes = {
        //     text: 'responseText',
        //     json: 'responseJSON',
        //     document: 'responseXML'
        // };
        const x = new XMLHttpRequest();
              x.onload = () => {
                console.log('x is ', x);
                // if (x.status >= 200 && x.status < 400) {
                    // console.log('x is ', x,'x.response is ', x.response);
                    // console.log('x is ', x,'x.response is ', x.response, 'responseType is ', responseType, 'x[responseTypes[responseType]] is ', x[responseTypes[responseType]], 'responseTypes[responseType] is ', responseTypes[responseType], 'x[responseJSON] is ');
                    // if (options.onload) options.onload(x.response);
                    // if (x.response) {
                    if (o.onload) o.onload(x.response);
                    // }
                    // else {
                    //     if (o.onempty) o.onempty(x); //if 200 ok but null response
                    // }
                // }
              };
              x.open('POST', o.url);
              x.responseType = t;
              this.each(h, (k, v) => {
                x.setRequestHeader(k, v);
              });
              // console.log('x.header is ', x.header);
              // x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
              // x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
              // console.log('options is ', (new URLSearchParams(options.data || '')).toString());
              // console.log('params is ', (new URLSearchParams(options.data || '')).toString())
              x.send((new URLSearchParams(o.data || '')).toString());
              // if (options.always) options.always();
    };

    I.getJSON = function(o) {
        const x = new XMLHttpRequest();
              x.onload = () => {
                    if (o.onload) o.onload(JSON.parse(x.response));
              };
              // console.log('kek is ', options.url + (options.data ? '?' + (new URLSearchParams(options.data)).toString()
              //                                             : ''));
              x.open('GET', o.url + (o.data ? '?' + (new URLSearchParams(o.data)).toString() : ''));
              x.send();
    };

    I.each = function (o, c) {
        // if (o.pop) {
        //     let i = o.length;
        //     while(i--) {
        //         c(i, o[i]);
        //     }
        // }
        // else {
            let i = 0;
            for (let k in o) {
                if (o.hasOwnProperty(k)) c(k, o[k], i);
                i++;
            }
        // }
    };

    // I.isEmpty = function (object) {
    //     return ((this.type(object) === 'object') ? Object.getOwnPropertyNames(object).length ? false /* Get even non-enumarable keys */
    //                                                                               : true
    //                                   : this.isArray(object) ? (object.length) ? false    /* Filter false values */
    //                                                                            : true     /* (object.filter(Boolean).length) */
    //                                                          : undefined);
    // };

    I.truly = function (s, e) {
        return e 
               ? ((e.z ? 1 : s !== 0) && (e.s ? 1 : s !== "") && s !== false && s !== undefined && s !== null && s !== NaN)
               : (s !== 0 && s !== "" && s !== false && s !== undefined && s !== null && s !== NaN);
    };
    
    I.size = function (o, t) {
        return o ? t ? Object.getOwnPropertyNames(o).length
                     : Object.keys(o).length
                 : 0;
    };

    // I.astEl = function (a) {
    //     return a.slice(-1)[0];
    // };

    I.inArray = function (n, a) {
        return (!!~(a || []).indexOf(n)); //same as array.indexOf(needle) > -1
    };

    I.deepClone = function (o) {
        const p = Object.getOwnPropertyNames(o.source);
        let i = p.length;
        while (i--) {
            if (o.exclude) {
                let j = o.exclude.length;
                while (j--) {
                    if (!this.inArray(p[i], o.exclude)) {
                        o.target[p[i]] = o.source[p[i]];
                    }
                }
            }
            else {
                o.target[p[i]] = o.source[p[i]];
            }
        }
    };

    I.getNestProp = function (o, s) {
        const p = s.split('.');
        for (s = 0; s < p.length; s++) {      
            if (!o.hasOwnProperty(p[s])) return null;
            o = o[p[s]];
        }
        return o; //Returns last obj prop val
    };


    /**
     * Assign instantiation to L
     */
    return I;

})();
Object.freeze(L);
