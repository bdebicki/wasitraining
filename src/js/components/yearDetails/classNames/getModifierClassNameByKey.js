import { lineupClassBuilder } from '../elementHandlers/lineup';

function prepareClassName(modifierName) {
  return `${lineupClassBuilder.artist}--${modifierName}`;
}

export default function(decorator) {
  if (!decorator) {
    return null;
  }

  if (Array.isArray(decorator)) {
    return decorator.map((decoratorType) => prepareClassName(decoratorType));
  }

  return prepareClassName(decorator);
}
