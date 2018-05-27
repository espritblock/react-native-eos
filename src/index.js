import React, { Component } from 'react';
import {View,WebView,Platform,DeviceEventEmitter} from 'react-native';
import api from './eosapi'

/**
 * creator by smartblock
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
  static transfer(from,to,quantity,memo,pk,broadcast,callback){
    this.map["eos"].transfer(from,to,quantity,memo,pk,broadcast,callback);
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
  static createAccount(creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,callback){
    this.map["eos"].createAccount(creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,callback);
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
   * 对数据进行签名
   */
  sign = (data,pk,callback) => {
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_sign_data,data,pk}));
    this.signCallback=callback;
  }

  /**
   * 转账
   */
  transfer = (from,to,quantity,memo,pk,broadcast,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_transfer,from,to,quantity,memo,pk,broadcast,eosServer:this.props.server}));
    this.transferCallback=callback;
  }

   /**
   * 创建账户
   */
  createAccount = (creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,callback) => {
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_create_account,creator,createPrivateKey,newAccount,onwerPublicKey,activePublicKey,eosServer:this.props.server}));
    this.createAccountCallback=callback;
  }

   /**
   * 查询余额
   */
  balance = (contract,account,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_balance,contract,account,eosServer:this.props.server}));
    this.balanceCallback=callback;
  }


   /**
   * 检查公钥
   */
  checkPublicKey = (publickey,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_ispublickey,key:publickey,eosServer:this.props.server}));
    this.checkPublicKeyCallback=callback;
  }

  /**
   * 检查私钥
   */
  checkPrivateKey = (privatekey,callback) =>{
    this.refs.eosjs.postMessage(JSON.stringify({method:api.eos_isprivatekey,key:privatekey,eosServer:this.props.server}));
    this.checkPrivateKeyCallback=callback;
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
  }

  render() {
    return (<View style={{flex:1,height:0,zIndex:-999999,position:'absolute'}}><WebView ref="eosjs" style={{height:0,width:0,backgroundColor:'transparent'}} source={require('./eosjs.html')} onMessage={(e)=>{this.onMessage(e)}}/></View>);
  }
}
