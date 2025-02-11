import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();
const account = app.node.tryGetContext('aws:cdk:stack:default-account');
const region = app.node.tryGetContext('aws:cdk:stack:default-region');

if (!account || !region) {
  throw new Error('No se ha especificado la cuenta o la región para este entorno.');
}

const stack = new cdk.Stack(app, 'MyStack', {
  env: {
    account: account,
    region: region
  }
});

// Aquí definirías tus recursos