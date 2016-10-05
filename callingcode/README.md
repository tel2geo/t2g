# CallingCode -  Phone data visualisation
The data vilualised are the callingcode used by countries, the source code use nodejs libraries, view the package.json of 'webgl-globes' for further informations. 

## Features : 
* d3.js
* three.js
* AJAX
* Opendata callingcode 
* common country names callingcode database here [api-commons-callingcode]

# install

Choose your own preferences (python simplehttpserver or apache2).. 
For apache 2 : 
```html
clone or copy the repo
cd into the folder
npm install
sudo su && cp callingcode.tel2geo.fr /etc/apache2/sites-available/ && a2ensite callingcode.tel2geo.fr && service apache2 restart
```

## Demo 
[here]

##  Credits
Inspired by this work at [delimited.io]. License MIT.

## contact
Feel free to contact me for a partnership, a job opportunity, i am currently open to most of coding proposals at **webmaster@tel2geo.fr**.

Sincerely, 
Thibaut LOMBARD.

[comment]: #
   [delimited.io]: <http://www.delimited.io/blog/2015/5/16/interactive-webgl-globes-with-threejs-and-d3>
   [api-commons-callingcode]: <https://github.com/tel2geo/t2g/tree/master/api/callingcode>
   [here]: <http://callingcode.tel2geo.fr>

