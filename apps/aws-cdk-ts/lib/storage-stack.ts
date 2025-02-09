import * as cdk from 'aws-cdk-lib';
import { Bucket, BucketEncryption, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class StorageStack extends cdk.Stack {
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Crea un bucket de S3 con configuraciones comunes
    this.bucket = new Bucket(this, '1278-drc-bucket', {
      versioned: true, // Habilita el versionado para el bucket
      encryption: BucketEncryption.S3_MANAGED, // Cifrado automático con claves gestionadas por S3
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL, // Bloquea todo el acceso público al bucket
      enforceSSL: true, // Fuerza el uso de HTTPS para todas las solicitudes
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Elimina el bucket al destruir el stack
    });
    
    // (Opcional) Exporta el nombre del bucket como un output de CloudFormation
    new cdk.CfnOutput(this, '1278-drc-bucket', {
      value: this.bucket.bucketName,
      description: 'El nombre del bucket de S3',
    });
  }
}