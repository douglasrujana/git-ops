import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StorageStack } from './storage-stack';
//import { ComputeStack } from './compute-stack';
//import { NetworkStack } from './network-stack';

// Importa otros stacks aquí

export class CleanupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crea instancias de todos los stacks que deseas gestionar
    new StorageStack(this, 'StorageStack');
    //new ComputeStack(this, 'ComputeStack');
    //new NetworkStack(this, 'NetworkStack');
    // Añade otros stacks aquí
  }
}