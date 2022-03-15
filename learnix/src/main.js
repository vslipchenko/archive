console.log('Have a nice day, 👨‍💻 👩‍💻 !');
        const go = {
            d: document.createElement('_'),
            eventBindAll: (s, e, f) => {
                const element = document.querySelectorAll(s);
                for (s = 0; s < element.length; s++) {
                    element[s].addEventListener(e, f);
                }
            },
            get: (s) => {
                return document.querySelector(s);
            },
            getAll: (s) => {
                return document.querySelectorAll(s);
            }
        };

        const navigateMenu = _ => {
            _ = _.target;
            if (!_.classList.contains('selected')) {
                go.getAll('.menu-item.expand').forEach(item => {
                    if (!item.contains(_)) {
                        item.classList.remove('expand');
                        item.childNodes.forEach(link => {
                            if(link.classList) link.classList.remove('selected');
                        });
                    }
                });   
           
                _.classList.add('selected');
                _.parentElement.classList.add('expand');

                (go.get('.main-content.show') || go.d).classList.remove('show');
                // if (_.dataset.contentId) {
                    // go.getAll('.sidebar').forEach( e => {
                    //     e.classList.remove('expand');
                    // });
                (go.get(`#${_.dataset.contentId}`) || go.d).classList.add('show');
                // }
            };
        };

        const navigateGithub = _ => {
            _ = _.target;
            _ = Array.from(go.getAll('.github-info__sur-name'))
                     .find(e => e.textContent ===  _.textContent);
            if (_)  {_.parentElement.click();}
        };

        go.eventBindAll('.sidebar', 'click', e => {
            e = e.target.parentElement;
            if (e.classList.contains('sidebar')) e.classList.toggle('expand');
        });
              
        go.eventBindAll('.menu-link', 'click', navigateMenu);

        go.eventBindAll('.main-title', 'click', () => {
            (go.get('.main-content.show') || go.d).classList.remove('show');
            go.getAll('.menu-item.expand').forEach(item => {
                item.classList.remove('expand');
                item.childNodes.forEach(link => {
                    if(link.classList) link.classList.remove('selected');
                });
            });  
        });

        go.eventBindAll('.main-info__from a', 'click', navigateGithub);