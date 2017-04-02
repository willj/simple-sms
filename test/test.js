const assert = require("assert");

describe("simple-sms", function(){

    it ("Should get auth and region strings from environment variables", function(){
        let sms = require("../index");

        process.env.AwsAccessKeyId = "dummy-key";
        process.env.AwsSecretAccessKey = "dummy-secret";
        process.env.AwsRegion = "dummy-region";

        sms.init();

        // Delete these keys
        delete process.env.AwsAccessKeyId;
        delete process.env.AwsSecretAccessKey;
        delete process.env.AwsRegion;

        let key = sms.snsClient.config.credentials.accessKeyId;
        let secret = sms.snsClient.config.credentials.secretAccessKey;
        let region = sms.snsClient.config.region;

        assert.equal(key, "dummy-key");
        assert.equal(secret, "dummy-secret");
        assert.equal(region, "dummy-region");

    });

    it ("Should use auth and region strings explicitly passed to init", function(){
        let sms = require("../index");

        // Delete these keys as a precaution
        delete process.env.AwsAccessKeyId;
        delete process.env.AwsSecretAccessKey;
        delete process.env.AwsRegion;

        let expectedKey = "dummy-key-var";
        let expectedSecret = "dummy-secret-var";
        let expectedRegion = "dummy-region-var";

        sms.init({
            accessKeyId: expectedKey,
            secretAccesskey: expectedSecret,
            awsRegion: expectedRegion
        });

        let key = sms.snsClient.config.credentials.accessKeyId;
        let secret = sms.snsClient.config.credentials.secretAccessKey;
        let region = sms.snsClient.config.region;

        assert.equal(key, expectedKey);
        assert.equal(secret, expectedSecret);
        assert.equal(region, expectedRegion);

    });

});