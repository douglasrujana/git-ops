#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StorageStack } from '../lib/storage-stack';
import { execSync } from 'child_process';

// Crear la aplicación CDK
const app = new cdk.App();

// Define el entorno (cuenta y región)
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,  // Usa la cuenta de AWS configurada
  region: process.env.CDK_DEFAULT_REGION,    // Usa la región de AWS configurada
};

// Función para verificar las credenciales de AWS
function verifyAwsCredentials() {
  try {
    // Ejecuta el comando de AWS CLI para obtener la identidad del usuario
    const result = execSync('aws sts get-caller-identity --query "Account" --output text').toString().trim();
    console.log(`✅ Credenciales de AWS verificadas correctamente. Cuenta: ${result}`);
  } catch (error) {
    console.error('❌ Error al verificar las credenciales de AWS:', error.message);
    process.exit(1);  // Termina el proceso con un código de error
  }
}

// Verificar las credenciales antes de continuar
console.log('🔍 Verificando credenciales de AWS...');
verifyAwsCredentials();

// Instanciar el stack de almacenamiento S3
console.log('🚀 Creando el stack de almacenamiento S3...');
new StorageStack(app, 'StorageStack', { env });

// Mensaje final
console.log('🎉 ¡Configuración completada! Ejecuta "cdk deploy" para desplegar la infraestructura.');