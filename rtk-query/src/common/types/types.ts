import { z } from 'zod'
import { tagSchema, userSchema, coverSchema, imagesSchema, currentUserReactionSchema } from '../schemas/schemas'

export type Tag = z.infer<typeof tagSchema>
export type User = z.infer<typeof userSchema>
export type Cover = z.infer<typeof coverSchema>
export type Images = z.infer<typeof imagesSchema>
export type CurrentUserReaction = z.infer<typeof currentUserReactionSchema>
