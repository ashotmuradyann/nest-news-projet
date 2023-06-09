import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const UUIDScalar = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID custom scalar type',
  parseValue(value: string): string {
    return value; // value from the client input variables
  },
  serialize(value: string): string {
    return value; // value sent to the client
  },
  parseLiteral(ast): string {
    if (ast.kind === Kind.STRING) {
      return ast.value; // value from the client query
    }
    return null;
  },
});
