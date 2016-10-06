# VOCALR
The API_VOCALR application is a web app designed to show the features available into google chrome webspeech API. This web application is MVC compliant, it use NodeJS and Apache2 webserver as backend. 

Some of the features :
* French language
* XHR request
* MVC compliant (expressJS, NodeJS)
* Biorhythm API
* WTHR API
* SimpleBAN API
* Geolocation API
* Responsive Theme
* Bootstrap jumbotron Theme
* SSL/TLS compliant (startSSL certificates)
* Licensed under GPL3

## The demo
To view the demo , follow this link : [demo]

## Getting started
```sh
$ cd /var/www/vocal.siteweb.tld 
$ git clone https://github.com/tel2geo/t2g.git
```
Install the app.
```sh
$ npm install

```
Copy the following script into /etc/apache2/sites-available/vocal.siteweb.tld.conf (Apache2 SSL with StartSSL certificate port-forwarding wih nodeJS on top) and modify it in order to fit your needs :
```sh
SSLPassPhraseDialog exec:/etc/ssl/passphrase.sh
<VirtualHost *:80>
        ServerAdmin contact@siteweb.tld
        ServerName vocal.siteweb.tld
        DocumentRoot /var/www/vocal.siteweb.tld
    	ProxyPreserveHost on
   	ProxyPass / http://vocal.siteweb.tld:3000/
   	ProxyPassReverse / http://vocal.siteweb.tld:3000/
   <Directory "/var/www/vocal.siteweb.tld">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerAdmin webmaster@localhost
        ServerName vocal.siteweb.tld
        DocumentRoot /var/www/vocal.siteweb.tld
        SSLEngine on
	SSLCertificateChainFile /etc/ssl/sub.class2.server.ca.pem
	SSLCertificateFile /etc/ssl/ssl.crt
	SSLCertificateKeyFile /etc/ssl/ssl.key
	ProxyPreserveHost on
        ProxyPass / http://vocal.siteweb.tld:3000/
        ProxyPassReverse / http://vocal.siteweb.tld:3000/
	ProxyRequests off
   <Directory "/var/www/vocal.siteweb.tld">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
</IfModule>

```
Once done, restart apache2 instance after activating SSL and http_proxy.
```sh
$ a2enmod ssl && a2enmod proxy && a2enmod http_proxy && a2ensite /etc/apache2/sites-available/vocal.siteweb.tld && service apache2 restart
```
Note : before issuing this command, ensure you that the ssl certificates and passphrase from startSSL are in the right directory.

Now start the App :
```sh
node server
```

## License
Copyright (c) 2016 - 2017 TEL2GEO.FR - Thibaut LOMBARD
VOCALR application is a web app designed to show the features available into google chrome webspeech API. This web application is MVC compliant, it use NodeJS and Apache2 webserver as backend. 

API_VOCALR is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

## External links
* [meSpeak.js] - (modulary enhanced speak.js) Text to speech on the web is a library based on speak.js (a javascript port made with emscripten).
* [Annyang] - The speech recognition javascript library by TalAter.
* [NodeJS] - NodeJS

## contact
Feel free to contact me for a partnership, a job opportunity, i am currently open to most of coding proposals at **webmaster@tel2geo.fr**.

[comment]: #
   [demo]: <https://vocal.ctrlfagency.com>
   [meSpeak.js]: <http://www.masswerk.at/mespeak/>
   [Annyang]: <https://www.talater.com/annyang/>
   [NodeJS]: <https://nodejs.org/>


  

