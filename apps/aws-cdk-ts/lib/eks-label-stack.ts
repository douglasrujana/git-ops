import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class EKSandECSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // EKS Cluster
    const cluster = new eks.Cluster(this, 'EKSCluster', {
      version: eks.KubernetesVersion.V1_21,
      defaultCapacity: 2, // Número de nodos
      tags: {
        'Origin': 'CDK-Stack',
        'Environment': 'Dev',
        'Service': 'EKS',
        'Project': 'LabX'
      }
    });

    // ECS Cluster
    const ecsCluster = new ecs.Cluster(this, 'ECSCluster', {
      vpc: cluster.vpc,
      tags: {
        'Origin': 'CDK-Stack',
        'Environment': 'Dev',
        'Service': 'ECS',
        'Project': 'LabX'
      }
    });

    // Aquí podrías añadir más recursos específicos de ECS o EKS
  }
}