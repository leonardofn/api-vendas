import { IParseMailTemplate } from '@shared/interfaces/parse-mail-template';
import fs from 'fs';
import handlebars from 'handlebars';

export class HandlebarsMailTemplate {
  public async parse({
    templateFile,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templeteFileContent = await fs.promises.readFile(templateFile, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templeteFileContent);

    return parseTemplate(variables);
  }
}
