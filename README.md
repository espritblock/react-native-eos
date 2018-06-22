# react-native-eos

react native eosjs component upgrade mainnet 1.0.5

# eos node server

connect main net  http://mainnet.genereos.io

# install

```

npm install react-native-eosjs --save

```

# use

## App.js add EosProvider

```

import {EosProvider} from "react-native-eosjs";

<EosProvider server="http://mainnet.genereos.io" chainId="aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906" />

```

## delegate

```

import {Eos} from "react-native-eosjs";

Eos.delegate(pk,pay,recive,cpu,net,(r)=>{

})

```

## undelegate

```

import {Eos} from "react-native-eosjs";

Eos.undelegate(pk,from,recive,cpu,net,(r)=>{

})

```

## buyram

```

import {Eos} from "react-native-eosjs";

Eos.buyram(pk,pay,recive,count,(r)=>{

})

```

## sellram

```

import {Eos} from "react-native-eosjs";

Eos.buyram(pk,recive,bytes,(r)=>{

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

 Eos.transfer("eosio","aaa","1000.0000 ABC","","5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",true,(r)=>{

 });
 
 ```
 
# join eos open source 

wechat hl_294944589
 

# License

react-native-eos is released under GNU/GPL Version 3
