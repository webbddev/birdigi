import {defineField, defineType, Rule, StringRule} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required().error('Required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'authorImage',
      title: "Author's Image",
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // ? decide whether need Description or Bio
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'string',
    // }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'authorImage',
    },
  },
})
