import { z } from "zod"
import { FORM_FIELDS } from '../formFields'

const BINARY_REGEX = /^[01]+$/
const POLYNOM_REGEX = /^(?:[01]+;)+[01]+;$/

export const schema = z.object({
  [FORM_FIELDS.message]: z.string().refine((value) => BINARY_REGEX.test(value)),
  [FORM_FIELDS.polynom]: z.string().refine((value) => POLYNOM_REGEX.test(value)),
  [FORM_FIELDS.coddedMessage]: z.string().optional(),
  [FORM_FIELDS.errors]: z.string().optional(),
  [FORM_FIELDS.received]: z.string().optional(),
  [FORM_FIELDS.decodedMessage]: z.string().optional(),
})

