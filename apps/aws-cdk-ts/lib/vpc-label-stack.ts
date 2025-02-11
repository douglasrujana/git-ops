import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VPCStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear una VPC con etiquetas
    new ec2.Vpc(this, 'VPC', {
      maxAzs: 3,
      tags: {
        'Origin': 'CDK-Stack',
        'Environment': 'Dev',
        'Service': 'VPC',
        'Project': 'LabX'
      }
    });
  }
}