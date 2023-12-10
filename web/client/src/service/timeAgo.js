import i18n from "../constants/language";

export function timeAgo(time) {

	switch (typeof time) {
		case 'number':
			break;
		case 'string':
			time = +new Date(time);
			break;
		case 'object':
			if (time.constructor === Date) time = time.getTime();
			break;
		default:
			time = +new Date();
	}
	let time_formats = [
		[60, 'seconds', 1],
		[120, i18n.t('minutesAgo', {count: 1}), i18n.t('minuteFromNow', {count: 1})],
		[3600, 'minutes', 60],
		[7200, i18n.t('hoursAgo', {count: 1}), i18n.t('hourFromNow', {count: 1})],
		[86400, 'hours', 3600],
		[172800, i18n.t('yesterday'), i18n.t('tomorrow')],
		[604800, 'days', 86400],
		[1209600, i18n.t('lastWeek'), i18n.t('nextWeek')],
		[2419200, 'weeks', 604800],
		[4838400, i18n.t('lastMonth'), i18n.t('nextMonth')],
		[29030400, 'months', 2419200],
		[58060800, i18n.t('lastYear'), i18n.t('nextYear')],
		[2903040000, 'years', 29030400]
	];
	let seconds = (+new Date() - time) / 1000;

	if (seconds === 0) return i18n.t('justNow')

	if (seconds < 0) return i18n.t('future')

	let i = 0,
		format;
	while ((format = time_formats[i++]))
		if (seconds < format[0]) {
			if (typeof format[2] == 'string')
				return format[1];
			else
			{
				switch (format[1]) {
					case 'seconds':
						return i18n.t('secondsAgo', {count: Math.floor(seconds / format[2])});
					case 'minutes':
						return i18n.t('minutesAgo', {count: Math.floor(seconds / format[2])});
					case 'hours':
						return i18n.t('hoursAgo', {count: Math.floor(seconds / format[2])});
					case 'days':
						return i18n.t('daysAgo', {count: Math.floor(seconds / format[2])});
					case 'weeks':
						return i18n.t('weeksAgo', {count: Math.floor(seconds / format[2])});
					case 'months':
						return i18n.t('monthsAgo', {count: Math.floor(seconds / format[2])});
					case 'years':
						return i18n.t('yearsAgo', {count: Math.floor(seconds / format[2])});
				}
			}
		}

	return time;
}
