/* jshint browser:true */
(function () {
    'use strict';

    var apiKey = 'hJF39NqzxoTyItdsoY0oMHmGZmxlm2sy',
        vars = getUrlVars();

    function getUrlVars() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    if (vars.u) {
        window.userData = function userData(data) {
            if (data.http_code == 200) {
                var u = data.user;
                var name = document.getElementById('name');
                name.href = 'http://be.net/' + u.username;
                name.innerHTML = u.display_name;

                document.getElementById('avatar').src = u.images['50'];
                document.getElementById('occupation').innerHTML = u.occupation;
                document.getElementById('company').innerHTML = u.company;

                var views = document.getElementById('views');
                views.href = 'http://be.net/' + u.username + '/stats';
                views.innerHTML = u.stats.views;

                var appreciations = document.getElementById('appreciations');
                appreciations.href = 'http://be.net/' + u.username + '/stats';
                appreciations.innerHTML = u.stats.appreciations;

                var followers = document.getElementById('followers');
                followers.href = 'http://be.net/' + u.username + '/stats';
                followers.innerHTML = u.stats.followers;

                var following = document.getElementById('following');
                following.href = 'http://be.net/' + u.username + '/stats';
                following.innerHTML = u.stats.following;

            }
        };

        var udScript = document.createElement('script');
        udScript.src = 'http://www.behance.net/v2/users/' + vars.u + '?api_key=' + apiKey + '&callback=userData';
        document.head.appendChild(udScript);
    }

    if (vars.p == '1') {
        window.userProjects = function userProjects(data) {
            if (data.http_code == 200) {
                var p = data.projects[0];
                if (p) {
                    var projectName = document.getElementById('project-name');
                    projectName.href = p.url;
                    projectName.innerHTML = p.name;
                    document.getElementById('project-img-link').href = p.url;
                    document.getElementById('project-img').src = p.covers['230'];

                    document.getElementById('project-thumb').style.display = 'block';
                }
            }
        };
        var upScript = document.createElement('script');
        upScript.src = 'http://www.behance.net/v2/users/' + vars.u + '/projects?api_key=' + apiKey + '&callback=userProjects';
        document.head.appendChild(upScript);
    }

    if (vars.w == '1') {
        window.userWips = function userWips(data) {
            if (data.http_code == 200) {
                var w = data.wips[0];
                if (w) {
                    var wipName = document.getElementById('wip-name');
                    wipName.href = w.url;
                    wipName.innerHTML = w.title;
                    document.getElementById('wip-img-link').href = w.url;

                    var latestRev,
                        rev,
                        k;
                    for(k in w.revisions) {
                        rev = w.revisions[k];
                        if (!latestRev || latestRev.created_on < rev.created_on) {
                            latestRev = rev;
                        }
                    }
                    document.getElementById('wip-img').src = latestRev.images.thumbnail.url;
                    document.getElementById('wip-thumb').style.display = 'block';
                }
            }
        };
        var uwScript = document.createElement('script');
        uwScript.src = 'http://www.behance.net/v2/users/' + vars.u + '/wips?api_key=' + apiKey + '&callback=userWips';
        document.head.appendChild(uwScript);
    }

})();
