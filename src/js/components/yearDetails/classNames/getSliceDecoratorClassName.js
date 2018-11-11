import { lineupClassBuilder } from '../elementHandlers/lineup';

export default function(slice) {
  if (!slice) {
    return null;
  }

  return `${lineupClassBuilder.slice}--${slice}`;
}
