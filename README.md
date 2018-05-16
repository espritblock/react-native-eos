# react-native-eos

react native eosjs component upgrade to dawn4

# eos node server

see https://github.com/espritblock/eos.git

# install

npm install react-native-eosjs --save

# use

## App.js add EosProvider

import {EosProvider} from "react-native-eosjs";

<EosProvider server="http://127.0.0.1:8888" />

## seedPrivateKey

import {Eos} from "react-native-eosjs";

Eos.seedPrivateKey("onwer help world","active help world",(r)=>{

})

## createAccount

Eos.createAccount("eosio","5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3","aaa",onwerPublic,activePublic,(r)=>{

});

## balance

 Eos.balance("eosio","aaa",(r)=>{
 
 });

## transfer

 Eos.transfer("eosio","aaa","1000.0000 ABC","","5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",true,(r)=>{

 });
 
# join eos open source 

wechat hl_294944589
 

# License

react-native-eos is released under the Apache License 2.0.
