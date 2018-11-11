import { iconClassBuilder } from '../utils/elementHandlers/icons';

const linkClassBuilder = 'link';
const LINK = {
  BASIC_CLASS: linkClassBuilder,
  INVERTED_STYLE_CLASS: `${linkClassBuilder}--inverted`,
  SIZE_XS_CLASS: `${linkClassBuilder}--sizeXS`,
  SIZE_S_CLASS: `${linkClassBuilder}--sizeS`,
  HAS_ICON_CLASS: `${linkClassBuilder}--hasIcon`,
  ICON_CLASS: `${linkClassBuilder}__${iconClassBuilder}`,
};

export { LINK as default };
