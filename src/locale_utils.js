const rtlLocales = [
    'ae',	/* Avestan */
    'ar',   /* 'العربية', Arabic */
    'arc',  /* Aramaic */
    'bcc',  /* 'بلوچی مکرانی', Southern Balochi */
    'bqi',  /* 'بختياري', Bakthiari */
    'ckb',  /* 'Soranî / کوردی', Sorani */
    'dv',   /* Dhivehi */
    'fa',   /* 'فارسی', Persian */
    'glk',  /* 'گیلکی', Gilaki */
    'he',   /* 'עברית', Hebrew */
    'ku',   /* 'Kurdî / كوردی', Kurdish */
    'mzn',  /* 'مازِرونی', Mazanderani */
    'nqo',  /* N'Ko */
    'pnb',  /* 'پنجابی', Western Punjabi */
    'ps',   /* 'پښتو', Pashto, */
    'sd',   /* 'سنڌي', Sindhi */
    'ug',   /* 'Uyghurche / ئۇيغۇرچە', Uyghur */
    'ur',   /* 'اردو', Urdu */
    'yi'    /* 'ייִדיש', Yiddish */
];

export function isLocaleRtl(locale) {
    return rtlLocales.indexOf(locale.split('-')[0]) !== -1;
}
