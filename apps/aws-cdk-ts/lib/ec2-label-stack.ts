import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class EC2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear una instancia EC2 con etiquetas
    const vpc = new ec2.Vpc(this, 'VPC');

    new ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      tags: {
        'Origin': 'CDK-Stack',
        'Environment': 'Dev',
        'Service': 'EC2',
        'Project': 'LabX'
      }
    });
  }
}