export interface Blog {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  author: string
  date_gmt: string
  featured_media: number

  featured_media_data?: FeatureMedia

  _embedded: {
    author: Author[]
  }
}

export interface MediaDetails {
  width: number
  height: number
  file: string
  filesize: number
  sizes: {
    medium: MediaSize
    large: MediaSize
    thumbnail: MediaSize
    medium_large: MediaSize
    '1536x1536': MediaSize
    '2048x2048': MediaSize
    full: MediaSize
  }
}

export interface Author {
  id: number
  name: string
  url: string
  description: string
  link: string
  slug: string
  avatar_urls: AvatarUrls
  _links: AuthorLinks
}

export interface AvatarUrls {
  '24': string
  '48': string
  '96': string
}

export interface AuthorLinks {
  self: [
    {
      href: string
      targetHints?: {
        allow: string[]
      }
    }
  ]
  collection: [
    {
      href: string
    }
  ]
}

export interface MediaSize {
  file: string
  width: number
  height: number
  filesize: number
  mime_type: string
  source_url: string
}

// Update FeatureMedia interface to use MediaDetails
export interface FeatureMedia {
  id: number
  media_details: MediaDetails
}

export interface WebsiteReport {
  url: string
  report: any
  summary: string
}
