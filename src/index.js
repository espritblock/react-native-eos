import React, { Component } from 'react';
import {View,WebView,Platform,DeviceEventEmitter} from 'react-native';
import api from './eosapi';

const source = (Platform.OS == 'ios') ? require('./eos/eosjs.html') : {'uri':'file:///android_asset/eos/eosjs.html',baseUrl:"file:///android_asset/eos/"}

/**
 * creator by espritblock
 */
export class Eos {

  static bind(eos) {
    this.map["eos"] = eos;
  }

  static unBind() {
    this.map["eos"] = null;
    delete this.map["eos"];
  }

  /**
   * 生成私钥
   * @param {onwer助记词} ownerSeed 
   * @param {active助记词} activeSeed 
   * @param {回调函数} callback 
   */
  static seedPrivateKey(ownerSeed,activeSeed,callback){
    this.map["eos"].seedPrivateKey(ownerSeed,activeSeed,callback);
  }

  /**
   * 生成随机私钥
   * @param {回调函数} callback 
   */
  static randomPrivateKey(callback){
    this.map["eos"].randomPrivateKey(callback);
  }

  /**
   * 私钥生成公钥
   * @param {私钥} privateKey 
   * @param {回调函数} callback 
   */
  static privateToPublic(privateKey,callback){
    this.map["eos"].privateToPublic(privateKey,callback);
  }

  /**
   * 私钥数据签名
   * @param {数据} data 
   * @param {私钥} pk 
   * @param {回调} callback 
   */
  static sign(data,pk,callback){
    this.map["eos"].sign(data,pk,callback);
  }

  /**
   * 转账，不广播
   * @param {从} from 
   * @param {到} to 
   * @param {1.0 EOS} quantity 
   * @param {备注} memo 
   * @param {私钥} pk 
   * @param {是否广播} broadcast 
   * @param {回调} callback 
   */
  static transfer(contract,from,to,quantity,memo,pk,perm,broadcast,callback){
    this.map["eos"].transfer(contract,from,to,quantity,memo,pk,perm,broadcast,callback);
  }

  /**
   * 创建账户
   * @param {创建者} creator 
   * @param {创建者私钥} createPrivateKey 
   * @param {账户名} newAccount 
   * @param {owner公钥} onwerPublicKey 
   * @param {active公钥} activePublicKey 
   * @param {回调} callback 
   */
  static createAccount(creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,net,cpu,bytes,transfer,perm,callback){
    this.map["eos"].createAccount(creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,net,cpu,bytes,transfer,perm,callback);
  }

  /**
   * 余额查询
   * @param {合约账户} contract 
   * @param {查询账户} account 
   * @param {回调} callback 
   */
  static balance(contract,account,callback){
    this.map["eos"].balance(contract,account,callback);
  }

  /**
   * 公钥校验
   * @param {公钥} publickey 
   */
  static checkPublicKey(publickey,callback){
    this.map["eos"].checkPublicKey(publickey,callback);
  }

   /**
   * 私钥校验
   * @param {私钥} privatekey 
   */
  static checkPrivateKey(privatekey,callback){
    this.map["eos"].checkPrivateKey(privatekey,callback);
  }

   /**
    * 抵押
    * @param {*} pk 
    * @param {*} pay 
    * @param {*} recive 
    * @param {*} cpu 
    * @param {*} net 
    * @param {*} callback 
    */
  static delegate(pk,pay,recive,cpu,net,perm,callback){
    this.map["eos"].delegate(pk,pay,recive,cpu,net,perm,callback);
  }

  /**
   * 解除抵押
   * @param {} pk 
   * @param {*} pay 
   * @param {*} recive 
   * @param {*} cpu 
   * @param {*} net 
   * @param {*} callback 
   */
  static undelegate(pk,from,recive,cpu,net,perm,callback){
    this.map["eos"].undelegate(pk,from,recive,cpu,net,perm,callback);
  }

  /**
   * 买内存
   * @param {*} pk 
   * @param {*} pay 
   * @param {*} recive 
   * @param {*} count 
   * @param {*} callback 
   */
  static buyram(pk,pay,recive,count,perm,callback){
    this.map["eos"].buyram(pk,pay,recive,count,perm,callback);
  }

  /**
   * 卖内存
   * @param {*} pk 
   * @param {*} account 
   * @param {*} bytes 
   * @param {*} callback 
   */
  static sellram(pk,recive,bytes,perm,callback){
    this.map["eos"].sellram(pk,recive,bytes,perm,callback);
  }

  /**
   * 交易
   */
  static transaction(pk,actions,callback){
    this.map["eos"].transaction(pk,actions,callback);
  }
}

Eos.map = {};

/**
 * eos 服务提供者
 */
export class EosProvider extends Component {

  constructor(props) {
    super(props);
    Eos.bind(this);
  }

  componentWillUnmount(){
    Eos.unBind();
  }

  /**
   * 初始化
   */
  init = (eosServer) => {
    this.eosServer = eosServer;
  }

