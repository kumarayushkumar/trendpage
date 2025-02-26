import { HTTP_STATUS_CODE, WORDPRESS_ROUTE } from '../utils/constants'
import type { Blog, FeatureMedia } from '../utils/types'

const WP_API_BASE = `${import.meta.env.PUBLIC_WP_REST_API}${WORDPRESS_ROUTE}`

export async function getBlogs(page = 1): Promise<{
  data?: {
    blogs: Blog[]
    pages: string
  }
  error?: string
}> {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?per_page=10&page=${page}&_fields=id,title,date_gmt,excerpt,featured_media`
    )
    if (!response.ok) {
      if (response.status === HTTP_STATUS_CODE.NOT_FOUND) {
        return {
          error: 'Blogs not found.'
        }
      } else if (response.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        return {
          error:
            'Something went wrong while fetching Blogs. Please try again later.'
        }
      } else if (response.status === HTTP_STATUS_CODE.BAD_REQUEST) {
        return {
          error: 'Something went wrong.'
        }
      } else {
        return {
          error:
            'Something went wrong while fetching Blogs. Please try again later.'
        }
      }
    }

    const data = await response.json()

    const dataWithImage = await Promise.all(
      data.map(async (blog: Blog) => {
        const featuredMedia = await getFeaturedImageById(
          blog.featured_media as number
        )
        if (featuredMedia.data) {
          blog.featured_media_data = featuredMedia.data
        }
        return blog
      })
    )
    return {
      data: {
        blogs: dataWithImage,
        pages: response.headers.get('X-WP-TotalPages') as string
      }
    }
  } catch (e) {
    return {
      error: 'Unable to connect to the server.'
    }
  }
}

export async function getFeaturedImageById(id: number): Promise<{
  data?: FeatureMedia
  error?: string
}> {
  try {
    const response = await fetch(
      `${WP_API_BASE}/media/${id}?_fields=id,media_details`
    )

    if (!response.ok) {
      if (response.status === HTTP_STATUS_CODE.NOT_FOUND) {
        return {
          error: 'Featured image not found. Please check the URL and try again'
        }
      } else if (response.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        return {
          error:
            'Something went wrong while fetching the featured image. Please try again later.'
        }
      } else if (response.status === HTTP_STATUS_CODE.BAD_REQUEST) {
        return {
          error:
            'Invalid featured image ID. Please check the URL and try again.'
        }
      } else {
        return {
          error:
            'Something went wrong while fetching the featured image. Please try again later.'
        }
      }
    }

    const data = await response.json()
    return { data }
  } catch (e) {
    return {
      error: 'Unable to connect to the server.'
    }
  }
}

export async function getBlogById(id: string): Promise<{
  data?: Blog
  error?: string
}> {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts/${id}?_fields=id,title,date_gmt,content,excerpt,author,featured_media,_embedded&_embed=author`
    )

    if (!response.ok) {
      if (response.status === HTTP_STATUS_CODE.NOT_FOUND) {
        return {
          error: 'Blog not found.'
        }
      } else if (response.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        return {
          error:
            'Something went wrong while fetching the Blog. Please try again later.'
        }
      } else if (response.status === HTTP_STATUS_CODE.BAD_REQUEST) {
        return {
          error: 'Invalid Blog ID. Please check the URL and try again.'
        }
      } else {
        return {
          error:
            'Something went wrong while fetching the Blog. Please try again later.'
        }
      }
    }

    const data = await response.json()
    const featuredMedia = await getFeaturedImageById(
      data.featured_media as number
    )
    if (featuredMedia.data) {
      data.featured_media_data = featuredMedia.data
    }

    return { data }
  } catch (e) {
    return {
      error: 'Unable to connect to the server.'
    }
  }
}
