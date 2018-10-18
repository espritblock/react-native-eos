# react-native-eos

react native eosjs 1.0.0

compatible es5

support android & ios

example	https://github.com/espritblock/eos-mars/blob/master/app/Main.js

# install

```

npm install react-native-eosjs --save

android

	copy node_modules/react-native-eosjs/src/eos folder to android/app/src/main/assets/

```

# use

## App.js add EosProvider

```

import {EosProvider} from "react-native-eosjs";

<EosProvider 
	server="http://mainnet.genereos.io" 
	chainId="aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906" />

```

## delegate

```

import {Eos} from "react-native-eosjs";

Eos.delegate(pk,pay,recive,cpu,net,perm,(r)=>{

})

```

## undelegate

```

import {Eos} from "react-native-eosjs";

Eos.undelegate(pk,from,recive,cpu,net,perm,(r)=>{

})

```

## buyram

```

import {Eos} from "react-native-eosjs";

Eos.buyram(pk,pay,recive,count,perm,(r)=>{

})

```

## sellram

```

import {Eos} from "react-native-eosjs";

Eos.sellram(pk,recive,bytes,perm,(r)=>{

})

```

## seedPrivateKey

```

import {Eos} from "react-native-eosjs";

Eos.randomPrivateKey((r)=>{

})

```

## randomPrivateKey

```

import {Eos} from "react-native-eosjs";

Eos.randomPrivateKey((r)=>{

})

```
## privateToPublic

```

Eos.privateToPublic(pk,(r)=>{

})

```

## checkPrivateKey

```

Eos.checkPrivateKey(pk,(r)=>{

})

```

## checkPublicKey

```

Eos.checkPublicKey(puk,(r)=>{

})

```

## balance

```

 Eos.balance("eosio","aaa",(r)=>{
 
 });
 
 ```

## transfer

```

 Eos.transfer(contract,from,to,quantity,memo,pk,perm,broadcast,(r)=>{

 });
 
 ```
 
## createAccount

```

Eos.createAccount(creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,net,cpu,bytes,transfer,perm,(r)=>{

 });
 
 ```
 
## transaction

```

Eos.transaction(pk,actions,(r)=>{

});
 
 ```
 
# development

react-native add api you can modify src/api.js

eosjs lib upgrade you can modify src/eos.js

eos.js build 

	git clone https://github.com/EOSIO/eosjs/tree/v15.0.1
	
	cd eosjs
	
	npm install
	
	npm run build_browser  
	
	copy eos.js to here
 
# join eos open source 

wechat hl_294944589
 

# License

react-native-eos is released under GNU/GPL Version 3
