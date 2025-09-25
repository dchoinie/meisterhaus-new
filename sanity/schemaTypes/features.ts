import { type SchemaTypeDefinition } from 'sanity'

const features: SchemaTypeDefinition = {
  name: 'features',
  title: 'Features',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for the features section (e.g., "Property Features")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuresList',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            {
              name: 'text',
              title: 'Feature Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description (Optional)',
              type: 'text',
              description: 'Optional longer description for the feature',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'featuresList',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      const featureCount = subtitle ? subtitle.length : 0
      return {
        title: title || 'Features',
        subtitle: `${featureCount} feature${featureCount !== 1 ? 's' : ''}`,
      }
    },
  },
}

export default features
