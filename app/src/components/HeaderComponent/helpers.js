import { format, addYears, subYears, isBefore, addMonths } from "date-fns";

function getCurrentPeriod() {
  const current = new Date();
  return format(current, "yyyy-MM");
}

function getRangeOfPeriods() {
  const currentDate = new Date();

  let maxRange = addYears(currentDate, 1);
  maxRange = new Date(maxRange.getFullYear(), 11, 31);
  let minRange = subYears(currentDate, 1);
  minRange = new Date(minRange.getFullYear(), 0, 1);

  const rangeOfPeriods = [];
  let aux_period = minRange;
  while (isBefore(aux_period, maxRange)) {
    rangeOfPeriods.push(format(aux_period, "yyyy-MM"));
    aux_period = addMonths(aux_period, 1);
  }
  return rangeOfPeriods;
}

function getPeriods(rangeOfPeriods) {
  const options = [];
  if (rangeOfPeriods) {
    rangeOfPeriods.forEach((period) => {
      options.push({ label: period, value: period });
    });
  }
  return options;
}

export {getCurrentPeriod, getRangeOfPeriods, getPeriods}