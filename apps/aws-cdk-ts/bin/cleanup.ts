#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CleanupStack } from '../lib/cleanup-stack';

const app = new cdk.App();

// Define el stack de limpieza
new CleanupStack(app, 'CleanupStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  // Esto destruira todos los stck
  // npx cdk destroy --all
  // npx cdk destroy CleanupStack # manualmente 
});