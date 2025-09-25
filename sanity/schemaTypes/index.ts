import { type SchemaTypeDefinition } from 'sanity'
import features from './features'

const room: SchemaTypeDefinition = {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Room Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'weekdayPrice',
      title: 'Weekday Price',
      type: 'string',
      description: 'Price for weekdays (e.g., "$150/night")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'weekendPrice',
      title: 'Weekend/Holiday Price',
      type: 'string',
      description: 'Price for weekends and holidays (e.g., "$200/night")',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
      subtitle: 'weekdayPrice',
    },
  },
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [room, features],
}
