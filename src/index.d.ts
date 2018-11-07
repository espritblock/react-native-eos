import * as React from 'react';

export interface EosCallback {
  (params?: any): void;
}

declare class Eos {
  static bind: (eos: Eos) => void;

  static unBind: () => void;

  /**
   * 生成私钥
   * @param {onwer助记词} ownerSeed 
   * @param {active助记词} activeSeed 
   * @param {回调函数} callback 
   */
  static seedPrivateKey: (
    ownerSeed: any,
    activeSeed: any,
    callback: (params?: any) => void,
  ) => void;

  /**
   * 生成随机私钥
   * @param {回调函数} callback 
   */
  static randomPrivateKey(callback: EosCallback): void;

  /**
   * 私钥生成公钥
   * @param {私钥} privateKey 
   * @param {回调函数} callback 
   */
  static privateToPublic(privateKey: any, callback: EosCallback): void;

  /**
   * 私钥数据签名
   * @param {数据} data 
   * @param {私钥} pk 
   * @param {回调} callback 
   */
  static sign(data: any, pk: any, callback: EosCallback): void;

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
  static transfer(
    contract: any,
    from: any,
    to: any,
    quantity: any,
    memo: any,
    pk: any,
    perm: any,
    broadcast: any,
    callback: EosCallback
  ): void;

  /**
   * 创建账户
   * @param {创建者} creator 
   * @param {创建者私钥} createPrivateKey 
   * @param {账户名} newAccount 
   * @param {owner公钥} onwerPublicKey 
   * @param {active公钥} activePublicKey 
   * @param {回调} callback 
   */
  static createAccount(
    creator: any,
    createPrivateKey: any,
    newAccount: any,
    onwerPublicKey: any,
    activePublicKey: any,
    net: any,
    cpu: any,
    bytes: any,
    transfer: any,
    perm: any,
    callback: EosCallback
  ): void;

  /**
   * 余额查询
   * @param {合约账户} contract 
   * @param {查询账户} account 
   * @param {回调} callback 
   */
  static balance(
    contract: any,
    account: any,
    callback: EosCallback
  ): void;

  /**
   * 公钥校验
   * @param {公钥} publickey 
   */
  static checkPublicKey(publickey: any, callback: EosCallback): void;

   /**
   * 私钥校验
   * @param {私钥} privatekey 
   */
  static checkPrivateKey(privatekey: any, callback: EosCallback): void;

   /**
    * 抵押
    * @param {*} pk 
    * @param {*} pay 
    * @param {*} recive 
    * @param {*} cpu 
    * @param {*} net 
    * @param {*} callback 
    */
  static delegate(
    pk: any,
    pay: any,
    recive: any,
    cpu: any,
    net: any,
    perm: any,
    callback: EosCallback
  ): void;

  /**
   * 解除抵押
   * @param {} pk 
   * @param {*} pay 
   * @param {*} recive 
   * @param {*} cpu 
   * @param {*} net 
   * @param {*} callback 
   */
  static undelegate(
    pk: any,
    from: any,
    recive: any,
    cpu: any,
    net: any,
    perm: any,
    callback: EosCallback
  ): void;

  /**
   * 买内存
   * @param {*} pk 
   * @param {*} pay 
   * @param {*} recive 
   * @param {*} count 
   * @param {*} callback 
   */
  static buyram(
    pk: any,
    pay: any,
    recive: any,
    count: any,
    perm: any,
    callback: EosCallback
  ): void;

  /**
   * 卖内存
   * @param {*} pk 
   * @param {*} account 
   * @param {*} bytes 
   * @param {*} callback 
   */
  static sellram(
    pk: any,
    recive: any,
    bytes: any,
    perm: any,
    callback: EosCallback
  ): void;

  /**
   * 交易
   */
  static transaction(
    pk: any,
    actions: any,
    callback: EosCallback
  ): void;
}

export interface EosProviderProps {
  server: string;
  chainId: string;
}

declare class EosProvider extends React.Component <EosProviderProps, {}> {

}

export { 
  Eos,
  EosProvider,
}