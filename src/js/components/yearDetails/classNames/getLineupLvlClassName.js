import { lineupClassBuilder } from '../elementHandlers/lineup';

export default function(lvl) {
  return `${lineupClassBuilder.lvl}--${lvl}`;
}
