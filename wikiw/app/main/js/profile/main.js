const App = (() => {

    'use strict';

    /**
     * Dependency declaration
     */

    /**
     * Translations
     * @type {Object}
     */

    const t = {
        ru: {
            consPlaceholder: 'Название созвездия',
            errConsName: 'Меня не так зовут :(',
            errConsRepeat: 'Меня уже так называли :(',
            loading1: 'ЛЕТИМ...',
            loading2: 'ХМ-ХМ-ХМ...',
            loading3: 'ГРУЗИМСЯ...',
            loading4: 'ВЖУНЬ...',
            next: 'ДАЛЕЕ',
            // seeAlso: '== См. также ==',
            stage1Task: 'Восстановите координаты:',
            star0: 'Пробуждение',
            star1: 'Хаос',
            star2: 'Гармония',
            star3: 'Бездна',
            star4: 'Иллюзия',
            star5: 'Универсум',
            start: 'НАЧАТЬ'
        },
        en: {
            consPlaceholder: 'Constellation Name',
            errConsName: 'That`s not my name :(',
            errConsRepeat: 'I`ve been called that before :(',
            loading1: 'FLYING...',
            loading2: 'HMM...',
            loading3: 'LOADING UP...',
            loading4: 'VROOM...',
            next: 'NEXT',
            // seeAlso: '== See also ==',
            stage1Task: 'Restore coordinates:',
            star0: 'Awakening',
            star1: 'Chaos',
            star2: 'Harmony',
            star3: 'Abyss',
            star4: 'Illusion',
            star5: 'Universum',
            start: 'START'
        }
    };

    /**
     * App data
     * @type {Object}
     */

    const d = {
        ajaxSet: 'app/ajax/index.php',
        regex: {
            letter: {
                ru: '[А-Яа-яЁё]',
                en: '[A-Za-z]'
            }
        },
        temp: {}
    };

    /**
     * Private methods
     */

    const logout = () => {
        L.post({
            url: d.ajaxSet,
            data: {
                action: 'Logout'
            },
            responseType: 'json',
            onload: (r) => {
                location.reload(true);
            }
        });
    };

    const letterLang = (letter) => {
        // let lang;
        const regKeys = Object.keys(d.regex.letter);
        let i = regKeys.length;
        while (i--) 
            if((RegExp(d.regex.letter[regKeys[i]])).test(letter)) 
                return regKeys[i];
        return undefined;
        // for (let i = 0; (RegExp(d.regex.letter[regKeys[i]])).test(letter) == false; i++);
    };

    const randArticle = (options) => {
        console.log('working', locale);
        L.getJSON({
            url: 'https://'+ locale +'.wikipedia.org/w/api.php',
            data: {
                    origin: '*', 
                    action: 'query', 
                    format: 'json',
                    generator: 'random',
                    grnnamespace: '0'
                  },
            onload: (response) => {
                const id = Object.keys(response.query.pages)[0];
                if (options.callback) options.callback(id, response.query.pages[id].title);
            }
        });
    };

    const randMinMax = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    };

    const allSameLength = (a, l) => {
        const t = [];
        let i = a.length;
        while (i--) t.push(a[i].length);
        return l ? (Math.max(...t) === l) : (Math.min(...t) === Math.max(...t));
    };

    const swapItems = (array, fromInd, toInd) => {
        if (array[fromInd] && array[toInd]) {
            array[toInd] = [array[fromInd], array[fromInd] = array[toInd]][0];
            return 1;
        }
        return 0;
    };

    // const differStr = ()

    const chance = (coefficient, iteration) => {
        const result = {
            array: [],
            summary: 0
        };
        while (iteration--) {
            // let chance = Math.random();
 
            if (Math.random() <= coefficient) {
                result.array[iteration] = 1;
                result.summary += 1;
            }
            else {
                result.array[iteration] = 0;
            }
        }
        return result;
    };

    const longStrInds = (array, quantity) => {
        const indexes = [];
        const lengths = [];
        // let i;
        if (quantity && (array.length >= quantity) && !allSameLength(array)) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].length > 0) lengths[i] = array[i].length;
            }
            if(lengths.length >= quantity) {
                // for (i = 0; i < quantity; i++) {
                while (quantity--) {
                    const index = lengths.indexOf(Math.max(...lengths));
                    indexes.push(index);
                    lengths[index] = 0;
                }
                return indexes;
            }
        }
        return null;
    };

    const differVal = (o) => {
        let v = null;
        if (o.array.length <= o.max) {
            while (L.inArray(v = randMinMax(o.min, o.max), o.array) === true);
        }
        // if (o.always) o.always();
        if (o.success && L.type(v) === 'number') {
            o.success(v);
        }
        else if (o.fail && !v) {
            o.fail();
        }
        else {
            return v;
        }
    };

    const getUserVocabulary = (l, c) => {
        L.post({
            url: d.ajaxSet,
            data: {
                action: 'getUserVocabulary',
                language: l || locale
            },
            responseType: 'json',
            onload: c
        });
    }

    const binaryFill = (l, n) => {
        return (new Array(l).fill(1, 0, n).fill(0, n, l));
    };

    const randSort = (a) => {
        return a.sort(() => { return randMinMax(0, 1); });
    };

    const reverseHoley = (a) => {
        const n = [];
        const e = [];
        const t = [];
        let l = 0;
        let i = 0;
        for (i = 0; i < a.length; i++) {
            if (L.truly(a[i], {z: 1})) {
                if (!n[l]) n[l] = [];
                if (!L.inArray(l, e)) e.push(l);
                n[l].push(a[i]);
            }
            else {
                l = n.push(a[i]);
            }
        }
        for (i = 0; i < e.length; i++) {
            t.push(n[e[i]].reverse());
        }
        t.reverse();
        for(i = 0; i < t.length; i++) {
            n[e[i]] = t[i];
        }
    // console.log('e is ', e, 't is ', t);
        return n.flat();
    }

    const normalizeCase = (s, t) => {
        if (s.length === t.length) {
            const n = [];
            let i = s.length;
            while (i--) {
                if (s[i] == s[i].toUpperCase() && t[i] == t[i].toLowerCase()) {
                    n[i] = t[i].toUpperCase();
                }
                else if (s[i] == s[i].toLowerCase() && t[i] == t[i].toUpperCase()) {
                    n[i] = t[i].toLowerCase();
                }
                else {
                    n[i] = t[i];
                }
            }
            return n.join('');
        }
      return null;
    };

    const renderHTML = (s, o) => s.replace(/\${(.*?)}/g, (g,k) => L.truly(o[k], {z:1}) ? o[k] : '');

    const msToHMS = (t, d) => {
        return d ? (new Date(parseInt(t/1000) * 1000)).toISOString().substr(11, 8).replace(/:/g, d)
                 : (new Date(parseInt(t/1000) * 1000)).toISOString().substr(11, 8);
    };

    const dissimilarStr = (s) => {
        if (!s) return null;
        const t = {};
        let i = s.length;
        while(i--) {
            t[s[i]] = 1;
        }
        return L.size(t) === 1 ? 0 : 1;
    };

    const typeAnimation = (o) => {
        // const target = o.target;
        if (d.temp.typeAnimation) clearInterval(d.temp.typeAnimation);
        // console.log('text is ', o.text);
        const c = [...(o.text || o.target.attr(o.attribute))];
        let i = 0;

        o.target.attr(o.attribute, '');
        // if (interval) clearInterval(interval);
        d.temp.typeAnimation = setInterval(function(){
            if (i < c.length) {
                o.target.attr(o.attribute, o.target.attr(o.attribute) + c[i]);
            }
            else {
                clearInterval(d.temp.typeAnimation);
                d.temp.typeAnimation = null;
                if (o.callback) o.callback();
            }

            i++;
        }, o.frequency);
    };

    const createConstellation = (selector, starQuantity, clean) => {
        const svg = L(selector)[0];
          if(clean) L(svg).empty();
        const svgNS = 'http://www.w3.org/2000/svg';

        const addStar = (x, y, id) => {
            const circle = document.createElementNS(svgNS, 'circle');
            L(circle).attr({
                id: id,
                class: 'adventure-mode__star adventure-mode__star_animation_pulse',
                cx: x,
                cy: y,
                r: '1.2%',
                fill: 'gold',
                stroke: '#101010'
            });
            svg.insertBefore(circle, svg.firstChild);

            id++;
        };

        ((quantity) => {  //random stars
            // let x,y;
            while (quantity--) {
                const x = randMinMax(2.5, 97.5) + '%';
                const y = randMinMax(4.5, 94.5) + '%';
                addStar(x, y, 's' + quantity); //Dot settings
            }
        })(starQuantity);

        ((quantity) => { //connect stars
            // let s1Attrs, s2Attrs, line;
            while (quantity-- && quantity > 0) {
                const s1Attrs = L('#s' + quantity).attr(['cx', 'cy']);
                const s2Attrs = L('#s' + (quantity - 1)).attr(['cx', 'cy']);

                const line = document.createElementNS(svgNS, 'line');
                L(line).attr({
                    x1: s1Attrs.cx,
                    y1: s1Attrs.cy,
                    x2: s2Attrs.cx,
                    y2: s2Attrs.cy
                }).css({
                    stroke: 'gold', 
                    'stroke-width': '0.5%'
                });
  
                svg.insertBefore(line, svg.firstChild);
            }
        })(starQuantity);
    };

    const differArticle = (options) => {
        if (!options) options = {};
        L.getJSON({
            url: 'https://'+ (options.language || locale) +'.wikipedia.org/w/api.php',
            data: {
                origin: "*", 
                action: "query", 
                format: "json",
                generator: 'random',
                grnnamespace: '0',
                grnlimit: options.limit || 1
            },
            onload: (response) => {
                console.log('response is ', response);
                const ids = Object.keys(response.query.pages);
                
                let i = ids.length;
                while(i--) {
                    const title = response.query.pages[ids[i]].title;
                    console.log('i is ', i ,'title is ', title);

                    if (!L.inArray(title, options.vocab)) {
                        options.callback({
                            id: ids[i],
                            title: title
                        });
                        break;
                    }
                }
                if (!i || i===-1) differArticle(options);
            }
        });
    };

    const updateView = () => {
        if (!!~L('.interface').attr('class').search(/go_get_collection/)) L('.collection__content').attr('style','') //prevent wrong behavior
        .attr('style', `height: ${parseInt(L('.interface-right__row-2').css('height')) - parseInt(L('.collection__header_type_inventory').css('height'))}px;`);
    }

    const flipUserCard = function (e) {
        L(e).hasClass('flip') ? L(e).removeClass('flip') : L(e).addClass('flip');
    }

