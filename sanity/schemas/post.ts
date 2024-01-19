import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title of blog post',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog post',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'A concise description for SEO purposes (max 160 characters).',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'text',
              title: 'Alternative Text',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
  ],
})
