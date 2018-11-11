import globalClassBuilders from '../../../elementHandlers/globalClassBuilders';

const rainClassBuilders = {
  section: 'rainSection',
  info: 'rainInfo',
  header: 'rainHeader',
  details: 'rainDetails',
  detailsList: 'rainDetailsList',
};
const RAIN = {
  SECTION_ID: rainClassBuilders.section,
  INFO_CLASS: rainClassBuilders.info,
  INFO_YES_CLASS: `${rainClassBuilders.info}--yes`,
  INFO_NO_CLASS: `${rainClassBuilders.info}--no`,
  MASK_CLASS: `${rainClassBuilders.info}__mask`,
  YES_SHAPE_CLASS: `${rainClassBuilders.info}__maskShape--yes`,
  NO_SHAPE_CLASS: `${rainClassBuilders.info}__maskShape--no`,
  VIDEO_CLASS: `${rainClassBuilders.info}__video`,
  YES_VIDEO_CLASS: `${rainClassBuilders.info}__video--yes`,
  NO_VIDEO_CLASS: `${rainClassBuilders.info}__video--no`,
  HEADER_CLASS: rainClassBuilders.header,
  HEADER_HIDDEN_CLASS: `${rainClassBuilders.header}--${globalClassBuilders.hidden}`,
  HEADLINE_CLASS: `${rainClassBuilders.header}__headline`,
  DETAILS_LINK_CLASS: `${rainClassBuilders.details}__link`,
  CLOSE_DETAILS_CLASS: `${rainClassBuilders.details}__close`,
  DETAILS_ID: rainClassBuilders.details,
  DETAILS_CLASS: rainClassBuilders.details,
  DETAILS_LIST_CLASS: rainClassBuilders.detailsList,
  DETAILS_ITEM_CLASS: `${rainClassBuilders.detailsList}__item`,
  DETAILS_ITEM_DAY_CLASS: `${rainClassBuilders.detailsList}__day`,
  DETAILS_ITEM_RAIN_CLASS: `${rainClassBuilders.detailsList}__rain`,
};

export { RAIN as default };
