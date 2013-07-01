_ZeLib.url = {
        get: {
            param: {
                byName: function(name) {
                    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                    var regexS = "[\\?&]" + name + "=([^&#]*)";
                    var regex = new RegExp(regexS);
                    var results = regex.exec(window.location.search);
                    if (results == null)
                        return "";
                    else
                        return decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
        },

        redirect: function(thePage) {
            window.location.href = thePage;
        },

        addParam: function(url, obj) {
            /* obj -> Array of objects like : {id: 'q', value: 'toto'} */
            var param = '?';
            var i;
            var tAr = [];

            if (obj[0] == undefined || obj == undefined) { return url; }
            for (i = 0; i < obj.length; i++) {
                if (_ZeLib.fn.inArray(obj[i].id, tAr) > -1) { error('Duplicate param name : `' + obj[i].id + '`'); } else { tAr.push(obj[i].id); };
            }

            param = param + obj[0].id + '=' + obj[0].value;

            if (obj.length > 1) {
                for (i = 1; i < obj.length; i++) {
                    param = param + '&' + obj[i].id + '=' + obj[i].value;
                }
            }

            param = param.toString().replace(new RegExp('[\/ ]', 'g'), '');

            return url + param;
        },

        fetchStatus: function(address, callback) {
            function returnStatus(req, status) {
                if (status == 200) { console.log("The url is available"); callback(status); }
                else { console.log("The url returned status code " + status); callback(status); }
            }

            function fs(address) {
                var client = new XMLHttpRequest();
                client.onreadystatechange = function() { if (this.readyState == 4) { returnStatus(this, this.status); } }
                client.open("HEAD", address);
                client.send();
            }

            fs(address);
        }
    };
