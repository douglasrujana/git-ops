import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear un bucket S3 con etiquetas
    new s3.Bucket(this, 'MyBucket', {
      bucketName: 'labx-s3-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Para pruebas, no para producción
      tags: {
        'Origin': 'CDK-Stack',
        'Environment': 'Dev',
        'Service': 'S3',
        'Project': 'LabX'
      }
    });
  }
}