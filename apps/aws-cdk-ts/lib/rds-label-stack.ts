import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';

export class RDSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear una instancia de base de datos RDS
    new rds.DatabaseInstance(this, 'Database', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_13_4 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc: new ec2.Vpc(this, 'RDSVPC'), // Aquí deberías usar un VPC existente si es necesario
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tags: {
        'Origin': 'CDK-Stack',
        'Environment': 'Dev',
        'Service': 'RDS',
        'Project': 'LabX'
      }
    });
  }
}