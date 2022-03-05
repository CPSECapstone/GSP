import { MinorityGroups, BusinessType } from "./src/models";

export function returnMinorityGroupValue(key: MinorityGroups) {
  let value;
  switch (key) {
    case MinorityGroups.AFRICANAMERICAN:
      value = "African American";
      break;
    case MinorityGroups.ASIANAMERICAN:
      value = "Asian American";
      break;
    case MinorityGroups.LATINX:
      value = "LatinX";
      break;
    case MinorityGroups.MIDDLEEASTERN:
      value = "Middle Eastern";
      break;
    case MinorityGroups.NATIVEAMERICAN:
      value = "Native American";
      break;
    case MinorityGroups.PACIFICISLANDER:
      value = "Pacific Islander";
      break;
    case MinorityGroups.ALASKANATIVE:
      value = "Alaska Native";
      break;
    case MinorityGroups.MUSLIM:
      value = "Muslim";
      break;
    case MinorityGroups.HALAL:
      value = "Halal";
      break;
    case MinorityGroups.JEWISH:
      value = "Jewish";
      break;
    case MinorityGroups.KOSHER:
      value = "Kosher";
      break;
    case MinorityGroups.HINDU:
      value = "Hindu";
      break;
    case MinorityGroups.SIKH:
      value = "Sikh";
      break;

    default:
      value = "ERROR";
      break;
  }
  return value;
}

export function returnBusinessTypeValue(key: BusinessType) {
  let value;
  switch (key) {
    case BusinessType.RESTAURANT:
      value = "Restaurant";
      break;
    case BusinessType.BEAUTY:
      value = "Beauty";
      break;
    case BusinessType.MARKET:
      value = "Markets";
      break;
    case BusinessType.SHOPPING:
      value = "Shopping";
      break;
    default:
      value = "ERROR";
      break;
  }
  return value;
}
