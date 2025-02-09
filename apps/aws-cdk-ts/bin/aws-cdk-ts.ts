#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StorageStack } from '../lib/storage-stack';

// Crear la aplicacion CDK
const app = new cdk.App();

// Define el entorno (cuenta y región)
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,  // Usa la cuenta de AWS configurada
  region: process.env.CDK_DEFAULT_REGION,    // Usa la región de AWS configurada
};

// Intancear el stack de almacenamiento S3
new StorageStack(app, 'StorageStack', { env });  

