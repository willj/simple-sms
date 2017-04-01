# Simple-SMS

A wrapper around Amazon SNS to send simple transactional SMS messages.

## Installation

`npm install simple-sms`

## Usage

The simplest way is to set three environment variables: 

- `process.env.AwsAccessKeyId` - your AWS access key created in IAM, with SNS priveleges
- `process.env.AwsSecretAccessKey` - your AWS secret key
- `process.env.AwsRegion` - your AWS region

To send a message call the `send()` function, which returns a promise.

```
const sms = require("simple-sms");

sms.send({
    message: "Hello World!",
    phoneNumber: "+447xxxxxxxxx",
    senderId: "WillJ"
}).then((result) => {
    console.log("Sent!");
    console.log(result);
}).catch((err) => {
    console.log(err);
});

```

If you can't or don't want to use those env var names, you can pass the information to the `init()` function before calling send.

```
const sms = require("simple-sms");

sms.init({
    accessKeyId: yourKey,
    secretAccesskey: yourSecret,
    awsRegion: "eu-west-1"
});

sms.send({
    message: "Hello World!",
    phoneNumber: "+447xxxxxxxxx",
    senderId: "WillJ"
}).then((result) => {
    console.log("Sent!");
    console.log(result);
}).catch((err) => {
    console.log(err);
});

```

## Notes

You can read more about SNS here https://aws.amazon.com/documentation/sns/

Ensure you set a region that supports SNS http://docs.aws.amazon.com/sns/latest/dg/sms_supported-countries.html
