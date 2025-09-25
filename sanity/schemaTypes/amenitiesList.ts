import { type SchemaTypeDefinition } from 'sanity'

const amenitiesList: SchemaTypeDefinition = {
  name: 'amenitiesList',
  title: 'Amenities List',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for this amenities list',
    },
    {
      name: 'items',
      title: 'Amenities Items',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'items',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      const itemCount = subtitle ? subtitle.length : 0
      return {
        title: title || 'Amenities List',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
      }
    },
  },
}

export default amenitiesList