function objPropPaths(o) {
  const r = [];
  function u(r) {
    let i = r.length;
    while (i--) {
        if (r[i-1] && !!~r[i-1].indexOf(r[i]) && r[i-1].length > r[i].length) r.splice(i, 1);
    }
    return r;
  }
  (function i (o, s) {
    for (let k in o) {
      if (typeof o[k] === 'object') { 
        i(o[k] , s.concat(s[0] ? '.' + k : k));
      }
    }
    r.push(s);
  })(o, '');
         r.length--;
  return u(r);
}

    const WikiMusic = new function () {
        const td = {
            a: new Audio,
            c: '',
            l: ['ru', 'en', 'uk', 'zh', 'ko', 'he', 'hi', 'th', 'it', 'ka', 'az', 'be', 'hy', 'arz', 'scn', 'tt', 'pt', 'ar', 'fi', 'tr', 'sr', 'lt', 'sl', 'gl', 'hr', 'el', 'simple', 'is', 'mk', 'cy', 'lv', 'ur'],
            p: [],
            n: 0,
            t: 0
        };

        td.a.addEventListener('ended', () => {
            // console.log('ENDED');
            this.play(td.n++);
        });
        td.a.addEventListener('timeupdate', () => {
            L('.wiki-music__timer_type_current').text(new Date(td.a.currentTime * 1000).toISOString().substr(11, 8));
        });
        td.a.addEventListener('loadedmetadata', () => {
            L('.wiki-music__timer_type_duration').text(new Date(td.a.duration * 1000).toISOString().substr(11, 8));
        });

        this.switch = (i) => {
            if (+i===i) {
                L('.button_type_play').swapClass('play', 'pause');
                td.a.pause();
                td.a.currentTime = 0;
                this.play(td.n += i);
            }
            else {
                if (L(i).hasClass('button_type_pause')) {
                    L(i).swapClass('pause', 'play');
                    td.a.pause();
                }
                else {
                    L(i).swapClass('play', 'pause');
                    td.a.play();
                }
            }
        };
        this.play = () => {
            if (!~td.n) td.n = 0;
            console.log('current trackNo ', td.n, 'playlist is ', td.p);
            if (td.n < td.p.length) {
                L('.wiki-music_state_search').swapClass('search', 'play');
                const l = td.p[td.n][0]; //l
                const o = td.p[td.n][1]; //o
                const v = td.p[td.n][2]; //v
                const e = td.p[td.n][3]; //e
                console.log('src is ', o, 'image is ', e);
                if (o) {
                    e ? L('.wiki-music__icon_type_default').css({'background-image': `url(${e})`, 'background-size': '100% 100%'})
                      : L('.wiki-music__icon_type_default').attr('style', '');
                    L('.button_type_image-source').attr('onclick', v ? `window.open('https://${td.c}.wikipedia.org/wiki/?curid=${v}', '_blank')` : '');
                    L('.button_type_audio-source').attr('onclick', `window.open('https://${td.c}.wikipedia.org/wiki/?curid=${l}', '_blank')`);
                    td.a.src = o;
                    td.a.play().catch(() => {
                        console.log('bad one ', o, 'index ', td.n);
                        td.p.splice(td.n, 1);
                        this.play(td.n++);
                    });
                }
                else {
                    this.play(td.n++); //play next
                }
            }
            else {
                L('.wiki-music__icon_type_default').attr('style', '');
                L('.wiki-music_state_play').swapClass('play', 'search');
                this.getPlaylist((p) => {
                    this.play(td.p = td.p.concat(p));
                }, td.c = td.l[randMinMax(0, td.l.length - 1)]);
            }
        };
        this.getPlaylist = (c, l) => {
            console.log('locale ', l);
            L.getJSON({
                // url: 'https://simple.wikipedia.org/w/api.php',
                url: 'https://' + (l ? l : locale) + '.wikipedia.org/w/api.php',
                data: {
                    origin: '*', 
                    action: 'query', 
                    format: 'json',
                    generator: 'random',
                    grnnamespace: '6',
                    grnlimit: 500,
                    prop: 'imageinfo',
                    iiprop: 'url'
                },
                onload: (r) => {
                    console.log('r is ', r);
                    const k = Object.keys(r.query.pages);
                    let i = [], p = [];
                    for (let e = k.length; e--;) {
                        const u = L.getNestProp(r, `query.pages.${k[e]}.imageinfo.0.url`);
                        if (u) {
                            // ('jpg' !== u.slice(-3) && 'png' !== u.slice(-3) || i.push(u));
                            ('jpg' !== u.slice(-3) && 'png' !== u.slice(-3) || (i.length <= p.length) && i.push([k[e],u]));
                            ('ogg' === u.slice(-3) && p.push([k[e],u].concat(i.pop())));
                        }
                    }
                    p[0] ? (td.t = 0, c(p)) : this.getPlaylist(c, td.t < 10 ? l : td.c = td.l[randMinMax(0,td.l.length-1)]); 
                    td.t++; 
                    console.log('playlist',td.p, 'try ', td.t - 1);
                }
            });
        };
        this.start = () => {
            // console.log('START');
            L('.wiki-music_state_ready').toggleAttr('onclick').swapClass('ready', 'search');
            this.getPlaylist((p) => {
                this.play(td.p = p);
            }, td.c = td.l[randMinMax(0, td.l.length - 1)]);
        }
    };

    const Social = new function () {
        this.go = () => {
            if (L('[class*=go_get_social]')[0]) {
                L('.interface').removeClass('^go_');
            }
            else {
                L('.interface').swapClass('^go_', 'go_get_social_state_loading');
            }
        }
    };

    const Collection = new function () {
        const td = {
            template: {
                symdiglet: '<div class="collection__content-row collection__content-row_type_symdiglet group_${g}">\
                                <span class="collection__left-cell">${k}</span>\
                                <span class="collection__right-cell">${d}</span>\
                            </div>',
                image: '<div class="collection__content-row collection__content-row_type_image group_${g}">\
                            <span class="collection__image-border"></span>\
                            <div class="collection__image-container">\
                                <span class="collection__image image" style="background-image:url(https://upload.wikimedia.org/wikipedia/${d})"></span>\
                                <button class="collection__button collection__button_type_as-image icon ${i}"\
                                        onclick="App.tryOnCollection(1, this, this.previousElementSibling);"></button>\
                                <button class="collection__button collection__button_type_as-background icon ${b}"\
                                        onclick="App.tryOnCollection(0, this, this.parentNode.firstElementChild);"></button>\
                            </div>\
                            <span class="collection__image-border"></span>\
                        </div>'
            }
        };

        this.save = (f) => {
            if (f) { //apply
                this['imageCurr'] = L('.user-card__image')[0].style['background-image'];
                this['backgroundCurr'] = L('.background__default')[0].style['background-image'];
                L('.go_get_collection_state_tryon').swapClass('_state_tryon', '');
                L.post({
                    url: d.ajaxSet,
                    data: {
                        action: 'saveImageSet',
                        background: L('.background__default')[0].style['background-image'] ? L('.background__default')[0].style['background-image'].split('/wikipedia/')[1].slice(0, -2) : '',
                        image:  L('.user-card__image')[0].style['background-image'] ? L('.user-card__image')[0].style['background-image'].split('/wikipedia/')[1].slice(0, -2) : ''
                    },
                    responseType: 'text',
                    onload: (r) => { console.log('saveimageset ' , r); }
                });
            }
            else { //decline
                L('.user-card__image')[0].style['background-image'] = this.imageCurr;
                L('.background__default')[0].style['background-image'] = this.backgroundCurr;
                L('.go_get_collection_state_tryon').swapClass('_state_tryon', '');
                L('.collection__image-container .const_theme_gold').swapClass('const_theme_gold', 'theme_dark');
                L('.collection__image-container .default').swapClass('theme_dark', 'const_theme_gold');
            }
        } 
        this.tryOn = (f, e, s) => {
            s = s.style['background-image'];
            const i = f ? 'image' : 'background';
                  f = f ? '.user-card__image' : '.background__default';
            if (this['imageCurr'] === undefined) this['imageCurr'] = L('.user-card__image')[0].style['background-image'];
            if (this['backgroundCurr'] === undefined) this['backgroundCurr'] = L('.background__default')[0].style['background-image'];
            if (L(e).hasClass('theme_dark')) {
                L('.collection__button_type_as-' + i + '.const_theme_gold').swapClass('const_theme_gold', 'theme_dark');
                L(e).swapClass('theme_dark', 'const_theme_gold');
                L(f)[0].style['background-image'] = s;
                if (s === this[i + 'Curr']) {
                    if (this.imageCurr === L('.user-card__image')[0].style['background-image'] && this.backgroundCurr === L('.background__default')[0].style['background-image']) L('.go_get_collection_state_tryon').swapClass('_state_tryon', '');                
                }
                else {
                    L('.go_get_collection').swapClass('go_get_collection', 'go_get_collection_state_tryon');
                }
            }
            else {
                L(e).swapClass('const_theme_gold', 'theme_dark');
                if (s === this[i + 'Curr']) {
                    L(f)[0].style['background-image'] = '';
                    L('.go_get_collection').swapClass('go_get_collection', 'go_get_collection_state_tryon');
                }
                else {
                    L(f)[0].style['background-image'] = this[i + 'Curr'];
                    if (this.imageCurr === L('.user-card__image')[0].style['background-image'] && this.backgroundCurr === L('.background__default')[0].style['background-image']) L('.go_get_collection_state_tryon').swapClass('_state_tryon', '');
                    L('.collection__button_type_as-' + i + '.default').swapClass('theme_dark', 'const_theme_gold');
                }
            }
            // console.log('this is ', this);
        }
        this.toggle = (e) => {
            // console.log('e is ', e);
            // L('.collection').swapClass('^collection_border', L('.collection__inventory-content')[0].lastElementChild.offsetTop < L('.collection__media-content')[0].lastElementChild.offsetTop ? 'collection_border_media' : 'collection_border_inventory');
            if (e.pop) {
                // console.log('here', e);
                let i = e.length;
                while (i--) {
                    // if (L('#' + e[i]).hasClass('const_theme_gold')) L('#' + e[i]).swapClass('^const', 'theme_gold_transparent');
                    L('.group_'+ e[i]).attr('style', '');
                    L('#' + e[i] + '.const_theme_gold').swapClass('const_theme_gold', 'theme_gold_transparent');
                    // console.log('e.id is ', e.id);
                   
                }
            }
            else {
                L(e).swapClass('*theme', L(e).hasClass('theme_gold_transparent') ? 'const_theme_gold' : 'theme_gold_transparent');
                // console.log('toggling group is ',  L('.group_'+ e.id));
                L('.group_'+ e.id).toggleView('display', 'grid');
                // console.log('its id ', L('.group_'+ e.id).attr('id'));
                if (e = L('.group_'+ e.id).attr('id')) this.toggle(e);
            }
        };
        this.go = () => {
            if (L('.interface[class*=go_get_collection]')[0]) {
                L('.interface').removeClass('^go_');
            }
            else {
                L('.interface').swapClass('^go_', 'go_get_collection_state_loading');
                L('[class*=collection__content-row_type_]').remove();
                L('.collection__content [class*=theme]').swapClass('*theme', 'collection__content-row_empty');
                L('.collection__content').attr('style', `height: ${L('.interface-right__row-2')[0].clientHeight - L('.collection__header_type_inventory')[0].clientHeight}px;`);
                // L('.collection').swapClass('^collection_border', L('.collection__inventory-content')[0].lastElementChild.offsetTop < L('.collection__media-content')[0].lastElementChild.offsetTop ? 'collection_border_media' : 'collection_border_inventory');
                L.post({
                    url: d.ajaxSet,
                    data: {action: 'getCollection'},
                    responseType: 'json',
                    onload: (r) => {
                        const paths = objPropPaths(r);
                        // console.log('paths is ', paths);
                        let i = paths.length;
                        while (i--) {
                            const d = L.getNestProp(r, paths[i]);
                            let p = paths[i].split('.');
                            const t = p[0]; //template
                            const g = p.slice(-1)[0]; //group
                            const k = Object.keys(d || '');
                            let j = k.length;

                            if (j) {
                                // console.log('data-group is ', L('#' + group).attr('data-group'));
                                // paths[i] = L('#' + group).attr('data-group');
                                // L('#' + group + (paths[i] = L('#' + group).attr('data-group') ? ', #' + paths[i] : '')).swapClass('collection__content-row_empty', 'theme_gold_transparent');
                                L('.collection #' + g + ', .collection #' + t).swapClass('collection__content-row_empty', 'theme_gold_transparent');
                                while (j--) {
                                    console.log('quantity is ', d[k[j]]);
                                    p = {
                                        d: d[k[j]],
                                        g: g,
                                        k: k[j]
                                    };
                                    // console.log('me here ', L('.user-card__image')[0].style['background-image']);
                                    if (g === 'image') {
                                        p.i = p.b = 'theme_dark';
                                        if (L('.user-card__image')[0].style['background-image'] && p.d === L('.user-card__image')[0].style['background-image'].split('/wikipedia/')[1].slice(0, -2)) {
                                            // console.log('IMAGE ME ', path.d);
                                            p.i = 'const_theme_gold default';
                                        }
                                        if (L('.background__default')[0].style['background-image'] && p.d === L('.background__default')[0].style['background-image'].split('/wikipedia/')[1].slice(0, -2)) {
                                            // console.log('BACKGROUND ME ', path.d);
                                            p.b = 'const_theme_gold default';
                                        }
                                    }
                                    L('#' + g).put('after', renderHTML(td.template[t], p));
                                }
                            }
                            // console.log('template is ', template, 'group is ', group, 'data is ', data);
                        }
                        L('.go_get_collection_state_loading').removeClass('^_state');
                    }
                });
            }
        }
    };

