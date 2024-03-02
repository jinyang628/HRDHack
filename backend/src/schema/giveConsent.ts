import { z } from 'zod';

export const giveConsentSchema = z.object({
    username: z.string(),
});
  