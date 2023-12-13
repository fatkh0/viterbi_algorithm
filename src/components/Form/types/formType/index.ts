import { z } from "zod";
import { schema } from "../../utility";

export type FormType = z.infer<typeof schema>;
