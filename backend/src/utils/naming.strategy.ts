import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  // Personaliza el nombre de la tabla
  tableName(targetName: string, userSpecifiedName: string): string {
    return `\`${userSpecifiedName || targetName}\``;
  }

  // Personaliza el nombre de las columnas
  columnName(propertyName: string, customName: string): string {
    return `\`${customName || propertyName}\``;
  }

  // Personaliza los nombres de las relaciones (FOREIGN KEYS)
  foreignKeyName(tableName: string, columnNames: string[]): string {
    return `\`FK_${tableName}_${columnNames.join('_')}\``;
  }

}