  /**
   * 通过助记词生成私钥/公钥
   */
  seedPrivateKey = (ownerSeed,activeSeed,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_seed_private_key,ownerSeed,activeSeed}));
    this.seedPrivateKeyCallback=callback;
  }

   /**
   * 生成随机私钥
   */
  randomPrivateKey = (callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_random_private_key}));
    this.randomPrivateKeyCallback=callback;
  }

  /**
   * 私钥生成公钥
   */
  privateToPublic = (privateKey,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_private_public,privateKey}));
    this.privateToPublicCallback=callback;
  }

  /**
   * 对数据进行签名
   */
  sign = (data,pk,callback) => {
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_sign_data,data,pk}));
    this.signCallback=callback;
  }

  /**
   * 转账
   */
  transfer = (contract,from,to,quantity,memo,pk,perm,broadcast,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_transfer,contract,from,to,quantity,memo,pk,perm,broadcast,eosServer:this.props.server,chainId:this.props.chainId}));
    this.transferCallback=callback;
  }

   /**
   * 创建账户
   */
  createAccount = (creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,net,cpu,bytes,transfer,perm,callback) => {
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_create_account,creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,net,cpu,bytes,transfer,perm,eosServer:this.props.server,chainId:this.props.chainId}));
    this.createAccountCallback=callback;
  }

   /**
   * 查询余额
   */
  balance = (contract,account,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_balance,contract,account,eosServer:this.props.server,chainId:this.props.chainId}));
    this.balanceCallback=callback;
  }

   /**
   * 检查公钥
   */
  checkPublicKey = (publickey,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_ispublickey,key:publickey,eosServer:this.props.server,chainId:this.props.chainId}));
    this.checkPublicKeyCallback=callback;
  }

  /**
   * 检查私钥
   */
  checkPrivateKey = (privatekey,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_isprivatekey,key:privatekey,eosServer:this.props.server,chainId:this.props.chainId}));
    this.checkPrivateKeyCallback=callback;
  }

  /**
   * 抵押
   */
  delegate = (pk,pay,recive,cpu,net,perm,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_delegate,pk,pay,recive,cpu,net,perm,eosServer:this.props.server,chainId:this.props.chainId}));
    this.delegateCallback=callback;
  }

  /**
   * 解除抵押
   */
  undelegate = (pk,from,recive,cpu,net,perm,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_un_delegate,pk,from,recive,cpu,net,perm,eosServer:this.props.server,chainId:this.props.chainId}));
    this.undelegateCallback=callback;
  }

  /**
   * 购买内存
   */
  buyram = (pk,pay,recive,count,perm,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_buy_ram,pk,pay,recive,count,perm,eosServer:this.props.server,chainId:this.props.chainId}));
    this.buyramCallback=callback;
  }

  /**
   * 卖内存
   */
  sellram = (pk,recive,bytes,perm,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_sell_ram,pk,recive,bytes,perm,eosServer:this.props.server,chainId:this.props.chainId}));
    this.sellramCallback=callback;
  }

  /**
   * 交易
   */
  transaction = (pk,actions,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_transaction,pk,actions,eosServer:this.props.server,chainId:this.props.chainId}));
    this.transactionCallback=callback;
  }

  /**
   * 获取结果
   */
  onMessage = (e) =>{
    let result = JSON.parse(e.nativeEvent.data);
    //创建私钥
    if(result.method==api.eos_seed_private_key && this.seedPrivateKeyCallback){
      this.seedPrivateKeyCallback(result);
      this.seedPrivateKeyCallback = null;
    }
    //签名
    if(result.method==api.eos_sign_data && this.signCallback){
      this.signCallback(result);
      this.signCallback = null;
    }
    //转账
    if(result.method==api.eos_transfer && this.transferCallback){
      this.transferCallback(result);
      this.transferCallback = null;
    }
    //创建账户
    if(result.method==api.eos_create_account && this.createAccountCallback){
      this.createAccountCallback(result);
      this.createAccountCallback = null;
    }
    //查询余额
    if(result.method==api.eos_balance && this.balanceCallback){
      this.balanceCallback(result);
      this.balanceCallback = null;
    }
    //检查公钥
    if(result.method==api.eos_ispublickey && this.checkPublicKeyCallback){
      this.checkPublicKeyCallback(result);
      this.checkPublicKeyCallback = null;
    }
    //检查私钥
    if(result.method==api.eos_isprivatekey && this.checkPrivateKeyCallback){
      this.checkPrivateKeyCallback(result);
      this.checkPrivateKeyCallback = null;
    }
    //私钥生成公钥
    if(result.method==api.eos_private_public && this.privateToPublicCallback){
      this.privateToPublicCallback(result);
      this.privateToPublicCallback = null;
    }
    //生成随机私钥
    if(result.method==api.eos_random_private_key && this.randomPrivateKeyCallback){
      this.randomPrivateKeyCallback(result);
      this.randomPrivateKeyCallback = null;
    }
    //抵押
    if(result.method==api.eos_delegate && this.delegateCallback){
      this.delegateCallback(result);
      this.delegateCallback = null;
    }
    //解除抵押
    if(result.method==api.eos_un_delegate && this.undelegateCallback){
      this.undelegateCallback(result);
      this.undelegateCallback = null;
    }
    //购买内存
    if(result.method==api.eos_buy_ram && this.buyramCallback){
      this.buyramCallback(result);
      this.buyramCallback = null;
    }
    //卖出内存
    if(result.method==api.eos_sell_ram && this.sellramCallback){
      this.sellramCallback(result);
      this.sellramCallback = null;
    }
    //交易
    if(result.method==api.eos_transaction && this.transactionCallback){
      this.transactionCallback(result);
      this.transactionCallback = null;
    }
  }

  render() {
    return (<View style={{flex:1,height:100,position: 'absolute',zIndex:-999999}}><WebView ref="eosjs" style={{height:0,width:0,backgroundColor:'transparent'}} source={source} onMessage={(e)=>{this.onMessage(e)}} javaScriptEnabled={true} mixedContentMode="always"/></View>);
  }
}
