import { locale, fallback, set, t } from 'frenchkiss'

import en from './en'
import fr from './fr'

set('fr', fr)
set('en', en)

export const setLocale = (loc) => {
  locale(loc)
}

fallback('en')

export { t }
