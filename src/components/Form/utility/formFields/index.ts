export const FORM_FIELDS = {
  message: "message",
  polynom: "polynom",
  coddedMessage: "coddedMessage",
  errors: "errors",
  received: "received",
  decodedMessage: "decodedMessage",
} as const;

export const INPUT_FORM_FIELDS = [
  {
    name: FORM_FIELDS.message,
    label: "Zpráva",
  },
  {
    name: FORM_FIELDS.polynom,
    label: "Generující polynom",
  },
] as const;

export const READONLY_FORM_FIELDS = [
  {
    name: FORM_FIELDS.coddedMessage,
    label: "Kódovaná zpráva",
    isReadOnly: true
  },
  {
    name: FORM_FIELDS.errors,
    label: "Chyby v přenosu",
    isReadOnly: false
  },
  {
    name: FORM_FIELDS.received,
    label: "Přijatá zpráva",
    isReadOnly: true
  },
  {
    name: FORM_FIELDS.decodedMessage,
    label: "Dekódovaná zpráva",
    isReadOnly: true
  },
] as const;
