import * as cdk from 'aws-cdk-lib';

// Clase base para aplicar etiquetas consistentes
export class TagManager {
  public static createTags(environment: string, project: string, service?: string): cdk.CfnTag[] {
    const tags: cdk.CfnTag[] = [
      { key: 'Origin', value: 'CDK-Stack' },
      { key: 'Environment', value: environment },
      { key: 'Project', value: project },
    ];

    if (service) {
      tags.push({ key: 'Service', value: service });
    }

    return tags;
  }
}