//Оптимизировать имена
    const AdventureMode = new function () {
        const td = { //this data
            stages: [stage1, stage2, stage3, stage4, stage5, stage6],
            regex: {
                ru: {
                    // conjunction: /^([савик\|]){2}$/g,
                    // letter: '[А-Яа-яЁё]',
                    letterPool: 'абвгдежзийклмнопрстуфхцчшщыьэюя',
                    specialPool: ['(', ')', ',', '.', ':', '-', 'или', 'если', 'с', 'а', 'в', 'и', 'к'] //'(,.:-)савик'
                },
                en: {
                    // letter: '[A-Za-z]',
                    letterPool: 'abcdefghijklmnopqrstuvwxyz',
                    specialPool: ['(', ')', ',', '.', ':', '-', 'a', 'the', 'are', 'and'] //'(,.:-)—a'
                },
                // article: '==\\s+?(See\\s+?also|См\\.?\\s+?также|Notes|Примечания|References|Литература|Further\\sreading|Ссылки|External\\slinks)\\s+?==',
                number: '[0-9]',
                numberPool: '0123456789',
                letter: '[\u0041\-\u005A\u0061\-\u007A\u00AA\u00B5\u00BA\u00C0\-\u00D6\u00D8\-\u00F6\u00F8\-\u02C1\u02C6\-\u02D1\u02E0\-\u02E4\u02EC\u02EE\u0370\-\u0374\u0376\u0377\u037A\-\u037D\u0386\u0388\-\u038A\u038C\u038E\-\u03A1\u03A3\-\u03F5\u03F7\-\u0481\u048A\-\u0527\u0531\-\u0556\u0559\u0561\-\u0587\u05D0\-\u05EA\u05F0\-\u05F2\u0620\-\u064A\u066E\u066F\u0671\-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA\-\u06FC\u06FF\u0710\u0712\-\u072F\u074D\-\u07A5\u07B1\u07CA\-\u07EA\u07F4\u07F5\u07FA\u0800\-\u0815\u081A\u0824\u0828\u0840\-\u0858\u08A0\u08A2\-\u08AC\u0904\-\u0939\u093D\u0950\u0958\-\u0961\u0971\-\u0977\u0979\-\u097F\u0985\-\u098C\u098F\u0990\u0993\-\u09A8\u09AA\-\u09B0\u09B2\u09B6\-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF\-\u09E1\u09F0\u09F1\u0A05\-\u0A0A\u0A0F\u0A10\u0A13\-\u0A28\u0A2A\-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59\-\u0A5C\u0A5E\u0A72\-\u0A74\u0A85\-\u0A8D\u0A8F\-\u0A91\u0A93\-\u0AA8\u0AAA\-\u0AB0\u0AB2\u0AB3\u0AB5\-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05\-\u0B0C\u0B0F\u0B10\u0B13\-\u0B28\u0B2A\-\u0B30\u0B32\u0B33\u0B35\-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F\-\u0B61\u0B71\u0B83\u0B85\-\u0B8A\u0B8E\-\u0B90\u0B92\-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8\-\u0BAA\u0BAE\-\u0BB9\u0BD0\u0C05\-\u0C0C\u0C0E\-\u0C10\u0C12\-\u0C28\u0C2A\-\u0C33\u0C35\-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85\-\u0C8C\u0C8E\-\u0C90\u0C92\-\u0CA8\u0CAA\-\u0CB3\u0CB5\-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05\-\u0D0C\u0D0E\-\u0D10\u0D12\-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A\-\u0D7F\u0D85\-\u0D96\u0D9A\-\u0DB1\u0DB3\-\u0DBB\u0DBD\u0DC0\-\u0DC6\u0E01\-\u0E30\u0E32\u0E33\u0E40\-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94\-\u0E97\u0E99\-\u0E9F\u0EA1\-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD\-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0\-\u0EC4\u0EC6\u0EDC\-\u0EDF\u0F00\u0F40\-\u0F47\u0F49\-\u0F6C\u0F88\-\u0F8C\u1000\-\u102A\u103F\u1050\-\u1055\u105A\-\u105D\u1061\u1065\u1066\u106E\-\u1070\u1075\-\u1081\u108E\u10A0\-\u10C5\u10C7\u10CD\u10D0\-\u10FA\u10FC\-\u1248\u124A\-\u124D\u1250\-\u1256\u1258\u125A\-\u125D\u1260\-\u1288\u128A\-\u128D\u1290\-\u12B0\u12B2\-\u12B5\u12B8\-\u12BE\u12C0\u12C2\-\u12C5\u12C8\-\u12D6\u12D8\-\u1310\u1312\-\u1315\u1318\-\u135A\u1380\-\u138F\u13A0\-\u13F4\u1401\-\u166C\u166F\-\u167F\u1681\-\u169A\u16A0\-\u16EA\u1700\-\u170C\u170E\-\u1711\u1720\-\u1731\u1740\-\u1751\u1760\-\u176C\u176E\-\u1770\u1780\-\u17B3\u17D7\u17DC\u1820\-\u1877\u1880\-\u18A8\u18AA\u18B0\-\u18F5\u1900\-\u191C\u1950\-\u196D\u1970\-\u1974\u1980\-\u19AB\u19C1\-\u19C7\u1A00\-\u1A16\u1A20\-\u1A54\u1AA7\u1B05\-\u1B33\u1B45\-\u1B4B\u1B83\-\u1BA0\u1BAE\u1BAF\u1BBA\-\u1BE5\u1C00\-\u1C23\u1C4D\-\u1C4F\u1C5A\-\u1C7D\u1CE9\-\u1CEC\u1CEE\-\u1CF1\u1CF5\u1CF6\u1D00\-\u1DBF\u1E00\-\u1F15\u1F18\-\u1F1D\u1F20\-\u1F45\u1F48\-\u1F4D\u1F50\-\u1F57\u1F59\u1F5B\u1F5D\u1F5F\-\u1F7D\u1F80\-\u1FB4\u1FB6\-\u1FBC\u1FBE\u1FC2\-\u1FC4\u1FC6\-\u1FCC\u1FD0\-\u1FD3\u1FD6\-\u1FDB\u1FE0\-\u1FEC\u1FF2\-\u1FF4\u1FF6\-\u1FFC\u2071\u207F\u2090\-\u209C\u2102\u2107\u210A\-\u2113\u2115\u2119\-\u211D\u2124\u2126\u2128\u212A\-\u212D\u212F\-\u2139\u213C\-\u213F\u2145\-\u2149\u214E\u2183\u2184\u2C00\-\u2C2E\u2C30\-\u2C5E\u2C60\-\u2CE4\u2CEB\-\u2CEE\u2CF2\u2CF3\u2D00\-\u2D25\u2D27\u2D2D\u2D30\-\u2D67\u2D6F\u2D80\-\u2D96\u2DA0\-\u2DA6\u2DA8\-\u2DAE\u2DB0\-\u2DB6\u2DB8\-\u2DBE\u2DC0\-\u2DC6\u2DC8\-\u2DCE\u2DD0\-\u2DD6\u2DD8\-\u2DDE\u2E2F\u3005\u3006\u3031\-\u3035\u303B\u303C\u3041\-\u3096\u309D\-\u309F\u30A1\-\u30FA\u30FC\-\u30FF\u3105\-\u312D\u3131\-\u318E\u31A0\-\u31BA\u31F0\-\u31FF\u3400\-\u4DB5\u4E00\-\u9FCC\uA000\-\uA48C\uA4D0\-\uA4FD\uA500\-\uA60C\uA610\-\uA61F\uA62A\uA62B\uA640\-\uA66E\uA67F\-\uA697\uA6A0\-\uA6E5\uA717\-\uA71F\uA722\-\uA788\uA78B\-\uA78E\uA790\-\uA793\uA7A0\-\uA7AA\uA7F8\-\uA801\uA803\-\uA805\uA807\-\uA80A\uA80C\-\uA822\uA840\-\uA873\uA882\-\uA8B3\uA8F2\-\uA8F7\uA8FB\uA90A\-\uA925\uA930\-\uA946\uA960\-\uA97C\uA984\-\uA9B2\uA9CF\uAA00\-\uAA28\uAA40\-\uAA42\uAA44\-\uAA4B\uAA60\-\uAA76\uAA7A\uAA80\-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9\-\uAABD\uAAC0\uAAC2\uAADB\-\uAADD\uAAE0\-\uAAEA\uAAF2\-\uAAF4\uAB01\-\uAB06\uAB09\-\uAB0E\uAB11\-\uAB16\uAB20\-\uAB26\uAB28\-\uAB2E\uABC0\-\uABE2\uAC00\-\uD7A3\uD7B0\-\uD7C6\uD7CB\-\uD7FB\uF900\-\uFA6D\uFA70\-\uFAD9\uFB00\-\uFB06\uFB13\-\uFB17\uFB1D\uFB1F\-\uFB28\uFB2A\-\uFB36\uFB38\-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46\-\uFBB1\uFBD3\-\uFD3D\uFD50\-\uFD8F\uFD92\-\uFDC7\uFDF0\-\uFDFB\uFE70\-\uFE74\uFE76\-\uFEFC\uFF21\-\uFF3A\uFF41\-\uFF5A\uFF66\-\uFFBE\uFFC2\-\uFFC7\uFFCA\-\uFFCF\uFFD2\-\uFFD7\uFFDA\-\uFFDC]',                letter: '[\u0041\-\u005A\u0061\-\u007A\u00AA\u00B5\u00BA\u00C0\-\u00D6\u00D8\-\u00F6\u00F8\-\u02C1\u02C6\-\u02D1\u02E0\-\u02E4\u02EC\u02EE\u0370\-\u0374\u0376\u0377\u037A\-\u037D\u0386\u0388\-\u038A\u038C\u038E\-\u03A1\u03A3\-\u03F5\u03F7\-\u0481\u048A\-\u0527\u0531\-\u0556\u0559\u0561\-\u0587\u05D0\-\u05EA\u05F0\-\u05F2\u0620\-\u064A\u066E\u066F\u0671\-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA\-\u06FC\u06FF\u0710\u0712\-\u072F\u074D\-\u07A5\u07B1\u07CA\-\u07EA\u07F4\u07F5\u07FA\u0800\-\u0815\u081A\u0824\u0828\u0840\-\u0858\u08A0\u08A2\-\u08AC\u0904\-\u0939\u093D\u0950\u0958\-\u0961\u0971\-\u0977\u0979\-\u097F\u0985\-\u098C\u098F\u0990\u0993\-\u09A8\u09AA\-\u09B0\u09B2\u09B6\-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF\-\u09E1\u09F0\u09F1\u0A05\-\u0A0A\u0A0F\u0A10\u0A13\-\u0A28\u0A2A\-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59\-\u0A5C\u0A5E\u0A72\-\u0A74\u0A85\-\u0A8D\u0A8F\-\u0A91\u0A93\-\u0AA8\u0AAA\-\u0AB0\u0AB2\u0AB3\u0AB5\-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05\-\u0B0C\u0B0F\u0B10\u0B13\-\u0B28\u0B2A\-\u0B30\u0B32\u0B33\u0B35\-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F\-\u0B61\u0B71\u0B83\u0B85\-\u0B8A\u0B8E\-\u0B90\u0B92\-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8\-\u0BAA\u0BAE\-\u0BB9\u0BD0\u0C05\-\u0C0C\u0C0E\-\u0C10\u0C12\-\u0C28\u0C2A\-\u0C33\u0C35\-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85\-\u0C8C\u0C8E\-\u0C90\u0C92\-\u0CA8\u0CAA\-\u0CB3\u0CB5\-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05\-\u0D0C\u0D0E\-\u0D10\u0D12\-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A\-\u0D7F\u0D85\-\u0D96\u0D9A\-\u0DB1\u0DB3\-\u0DBB\u0DBD\u0DC0\-\u0DC6\u0E01\-\u0E30\u0E32\u0E33\u0E40\-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94\-\u0E97\u0E99\-\u0E9F\u0EA1\-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD\-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0\-\u0EC4\u0EC6\u0EDC\-\u0EDF\u0F00\u0F40\-\u0F47\u0F49\-\u0F6C\u0F88\-\u0F8C\u1000\-\u102A\u103F\u1050\-\u1055\u105A\-\u105D\u1061\u1065\u1066\u106E\-\u1070\u1075\-\u1081\u108E\u10A0\-\u10C5\u10C7\u10CD\u10D0\-\u10FA\u10FC\-\u1248\u124A\-\u124D\u1250\-\u1256\u1258\u125A\-\u125D\u1260\-\u1288\u128A\-\u128D\u1290\-\u12B0\u12B2\-\u12B5\u12B8\-\u12BE\u12C0\u12C2\-\u12C5\u12C8\-\u12D6\u12D8\-\u1310\u1312\-\u1315\u1318\-\u135A\u1380\-\u138F\u13A0\-\u13F4\u1401\-\u166C\u166F\-\u167F\u1681\-\u169A\u16A0\-\u16EA\u1700\-\u170C\u170E\-\u1711\u1720\-\u1731\u1740\-\u1751\u1760\-\u176C\u176E\-\u1770\u1780\-\u17B3\u17D7\u17DC\u1820\-\u1877\u1880\-\u18A8\u18AA\u18B0\-\u18F5\u1900\-\u191C\u1950\-\u196D\u1970\-\u1974\u1980\-\u19AB\u19C1\-\u19C7\u1A00\-\u1A16\u1A20\-\u1A54\u1AA7\u1B05\-\u1B33\u1B45\-\u1B4B\u1B83\-\u1BA0\u1BAE\u1BAF\u1BBA\-\u1BE5\u1C00\-\u1C23\u1C4D\-\u1C4F\u1C5A\-\u1C7D\u1CE9\-\u1CEC\u1CEE\-\u1CF1\u1CF5\u1CF6\u1D00\-\u1DBF\u1E00\-\u1F15\u1F18\-\u1F1D\u1F20\-\u1F45\u1F48\-\u1F4D\u1F50\-\u1F57\u1F59\u1F5B\u1F5D\u1F5F\-\u1F7D\u1F80\-\u1FB4\u1FB6\-\u1FBC\u1FBE\u1FC2\-\u1FC4\u1FC6\-\u1FCC\u1FD0\-\u1FD3\u1FD6\-\u1FDB\u1FE0\-\u1FEC\u1FF2\-\u1FF4\u1FF6\-\u1FFC\u2071\u207F\u2090\-\u209C\u2102\u2107\u210A\-\u2113\u2115\u2119\-\u211D\u2124\u2126\u2128\u212A\-\u212D\u212F\-\u2139\u213C\-\u213F\u2145\-\u2149\u214E\u2183\u2184\u2C00\-\u2C2E\u2C30\-\u2C5E\u2C60\-\u2CE4\u2CEB\-\u2CEE\u2CF2\u2CF3\u2D00\-\u2D25\u2D27\u2D2D\u2D30\-\u2D67\u2D6F\u2D80\-\u2D96\u2DA0\-\u2DA6\u2DA8\-\u2DAE\u2DB0\-\u2DB6\u2DB8\-\u2DBE\u2DC0\-\u2DC6\u2DC8\-\u2DCE\u2DD0\-\u2DD6\u2DD8\-\u2DDE\u2E2F\u3005\u3006\u3031\-\u3035\u303B\u303C\u3041\-\u3096\u309D\-\u309F\u30A1\-\u30FA\u30FC\-\u30FF\u3105\-\u312D\u3131\-\u318E\u31A0\-\u31BA\u31F0\-\u31FF\u3400\-\u4DB5\u4E00\-\u9FCC\uA000\-\uA48C\uA4D0\-\uA4FD\uA500\-\uA60C\uA610\-\uA61F\uA62A\uA62B\uA640\-\uA66E\uA67F\-\uA697\uA6A0\-\uA6E5\uA717\-\uA71F\uA722\-\uA788\uA78B\-\uA78E\uA790\-\uA793\uA7A0\-\uA7AA\uA7F8\-\uA801\uA803\-\uA805\uA807\-\uA80A\uA80C\-\uA822\uA840\-\uA873\uA882\-\uA8B3\uA8F2\-\uA8F7\uA8FB\uA90A\-\uA925\uA930\-\uA946\uA960\-\uA97C\uA984\-\uA9B2\uA9CF\uAA00\-\uAA28\uAA40\-\uAA42\uAA44\-\uAA4B\uAA60\-\uAA76\uAA7A\uAA80\-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9\-\uAABD\uAAC0\uAAC2\uAADB\-\uAADD\uAAE0\-\uAAEA\uAAF2\-\uAAF4\uAB01\-\uAB06\uAB09\-\uAB0E\uAB11\-\uAB16\uAB20\-\uAB26\uAB28\-\uAB2E\uABC0\-\uABE2\uAC00\-\uD7A3\uD7B0\-\uD7C6\uD7CB\-\uD7FB\uF900\-\uFA6D\uFA70\-\uFAD9\uFB00\-\uFB06\uFB13\-\uFB17\uFB1D\uFB1F\-\uFB28\uFB2A\-\uFB36\uFB38\-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46\-\uFBB1\uFBD3\-\uFD3D\uFD50\-\uFD8F\uFD92\-\uFDC7\uFDF0\-\uFDFB\uFE70\-\uFE74\uFE76\-\uFEFC\uFF21\-\uFF3A\uFF41\-\uFF5A\uFF66\-\uFFBE\uFFC2\-\uFFC7\uFFCA\-\uFFCF\uFFD2\-\uFFD7\uFFDA\-\uFFDC]',
                // letter: ,
                special: '[!@#$%~`\'^/<>&*(),.?"«»:;{}|—\\[\\]\\-_+=\\\\]',
                // pairSpecial: '[`\'"«»<>(){}\\[\\]]'
            }
        };

        function randExtract (callback) {
            //Каждый стейдж забирает 1 или в особом случае два экстракта
            //в зависимости от шансов, которые перебираются через счетчик td.wiki.counter
            //максимальное количество шансов равно максимально возможному количеству вытягиваний экстрактов стэйджами
            // if (td.wiki.longExtract && td.wiki.chance.array[td.wiki.currentPhase]) {
            let randInd;
            if (L.size(td.wiki.longExtract) && td.wiki.chance.array[td.wiki.counter]) {
                console.log('long extract');
                randInd = td.wiki.longExtract.splice(randMinMax(0, td.wiki.longExtract.length - 1), 1)[0];
            }
            else {
                console.log('short extract');
                randInd = differVal({
                    array: td.wiki.differExtract,
                    min: 0,
                    max: td.wiki.extract.length - 1
                }) || randMinMax(0, td.wiki.extract.length - 1); //Will generate differ vals, or random if length < 6
            }
            const randExtract = td.wiki.extract[randInd].trim();

            if ((randExtract.length === 1 && !allSameLength(td.wiki.extract, 1)) || (randExtract.length === 0 && !allSameLength(td.wiki.extract, 0))) { //if single char item was fetched and non-sinlgle chars exist
                randExtract(callback)
            }
            else {
                td.wiki.differExtract.push(randInd);
                td.wiki.counter++;

                if (callback) { 
                    callback(randExtract);
                }
                else {
                    return randExtract;
                }
            }
        }

        // function clean (c) {
        //     switch (c) {
        //         case 'close':
        //         // if (td.wiki) td.wiki = null;
        //         L('.interface').removeClass('^go_play_adventure-mode');
        //         L('.game-modes__icon_adventure-mode').removeClass('icon_animation_spin');
        //         break;
        //         case 'finish':
        //         L('.adventure-mode__button_type_main').swapAttr('onclick');
        //         L('.adventure-mode__top-row').toggleAttr('onclick');
        //         L('.adventure-mode__continue-value').text('');
        //         break;
        //     }
        // }

        function finish () {
            // clean('finish');
            // L('.adventure-mode__controls, .adventure-mode__constellation, .adventure-mode__task').attr('style', '');
            L('.adventure-mode__constellation, .adventure-mode__task').attr('style', '');
            L('.adventure-mode__button_type_main').swapAttr('onclick');
            L('.adventure-mode__top-row').toggleAttr('onclick');
            L('.adventure-mode__continue-value').text('');
            L('.go_play_adventure-mode_state_walkthrough').swapClass('walkthrough', 'finish');
            L('.adventure-mode__continue-loading').toggleView();
            L('.adventure-mode__finish-time').text((msToHMS((new Date).getTime() - td.wiki.passTime)));
            L('.adventure-mode__finish-full-length').text(td.wiki.length);
            L('.adventure-mode__finish-answer-length').text(td.wiki.answerLength);
            // L('.button adventure-mode__button_type_accept').toggleAttr('')
            L.post({
                url: d.ajaxSet,
                data: {
                    action: 'finishAdvMode',
                    title: td.wiki.title,
                    thumbnail: td.wiki.thumbnail,
                        // length: td.wiki.length,
                    answerLength: td.wiki.answerLength
                },
                responseType: 'json',
                onload: (response) => {
                    console.log('finish response is ', response);
                    // if (td.wiki.links) {
                    //     let i = td.wiki.links.length;
                    //     let t = [];
                    //     let title;

                    //     while (i--) {
                    //         const ind = differVal({
                    //             array: t,
                    //             min: 0,
                    //             max: td.wiki.links.length - 1
                    //         });
                    //         if (ind && !L.inArray(title = td.wiki.links[ind].title, response.vocab)) {
                    //                 // cont = td.wiki.links[ind].title;
                    //             break;
                    //         }
                    //         t.push(ind);
                    //     }

                    //     if (title) {
                    //         L('.adventure-mode__continue-value').text('«' + title + '»');
                    //     }
                    // }
                    // else {
                        differArticle({
                            vocab: response.vocab,
                            language: td.wiki.language,
                            limit: 500,
                            callback: (wiki) => {
                                L('.adventure-mode__continue-value').text('«' + wiki.title + '»');
                                L('.adventure-mode__continue-loading').toggleView();
                                // td.wiki = null;
                            }
                        });
                    // }
                    // L('.adventure-mode__continue-loading').css('opacity', '0');
                        // L('.adventure-mode__button_type_accept').toggleAttr('onclick');
                }
            });
        }

        function stage6 (callback) { //singularize
            // const letterReg = RegExp(td.regex.letter);
            const chars = [...td.wiki.answer];
            const single = [];
            let i = chars.length;

            const numberReg = RegExp(td.regex.number);
            const specialReg = RegExp(td.regex.special);
            while (i--) {
                if(!(/\s/).test(chars[i]) && !numberReg.test(chars[i]) && !specialReg.test(chars[i])) single[i] = chars[i].toLowerCase();
            }
            callback(single.join(''));
        }
     
        function stage5 (callback) { //mirror
            const words = td.wiki.answer.split(' ');
            // const words = ('Первая по времени создания часть Библии в еврейской традиции (иудаизме) называется «Танах»; в тексте Танаха нет самого этого слова, являющегося акронимом слов «Тора» (Закон), «Невиим» (Пророки), «Ктувим» (Писания). В христианстве она включается в состав Ветхого Завета. Еврейское Священное Писание не имеет единого названия, которое было бы общим для всего еврейского народа и применялось во все периоды его истории. Наиболее ранний и распространённый термин — הַסְּפָרִים, ха-сфарим (`книги`). Евреи эллинистического мира употребляли это же название на греческом языке — τα βιβλια — Библия, и оно вошло главным образом через свою латинскую форму в европейские языки. Танах представляет собой собрание книг, написанных на протяжении 1000 лет на древнееврейском и частично на арамейском языках с XIII по IV века до нашей эры (по другим оценкам с XII—VIII вв. до н. э. по II—I вв. до н. э.) и канонизированных от VI века до н.э. до начала II века н.э. На арамейском были написаны средняя часть книги пророка Даниила (2:4–7:28), некоторые части первой книги Ездры и один стих в книге пророка Иеремии (10:11). Танах входит в Священное Писание в иудаизме и христианстве. В исламе подлинность существующей Библии не признаётся.').split(' ');
            // console.log('words is ', td.wiki.answer.split(" "));
            let i = words.length;
            const halfMirror = Math.floor(i / 1.3);
            const fullMirror = i - halfMirror;
            const chances = randSort(binaryFill(i, fullMirror));
            const specialReg = RegExp(td.regex.special);
            // const specialReg = RegExp('[`\'"«»<>(){}\\[\\].,—\\-]');
            console.log('words length is ', i, 'halfMirror is ', halfMirror, 'fullMirror is ', fullMirror,'chances are ', chances);
            while (i--) {
                const word = words[i];
                console.log('word is ', word, 'unique is ',  dissimilarStr(word));
                if (word.length > 1 && dissimilarStr(word)) {
                    const char = [...word];
                    let rever = [];
                    
//FIX REVERSE ONLY TRUE VALS
                    if (chances[i] || (word.length === 2)) { //fullMirror
                        let j = char.length;
                        console.log('full');
                        while (j--) {
                            if (!specialReg.test(char[j])) rever[j] = char[j];
                        }
                    }
                    else { //halfMirror
                        let half = Math.ceil(char.length / 2);
                        console.log('half');
                        if (randMinMax(0, 1)) {
                            console.log('vtoraya polovina');
                            for (let j = char.length - 1; j >= half; j--) {
                                if (!specialReg.test(char[j])) rever[j] = char[j];
                                console.log('j is ', j, 'char[j] is ', char[j]);
                            }   
                        }
                        else {
                            console.log('pervaya polovina');
                            for (let j = 0; j < half; j++) {
                                if (!specialReg.test(char[j])) rever[j] = char[j];
                            }
                        }
                    }
                    // console.log('reverse is ', rever, 'reverseHoley(reverse) is ', reverseHoley(rever));
                    rever = reverseHoley(rever);
                    rever.map((val, ind) => {
                        console.log('v is ', val,'i is ', ind);
                        if (val) char[ind] = val;
                    });
console.log('word src ', words[i], 'new words is ', char.join(''), 'normalizeCase is ', normalizeCase(words[i], char.join('')));
console.log('---------------------');
                    words[i] = normalizeCase(words[i], char.join(''));
                }
            }
            callback(words.join(' '));
        }

        function stage4 (callback) { //quarter
            const differInds = [];
            const words = td.wiki.answer.split(' ');
            let i = words.length;
            // let i = Math.ceil(words.length / 1);
            console.log('td.wiki.answer is ', td.wiki.answer);
            if (i === 1 && words[0].length === 1) console.log('Lucky One !');
            while(i--) {
                console.log(' i is ', i, ' words[i] is ', words[i]);
                const word = words[i];
                if (word.length > 1) {
                    const range = Math.ceil(word.length / 3.5);
                    console.log('word is ', word, ' half is ', range);
                    words[i] = randMinMax(0, 1) ? '_' + word.slice(-range) // тут меньше
                                                : word.slice(0, range) + '_'; // тут больше
                }
                console.log('---------------');
            }
            callback(words.join(' '));
        }

        function stage3 (callback) {  //fulfill
            const differInds = [];
            const words = td.wiki.answer.split(' ');
            let i = Math.floor(words.length / 1.15) || 1;

            while (i--) {
                const randInd = differVal({
                    array: differInds,
                    min: 0,
                    max: words.length - 1
                });
                words[randInd] = '—';

                differInds.push(randInd);
            }
            callback(words.join(' '));
        }

        function stage2 (callback) {  //litter
            const answerWords = td.wiki.answer.split(' ');
            const addon = randExtract();
            const addonWords = addon.split(' ');
            const differAnswer = [];
            const differAddon = [];
            let i = Math.ceil(answerWords.length / 2);

            // (answerWords.length < addonWords) ?
            //                                   :;
            // const addonHalf = Math.ceil(addon.length / 2);
            while (i--) {
                differVal({
                    array: differAddon,
                    min: 0,
                    max: addonWords.length - 1,
                    success: (randAddonInd) => {
                        const randAnswerInd = differVal({
                            array: differAnswer,
                            min: 0,
                            max: answerWords.length - 1
                        });
                        answerWords[randAnswerInd] = randMinMax(0, 1) ? addonWords[randAddonInd] + ' ' + answerWords[randAnswerInd]//odd
                                                                      : answerWords[randAnswerInd] + ' ' + addonWords[randAddonInd]; //even
                        differAddon.push(randAddonInd);
                        differAnswer.push(randAnswerInd);
                    },
                    fail: () => {
                        console.log('swapped');
                        swapItems(answerWords, randMinMax(0, answerWords.length - 1), randMinMax(0, answerWords.length - 1));
                    }
                }); //|| randMinMax(0, addonWords.length - 1) //swap answer words if no distinct addons left     
                // console.log('iteration ', i);
            }
            console.log('addon is ', addon, 'answerWords is ', answerWords, 'addonWords is ', addonWords);
            callback(answerWords.join(' '));
        }

        function stage1 (callback) { //shuffle
            const chars = [...td.wiki.answer];
            const half = Math.ceil(chars.length / 2.3);
            const differCharInds = [];

            const numberReg = RegExp(td.regex.number);
            // const letterReg = RegExp(td.regex.letter);
            const letterQueryReg = RegExp(d.regex.letter[td.wiki.language]);
            const specialReg = RegExp(td.regex.special);

            const numberPool = td.regex.numberPool;
            const specialPool = td.regex[td.wiki.language].specialPool;
            // console.log('chars is ', chars);
            while (differCharInds.length < half) {
                const differCharInd = differVal({
                    array: differCharInds,
                    min: 0,
                    max: chars.length - 1
                });
                const char = chars[differCharInd];
                let newChar = char; //default value
                // console.log('randChar is ', char);
                console.log('current chas is ', char, 'is special ', specialReg.test(char));
                if (specialReg.test(char)) {
                    // console.log('IM SPECIAL');
                    newChar = specialPool[randMinMax(0, specialPool.length - 1)];
                }
                else if (numberReg.test(char)) {
                    newChar = numberPool[randMinMax(0, numberPool.length - 1)];
                }
                else if (!(/\s/).test(char)) {
                    const lettLang = letterLang(char);
                    const letterPool = td.regex[lettLang ? lettLang : td.wiki.language].letterPool;

                    newChar = (char === char.toLowerCase()) ? letterPool[randMinMax(0, letterPool.length - 1)]
                                                            : letterPool[randMinMax(0, letterPool.length - 1)].toUpperCase();
                }

                chars[differCharInd] = newChar;
                differCharInds.push(differCharInd);
            }
            console.log('newchars is ', chars, 'newSentence is ', chars.join(''));
            callback(chars.join(''));
        }

        function enterStage () {
            console.log('entered');
            L('.adventure-mode__star_animation_pulse').swapClass('pulse', 'pulse_disabled');
            L('.adventure-mode__star_animation_pulse_disabled').n(td.wiki.currentPhase)
                                                               .swapClass('pulse_disabled', 'pulse');
            td.wiki.currentPhase++;
            td.wiki.differStage.push(differVal({
                array: td.wiki.differStage,
                min: 0,
                max: td.stages.length - 1 // 5?
            }));
            // const currentStage = L.astEl(td.wiki.differStage);
            const currentStage = td.wiki.differStage.slice(-1)[0];
            L('.adventure-mode__phase-number').text(td.wiki.currentPhase);
            L('.adventure-mode__star-name').text('«' + t[locale]['star' + currentStage] + '»');
            // L('.adventure-mode__task-label').text(t[locale]['stage' + td.wiki.currentStage + 'Task']);
            // L('.adventure-mode__task-label').text(t[locale]['stage' + 1 + 'Task']);
            L('.adventure-mode__answer-input').val('')
                                              .attr('placeholder', t[locale]['stage' + currentStage + 'Task']); //FIX
            // L('.adventure-mode__fluid-content .adventure-mode__column-1').attr('onclick', 'App.taskAdventureMode()');

            console.log('wiki is ', td.wiki, 'this is ', this);
            randExtract((answer) => {
                L('.adventure-mode__button_type_main').text(t[locale].next);
                L('.adventure-mode__answer-length, .adventure-mode__answer-left-length').text(answer.length);
                console.log('answer is ', answer);
                td.wiki.answer = answer || finish();
                // td.wiki.stagestages[currentStage]();
                console.log('td.stages[currentStage] is ', td.stages[currentStage]);
                td.stages[currentStage]((task) => {
                // stage6((task) => {
                    L('.adventure-mode__task-output').val(task);
                    L('.adventure-mode__answer-task-length').text(task.length);
                });
            });
            //this['stage' + td.currentStage]()
        }

        function prepare (wiki, callback) {
            L('.interface').swapClass('^state', 'state_walkthrough');
            // L('.adventure-mode__controls').css('opacity', '0');
            L('.adventure-mode__constellation-name-input').val('«' + wiki.title + '»');
            L('.adventure-mode__top-row').toggleAttr('onclick');
            L('.wiki-frame__iframe').attr('src', 'https://' + wiki.language + '.m.wikipedia.org/wiki/?curid=' + wiki.id);
            // L('.adventure-mode__star_animation_pulse').swapClass('pulse', 'pulse_disabled');   
            // L('.adventure-mode__star_animation_pulse').not(0)
            //                                           .swapClass('pulse', 'pulse_disabled');         
            wiki.answerLength = 0;
            wiki.chance = chance(0.8, 6); //undo 0.8
            wiki.counter = 0;
            wiki.currentPhase = 0;
            // wiki.currentStage = randMinMax(1, 6);
            // wiki.currentStage = [];
            wiki.differExtract = [];
            wiki.differStage = [];
            wiki.longExtract = longStrInds(wiki.extract, wiki.chance.summary);
            // wiki.longExtract = extractItems({
            //     array: wiki.extract,
            //     indexes: longStrInds(wiki.extract, wiki.chance.summary),
            //     mutate: 1
            // });
            td.wiki = wiki;
            callback();
        }

        function filterExtract (e) {
            console.log('pure extract is ', e);
            return e.split(/<([^>]+)>((\s+)?(См.?(\s+)?также|See(\s+)?also|Notes|Примечания|References|Литература|Further(\s+)?reading|Ссылки|External(\s+)?links)(\s+)?)<([^>]+)>/)[0]
                    .replace(/<([^>]+)>/g, '  ')
                    .replace(/(?:') {2,}(?=\w)/g, '\'')
                    .replace(/(?:") {2,}(?=\w)/g, '"')
                    .replace(/(?:«) {2,}(?=\w)/g, '«')
                    .replace(/(?:») {2,}(?=\w)/g, '»')
                    .replace(/[^\S\n]+/g, ' ')
                    .split('\n')
                    .filter(v => v.trim() !== '');
                    // /[^\S\n]+/g - replace multiple whitespaces with a single, even non-recognized whitespaces
        }

        function constructWiki (article) {
            console.log('article is ', article);
            const id = Object.keys(article.query.pages)[0];
            console.log('id is ', id);
            return (id === '-1') ? null
                                 : {
                                    id: id,
                                    language: article.query.pages[id].pagelanguage,
                                    title: article.query.pages[id].title,
                                    length: article.query.pages[id].length,
                                    extract: filterExtract(article.query.pages[id].extract),
                                    thumbnail: L.getNestProp(article, 'query.pages.' + id + '.thumbnail.source') || '',
                                    links: L.getNestProp(article, 'query.pages.' + id + '.links')
                                   };
        }
        this.answer = function (v) {
            const l = L('.adventure-mode__answer-length').text() - v.length;
            (l > -1) ? L('.adventure-mode__answer-left-length').text(l)
                     : L('.adventure-mode__answer-left-length').text(0);
        }
        this.close = function (refresh) { 
            // clean('close');
            L('.interface').removeClass('^go_play_adventure-mode');
            L('.game-modes__icon_adventure-mode').removeClass('icon_animation_spin');
            if (refresh) {
                randArticle({
                    locale: locale,
                    callback: (id) => {
                        L('.wiki-frame__iframe').attr('src', 'https://' + locale + '.m.wikipedia.org/wiki/?curid=' + id);
                    }
                });
            }
        };
        this.completeStage = function () {
            finish(); return;
            console.log('wiki is ', td.wiki);
            console.log('complete ', L('.adventure-mode__answer-input').val().trim() == td.wiki.answer.toString().trim(), 'td.wiki.answer is ', td.wiki.answer);
            // return;
            const input = L('.adventure-mode__answer-input').val();
            if ((input === td.wiki.answer) && input.length) {
                // td.wiki.differStage.push(td.wiki.currentStage);
                td.wiki.answerLength += td.wiki.answer.length;
                console.log('td.wiki.differStage is ', td.wiki.differStage);
                if (td.wiki.differStage.length < 5) {
                // if (td.wiki.differStage.length < 2) {
                    console.log('go next');
                    enterStage();
                }
                else {
                    console.log('finish');
                    //finish
                    finish();
                }
            }
            else {
                // keep trying
            }
        };
        this.random = function () {
            // L('.adventure-mode__controls').hide();
            L('.go_play_adventure-mode_state_intro').swapClass('intro', 'auto');
            L('.adventure-mode__controls').attr('style', '');
            L('.adventure-mode__button_type_main').text(':');
            const language = L('.adventure-mode__button_type_language-switcher').text().trim();
            const interval = setInterval(() => {
                const content = L('.adventure-mode__button_type_main').text().trim();
                if (content.length === 5) {
                    L('.adventure-mode__button_type_main').text(':');
                }
                else {
                    L('.adventure-mode__button_type_main').text(content + ' :');
                }
            }, 600);
            getUserVocabulary(language, (v) => {
                differArticle({
                    vocab: v,
                    language: language,
                    limit: 500,
                    callback: (wiki) => {
                        L('.adventure-mode__constellation-name-input').val(wiki.title);
                        L('.adventure-mode__button_type_main')[0].click();
                        clearInterval(interval);
                    }
                });
            });
        };
        this.toggleControls = function (v) {
            // f ? L('.interface').swapClass('^state', 'state_typing')
            // f ? L('.go_play_adventure-mode_state_intro').swapClass('intro', 'typing')
            //   : L('.adventure-mode__constellation-name-input').val().length ? L('.go_play_adventure-mode_state_typing').swapClass('typing', 'ready')
            //                                                                 : L('.interface').swapClass('^state', 'state_intro'); //could be prepare or typing
            // L('.adventure-mode__controls').attr('style', '');
            v ? L('.adventure-mode__controls').css('opacity', '0')
              : L('.adventure-mode__controls').css('opacity', '1');
            // console.log('f is ', f);
        };
        this.toggleTask = function () {
            L('.adventure-mode__constellation, .adventure-mode__task').toggleView();
        };
        this.start = function () {
            const title = L('.adventure-mode__constellation-name-input').val();
            if (title) {
                L('.adventure-mode__button_type_main').toggleAttr('onclick').text(t[locale]['loading' + randMinMax(1,4)]);
                const language = L('.adventure-mode__button_type_language-switcher').text().trim();
                
                getUserVocabulary(language, (v) => {
                    console.log('vocabulary is ', v);
                    const userVocabulary = v ? v.split('|')
                                             : null;
                    // console.log('response is ', response);
                    console.log('vocab is ', userVocabulary);
                    L.getJSON({
                        url: 'https://' + language + '.wikipedia.org/w/api.php',
                        data: {
                            origin: '*', 
                            action: 'query', 
                            format: 'json', 
                            titles: title, 
                            prop: 'info|extracts|pageimages|links', 
                            exlimit: 'max', 
                            // explaintext: '', 
                            pithumbsize: '1000', 
                            redirects: 'true'
                        },
                        onload: (response) => {
                            const wiki = constructWiki(response);
                            L('.adventure-mode__button_type_main').toggleAttr('onclick');
                            if (wiki) {
                                if (L.inArray(wiki.title, userVocabulary)) {
                                    L('.adventure-mode__button_type_main').text(t[locale].start);
                                    L('.adventure-mode__constellation-name-input').val('')
                                                                                  .attr('placeholder', t[locale].errConsRepeat);
                                }
                                else {
                                    prepare(wiki, () => {
                                        wiki.passTime = (new Date).getTime();
                                        enterStage();
                                        L('.adventure-mode__button_type_main').swapAttr('onclick');
                                    });
                                }
                            }
                            else {
                                L('.adventure-mode__button_type_main').text(t[locale].start);
                                L('.adventure-mode__constellation-name-input').val('')
                                                                              .attr('placeholder', t[locale].errConsName);
                            }
                        }
                    });
                });      
            }
        };
        this.go = function (title) {
            // L('.adventure-mode__controls').css('style', '');
            if (L.type(title) === 'string') {
                if (title) {
                    // clean('continue');
                    console.log('here');
                    createConstellation('.adventure-mode__constellation', 5, 1);
                    L('.adventure-mode__constellation-name-input').val('');
                    L('.go_play_adventure-mode_state_finish').swapClass('finish', 'auto');
                
                
                    typeAnimation({
                        target: L('.adventure-mode__constellation-name-input'),
                        attribute: 'placeholder',
                        text: title,
                        frequency: 100,
                        callback: () => {
                            // L('.go_play_adventure-mode_initializing').swapClass('initializing', 'state_intro');
                            console.log('here', title);
                            L('.adventure-mode__constellation-name-input').val(title);
                            L('.adventure-mode__button_type_main')[0].click();
                        }
                    });
                }
            }
            else {

                createConstellation('.adventure-mode__constellation', 5, 1);
                L('.adventure-mode__controls').attr('style', '');
                L('.adventure-mode__constellation-name-input').val('');
                  // console.log('here2');
                L('.interface').swapClass('^go_', 'go_play_adventure-mode_state_intro');
                // L('.interface').addClass('go_play_adventure-mode_state_initializing');
                // L('.interface').addClass('go_play_adventure-mode_state_intro');
                L('.game-modes__icon_adventure-mode').addClass('icon_animation_spin');

                typeAnimation({
                    target: L('.adventure-mode__constellation-name-input'),
                    attribute: 'placeholder',
                    text: t[locale].consPlaceholder,
                    frequency: 100,
                    // callback: () => {
                    //     L('.go_play_adventure-mode_state_initializing').swapClass('initializing', 'intro');
                    // }
                });
            }
        };
    };
// console.log('AdventureMode is ', AdventureMode);
    /**
     * Public methods
     */

    const switchLanguage = (button) => {
        //Сделать locale по умолчанию первым в списке
        const langList = ['RU', 'EN'];
        const langListLength = langList.length;
        const currentLang = button.textContent.trim();
        const currentLangIndex = langList.indexOf(currentLang);

        (currentLangIndex == langListLength - 1) ? button.textContent = langList[0]
                                                 : button.textContent = langList[currentLangIndex + 1];
    };

    /**
     * Constructor
     * @const {function}
     * Contains App public methods
     */
    
    // const Constructor = function () {
        
        // this.randArticle = randArticle;
    // };
    document.addEventListener('DOMContentLoaded', () => {
        new MutationObserver((m) => {
            for (let k in m) {
                k = m[k];
                // console.log('k is ', k, 'search is ', k.oldValue.search(/go_get_collection/));
                switch (true) {
                    case (!!~(k.oldValue).search(/go_get_collection/) && !L(k.target).hasClass('^go_get_collection')):
                    L('.collection [style]').attr('style', '');
                    Collection.save(0);
                    break;
                }
            }
        }).observe(document.querySelector('.interface'), {
            attributeOldValue: 1
        });
    });

    randArticle({
        locale: locale,
        callback: (id) => {
            L('.wiki-frame__iframe').attr('src', 'https://' + locale + '.m.wikipedia.org/wiki/?curid=' + id);
        }
    });

    /**
     * @return {Object} - App instance
     */
    return new function () {
        this.switchLanguage = switchLanguage;
        this.goAdventureMode = AdventureMode.go;
        this.startAdventureMode = AdventureMode.start;
        this.toggleAdventureMode = AdventureMode.toggleTask;
        this.completeAdventureMode = AdventureMode.completeStage;
        this.toggleContrAdventureMode = AdventureMode.toggleControls;
        this.closeAdventureMode = AdventureMode.close;
        this.randomAdventureMode = AdventureMode.random;
        this.answerAdventureMode = AdventureMode.answer;
        this.flipUserCard = flipUserCard;
        this.goSocial = Social.go;
        this.goCollection = Collection.go;
        this.toggleCollection = Collection.toggle;
        this.updateView = updateView;
        this.tryOnCollection = Collection.tryOn;
        this.saveChangeCollection = Collection.save;
        this.startWikiMusic = WikiMusic.start;
        this.switchWikiMusic = WikiMusic.switch;
        // this.tryOnAsBackground = Collection.tryOn.bind(0, 0);
        // this.continueAdventureMode = AdventureMode.continue;
        this.logout = logout;
        // this.kek = letterLang;
    };
})();
Object.freeze(App);