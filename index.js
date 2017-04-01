"use strict";

const sns = require("aws-sdk/clients/sns");

module.exports = {
    snsClient: null,

    init: function(accessKeyId, secretAccesskey, awsRegion){
        let key = accessKeyId || process.env.AwsAccessKeyId;
        let secret = secretAccesskey || process.env.AwsSecretAccessKey;
        let region = awsRegion || process.env.AwsRegion;

        if (!key || !secret){
            throw new Error("Your AWS credentials are not set. Pass these in to init(key, secret, region) or set process.env.AwsAccessKeyId and process.env.AwsSecretAccessKey");
        }

        if (!region){
            throw new Error("You must set an AWS region. Either pass to init(key, secret, region) or set process.env.AwsRegion");
        }

        this.snsClient = new sns({
            apiVersion: "2010-03-31", 
            region: region,
            credentials: {accessKeyId: key, secretAccessKey: secret}
        });
    },

    send: function ({ message, phoneNumber, senderId = "" }){
        return new Promise((resolve, reject) => {
            if (!this.snsClient) this.init();

            let messageParams =  {
                Message: message,
                PhoneNumber: phoneNumber,
                MessageAttributes: {
                    "AWS.SNS.SMS.SMSType": {
                        DataType: "String",
                        StringValue: "Transactional"
                    }
                }
            };

            if (senderId){
                messageParams.MessageAttributes["AWS.SNS.SMS.SenderID"] = {
                    DataType: "String",
                    StringValue: senderId
                }
            }

            this.snsClient.publish(messageParams, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                } 
            });
        });
    }
};
