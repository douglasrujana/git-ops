import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { TagManager } from './TagManager'; // Asegúrate de que la ruta al archivo sea correcta

export class DynamoDBStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Aplicar etiquetas comunes
    const commonTags = TagManager.createTags('Dev', 'LabX', 'DynamoDB');

    // Crear una tabla de DynamoDB con etiquetas
    const table = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para pruebas, no para producción
      tableName: 'labx-dynamodb-table',
    });

    // Añadir etiquetas a la tabla de DynamoDB
    cdk.Tags.of(table).addMultiple(commonTags);

    // Aquí puedes ver cómo funcionan las etiquetas
    console.log('Tags aplicadas a la tabla:', cdk.Tags.of(table).renderTags());
  }
}