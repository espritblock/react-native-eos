
// The custom api is provided to react.
// You can add it yourself.

var ecc = Eos.modules.ecc;
var respErr = function(t, e) {
window.postMessage(JSON.stringify({
    method: t.method,
    isSuccess: !1,
    msg: "error",
    data: e
}))
}
var respSucc = function(t, e) {
window.postMessage(JSON.stringify({
    method: t.method,
    isSuccess: !0,
    msg: "success",
    data: e
}))
},
formatQua = function(t) {
var e = t.split(" "),
r = e[0].split(".");
if (r.length > 1) {
    var n = 4 - r[1].length;
    t = e[0];
    for (var i = 0; i < n; i++) t += "0";
    t = t + " " + e[1]
} else t = e[0] + ".0000 " + e[1];
return t
},
parseError = function(t) {
try {
    t = JSON.parse(t)
} catch(t) {
    return {
    code: 500,
    msg: "处理失败"
    }
}
var e = t.error.code;
return "3010000" == e ? {
    code: e,
    msg: "chain erro"
}: "3010001" == e ? {
    code: e,
    msg: "账户格式错误"
}: "3010002" == e ? {
    code: e,
    msg: "公钥错误"
}: "3010003" == e ? {
    code: e,
    msg: "私钥错误"
}: "3010004" == e ? {
    code: e,
    msg: "无权限"
}: "3010005" == e ? {
    code: e,
    msg: "请求错误"
}: "3010006" == e ? {
    code: e,
    msg: "交易错误"
}: "3010007" == e ? {
    code: e,
    msg: "ABI错误"
}: "3010008" == e ? {
    code: e,
    msg: "区块ID错误"
}: "3010009" == e ? {
    code: e,
    msg: "交易ID错误"
}: "3010010" == e ? {
    code: e,
    msg: "交易生成失败"
}: "3040005" == e || "3040006" == e ? {
    code: e,
    msg: "交易已过期"
}: "3040008" == e || "3040009" == e ? {
    code: e,
    msg: "重复交易"
}: "3050001" == e ? {
    code: e,
    msg: "账户已存在"
}: "3050002" == e || "3050004" == e ? {
    code: e,
    msg: "参数错误"
}: "3080001" == e ? {
    code: e,
    msg: "内存不足"
}: "3080002" == e || "3080003" == e ? {
    code: e,
    msg: "网络资源不足"
}: "3080004" == e || "3080005" == e ? {
    code: e,
    msg: "CPU资源不足"
}: "3080006" == e ? {
    code: e,
    msg: "交易超时"
}: "3081001" == e ? {
    code: e,
    msg: "CPU资源受限"
}: "3050003" == e ? {
    code: e,
    msg: "余额不足"
}: "3050000" == e ? {
    code: e,
    msg: "账户已存在"
}: 13 == e ? {
    code: e,
    msg: "账户不存在"
}: {
    code: e,
    msg: "处理失败"
}
};
window.onload = function() {
    document.addEventListener("message",
    function(msg) {
        var obj = eval("(" + msg.data + ")");
        if ("eos_seed_private_key" == obj.method) try {
            var ownerPrivate = ecc.seedPrivate(obj.ownerSeed),
            ownerPublic = ecc.privateToPublic(ownerPrivate),
            activePrivate = ecc.seedPrivate(obj.activeSeed),
            activePublic = ecc.privateToPublic(activePrivate);
            respSucc(obj, {
                ownerPrivate: ownerPrivate,
                ownerPublic: ownerPublic,
                activePrivate: activePrivate,
                activePublic: activePublic
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "生成私钥失败"
            })
        } else if ("eos_random_private_key" == obj.method) try {
            ecc.randomKey().then(function(t) {
                if (t) {
                    var e = t,
                    r = ecc.privateToPublic(e);
                    respSucc(obj, {
                        ownerPrivate: e,
                        ownerPublic: r
                    })
                } else respErr(obj, {
                    code: 500,
                    msg: "生成私钥失败"
                })
            }).
            catch(function(t) {
                respErr(obj, {
                    code: 500,
                    msg: "生成私钥失败"
                })
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "生成私钥失败"
            })
        } else if ("eos_sign_data" == obj.method) try {
            var data = obj.data,
            pk = obj.pk;
            if (!ecc.isValidPrivate(pk)) return void respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var signData = ecc.sign(data, pk);
            respSucc(obj, signData)
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "签名失败"
            })
        } else if ("eos_transfer" == obj.method) try {
            ecc.isValidPrivate(obj.pk) || respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var eoss = Eos({
                keyProvider: [obj.pk],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            }),
            quantity = formatQua(obj.quantity);
            eoss.transaction({
                actions: [{
                    account: obj.contract,
                    name: "transfer",
                    authorization: [{
                        actor: obj.from,
                        permission: obj.perm
                    }],
                    data: {
                        from: obj.from,
                        to: obj.to,
                        quantity: quantity,
                        memo: obj.memo
                    }
                }]
            },
            {
                broadcast: obj.broadcast
            }).then(function(t) {
                respSucc(obj, t)
            }).
            catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "转账失败"
            })
        } else if ("eos_create_account" == obj.method) try {
            var eoss = Eos({
                keyProvider: [obj.createPrivateKey],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            }),
            net = formatQua(obj.net),
            cpu = formatQua(obj.cpu);
            var bytes = parseInt(obj.bytes);
            
            var actions = {
                actions: [{
                    account: "eosio",
                    name: "newaccount",
                    authorization: [{
                        actor: obj.creator,
                        permission: obj.perm
                    }],
                    data: {
                        creator: obj.creator,
                        name: obj.newAccount,
                        owner: obj.onwerPublicKey,
                        active: obj.activePublicKey
                    }
                },{
                    account: "eosio",
                    name: "buyrambytes",
                    authorization: [{
                        actor: obj.creator,
                        permission: obj.perm
                    }],
                    data: {
                        payer: obj.creator,
                        receiver: obj.newAccount,
                        bytes: bytes
                    }
                },{
                    account: "eosio",
                    name: "delegatebw",
                    authorization: [{
                        actor: obj.creator,
                        permission: obj.perm
                    }],
                    data: {
                        from: obj.creator,
                        receiver: obj.newAccount,
                        stake_net_quantity:net,
                        stake_cpu_quantity:cpu,
                        transfer:obj.transfer
                    }
                }]
            };
            eoss.transaction(actions,
            {
                broadcast: true
            }).then(function(t) {
                respSucc(obj, t)
            }).catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "创建账户失败"
            })
        } else if ("eos_balance" == obj.method) try {
            var _eoss2 = Eos({
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            });
            _eoss2.getCurrencyBalance({
                code: obj.contract,
                account: obj.account
            }).then(function(t) {
                respSucc(obj, t)
            }).
            catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "查询余额失败"
            })
        } else if ("eos_isprivatekey" == obj.method) try {
            ecc.isValidPrivate(obj.key) ? respSucc(obj, !0) : respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "校验私钥失败"
            })
        } else if ("eos_ispublickey" == obj.method) try {
            ecc.isValidPublic(obj.key) ? respSucc(obj, !0) : respErr(obj, {
                code: 500,
                msg: "公钥格式错误"
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "校验公钥失败"
            })
        } else if ("eos_private_public" == obj.method) try {
            var publicKey = ecc.privateToPublic(obj.privateKey);
            respSucc(obj, {
                publicKey: publicKey
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "生成公钥失败"
            })
        } else if ("eos_delegate" == obj.method) try {
            ecc.isValidPrivate(obj.pk) || respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var eoss = Eos({
                keyProvider: [obj.pk],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            }),
            net = formatQua(obj.net),
            cpu = formatQua(obj.cpu);
            eoss.transaction({
                actions: [{
                    account: "eosio",
                    name: "delegatebw",
                    authorization: [{
                        actor: obj.pay,
                        permission: obj.perm
                    }],
                    data: {
                        from: obj.pay,
                        receiver: obj.recive,
                        stake_net_quantity: net,
                        stake_cpu_quantity: cpu,
                        transfer: 0
                    }
                }]
            },
            {
                broadcast: true
            }).then(function(t) {
                respSucc(obj, t)
            }).catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "抵押失败"
            })
        } else if ("eos_un_delegate" == obj.method) try {
            ecc.isValidPrivate(obj.pk) || respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var eoss = Eos({
                keyProvider: [obj.pk],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            }),
            _net = formatQua(obj.net),
            _cpu = formatQua(obj.cpu);
            eoss.transaction({
                actions: [{
                    account: "eosio",
                    name: "undelegatebw",
                    authorization: [{
                        actor: obj.from,
                        permission: obj.perm
                    }],
                    data: {
                        from: obj.from,
                        receiver: obj.recive,
                        unstake_net_quantity: _net,
                        unstake_cpu_quantity: _cpu
                    }
                }]
            },
            {
                broadcast: true
            }).then(function(t) {
                respSucc(obj, t)
            }).catch(function(t) {
                respErr(obj, parseError(t))
            });
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "撤销抵押失败"
            })
        } else if ("eos_buy_ram" == obj.method) try {
            ecc.isValidPrivate(obj.pk) || respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var eoss = Eos({
                keyProvider: [obj.pk],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            }),
            count = formatQua(obj.count);
            eoss.transaction({
                actions: [{
                    account: "eosio",
                    name: "buyram",
                    authorization: [{
                        actor: obj.pay,
                        permission: obj.perm
                    }],
                    data: {
                        payer: obj.pay,
                        receiver: obj.recive,
                        quant: count
                    }
                }]
            },
            {
                broadcast: true
            }).then(function(t) {
                respSucc(obj, t)
            }).catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "购买内存失败"
            })
        } else if ("eos_sell_ram" == obj.method) try {
            ecc.isValidPrivate(obj.pk) || respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var eoss = Eos({
                keyProvider: [obj.pk],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            });
            eoss.transaction({
                actions: [{
                    account: "eosio",
                    name: "sellram",
                    authorization: [{
                        actor: obj.recive,
                        permission: obj.perm
                    }],
                    data: {
                        account: obj.recive,
                        bytes: obj.bytes
                    }
                }]
            },
            {
                broadcast: true
            }).then(function(t) {
                respSucc(obj, t)
            }).catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "卖出内存失败"
            })
        } else if ("eos_transaction" == obj.method) try {
            ecc.isValidPrivate(obj.pk) || respErr(obj, {
                code: 500,
                msg: "私钥格式错误"
            });
            var eoss = Eos({
                keyProvider: [obj.pk],
                httpEndpoint: obj.eosServer,
                chainId: obj.chainId
            });
            eoss.transaction({
                actions: obj.actions
            },
            {
                broadcast: true
            }).then(function(t) {
                respSucc(obj, t)
            }).catch(function(t) {
                respErr(obj, parseError(t))
            })
        } catch(t) {
            respErr(obj, {
                code: 500,
                msg: "交易失败"
            })
        }
    })
};
