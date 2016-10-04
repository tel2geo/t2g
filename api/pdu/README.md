# T2G - PDU Encoder / Decoder
A tiny PDU Encoder / Decoder , programmed in perl / PHP. Useful into an SMS server and with AT commands .

## Features 
* Open-Source
* Json results
* Encode / Decode

## Usage
Var i = string
Var t = type ( enc , dec )
Var callback, for the callback..

Decoding  E8329BFD06DDDF72361904. 
```sh
https://api.tel2geo.fr/pdu/?i=E8329BFD06DDDF72361904&t=dec&callback=yourvar
```

Encoding hello world
```sh
https://api.tel2geo.fr/pdu/?i=hello world&t=enc&callback=yourvar
```


# demo and source-code 
* the demo is hosted [on-this-link]
* the source code is [here]

# license
Do what you do the best with it. 
Sincerely , Thibaut LOMBARD.

[comment]: #
   [on-this-link]: <https://api.tel2geo.fr/pdu/demo.html>
   [here]: <http://git.ctrlfagency.com/ctrlfagency/t2g/tree/master/api/pdu/>
