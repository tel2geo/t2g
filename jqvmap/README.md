# JQVMAP - Modded : High Quality Responsive interactive Map
![image](https://raw.githubusercontent.com/tel2geo/t2g/master/jqvmap/images/map.png)

This is the modded version of [JQVMAP] , an interactive Map with jQuery based on Jvectormap. 

## Added Features
* Responsive demo
* High Quality World Map
* Flags 32
* Custom label
* Countries such as Somalialand and Palestine...

### Adding your dataset 
JQVMAP is pretty simple to use, go to [js/jquery.vmap.sampledata.js] according to the [ISO-Country-codes] chosen your are able to add your own dataset into the JSON Object.
```sh
var example_data = { data ....}
```

### Changing colors
Firstly you are able to customize colors on this file **css/jqvmap.css**.
On the other hand edit the **demo.html** files javascript with the 2 colors variations...
```sh
scaleColors: ['#21759B', '#0089BF'],
```

### Customized tooltip, label
The label is customizable with your own functions, this following function permit to throw the data related to the example_data object and displays the flag associated to the country.
```sh
		onLabelShow: function (event, label, code) {
			if(example_data[code] > 0)
				label.append('<p class="jqvmap-label"><a class="f32"><i class="flag '+code.toLowerCase()+'"></i></a><br><span>'+code+' '+example_data[code]+' Hello World !</span></p>'); 
		},
```

### SVG to interactive JQVMAP - jQuery

If you wish to convert your own SVG to interactive jQuery mapping..
* Choose your free licensed .SVG map
* Remove line breaks (CRLF) from your source code

```sh
tr --delete '\n' < map.svg > map-without-linebreaks.svg
```

* Customize the source-code on the [repo] or taken from [codepen].
* Add the JSON  into [maps/jquery.vmap.world.js]
* Into the [demo.html] file, modify the the map by your map name..
```sh
map: 'world_en',
```
* Once job is done, load your data...

## Licenses
Official version of [JQVMAP] is licensed under [GNU-GPL] License, this work is free too...
Copyleft - Thibaut Marie Pierre LOMBARD


[comment]: #
   [JQVMAP]: <https://jqvmap.com/>
   [ISO-Country-codes]: <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>
   [repo]: <https://github.com/tel2geo/t2g/tree/master/jqvmap/>
   [maps/jquery.vmap.world.js]: <https://github.com/tel2geo/t2g/tree/master/jqvmap/maps/jquery.vmap.world.js>
   [demo.html]: <https://github.com/tel2geo/t2g/tree/master/jqvmap/demo.html>
   [js/jquery.vmap.sampledata.js]: <https://github.com/tel2geo/t2g/tree/master/jqvmap/js/jquery.vmap.sampledata.js>
   [image]: <https://raw.githubusercontent.com/tel2geo/t2g/master/jqvmap/images/map.png>
   [codepen]: <http://codepen.io/anon/pen/ZYWxbJ>
   [GNU-GPL]: <https://www.gnu.org/licenses/licenses.fr.html>
