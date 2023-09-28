type TLangObjs = Record<TLang, TLngDef>;
type TOptionalLangObjs = Partial<Record<TLang, TLngDef>>;

type TMergedLngDefObj = Record<string, string>;
type TMergedLngDef = Record<string, string | TMergedLngDefObj | TMergedLngDef>;
