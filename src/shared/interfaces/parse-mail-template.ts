import { ITemplateVariables } from './template-variables';

export interface IParseMailTemplate {
  templateFile: string;
  variables: ITemplateVariables;
}
