import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://aiok.site'

    const pages = [
        '',
        '/tests',
        '/adhd',
        '/scl90',
        '/about',
        '/privacy',
        '/terms',
        '/smart-productivity',
        '/creative-lab'
    ]

    return pages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'monthly',
        priority: page === '' ? 1 : 0.8,
    }))
}
