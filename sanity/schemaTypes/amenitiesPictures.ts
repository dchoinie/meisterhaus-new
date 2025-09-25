import { type SchemaTypeDefinition } from 'sanity'

const amenitiesPictures: SchemaTypeDefinition = {
  name: 'amenitiesPictures',
  title: 'Amenities Pictures',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for this set of amenities pictures',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
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
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'images',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      const imageCount = subtitle ? subtitle.length : 0
      return {
        title: title || 'Amenities Pictures',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`,
      }
    },
  },
}

export default amenitiesPictures
