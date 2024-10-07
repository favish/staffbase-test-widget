import { useEffect, useState } from 'react'

/**
 * Interface for the article data
 *
 * {string} title - The article title
 * {string} teaser - The article teaser
 * {string} content - The article content
 * {string} imageUrl - The article image URL
 * {string} channelName - The channel name
 * {string} publishedDateISO - The published date in ISO format
 * {string} publishedDateFormatted - The published date formatted
 */
interface ArticleData {
  title: string
  teaser: string
  content: string
  imageUrl: string
  channelName: string
  publicationStatus: string
}

/**
 * Hook to fetch and process article data
 *
 * @param {string} articleId - The article ID
 * @param {string} content_language - The content language
 * @param {boolean} isEditor - Flag to indicate if the component is in the editor
 */
export const useArticleData = (
  articleId: string,
  content_language: string,
  isEditor: boolean = false,
) => {
  // The article data fetched from the API
  const [articleData, setArticleData] = useState<ArticleData | null>(null)

  /**
   * Check if the language is overridden in the URL
   *
   * @returns {string} - The overridden or provided language
   */
  const checkOverrideLanguage = (): string => {
    // If the component is in the editor mode
    if (isEditor) return checkEditorLanguage()

    return checkPreviewLanguage()
  }

  /**
   * Tries to detect the active language tab in the editor
   *
   * @returns {string} - The detected language
   */
  const checkEditorLanguage = (): string => {
    const activeTab = document.querySelector('[aria-selected="true"]')
    if (activeTab) {
      const testId = activeTab.getAttribute('data-testid')
      const language = testId?.split('-').pop() || content_language
      return language
    }
    return content_language
  }

  /**
   * Check if the language is overridden in the URL (for preview mode)
   *
   * @returns {string} - The overridden or provided language
   */
  const checkPreviewLanguage = (): string => {
    // @ts-expect-error - window.App is defined in the global scope
    if (!window.App) return

    // Extract the 'language' parameter from the APP config
    // @ts-expect-error - window.App is defined in the global scope
    const urlParams = new URLSearchParams(window.App._urlParameters)

    const lang = urlParams.get('language')
    if (lang) {
      return lang
    }

    return content_language
  }

  /**
   * Fetch the article content when the article ID changes
   *
   * @param {string} articleId - The article ID
   */
  useEffect(() => {
    if (articleId) {
      fetchArticleContent(articleId)
    }
  }, [articleId])

  /**
   * Fetch the article content from the API
   *
   * @param {string} articleId - The article ID
   */
  const fetchArticleContent = async (articleId: string): Promise<void> => {
    if (articleId) {
      try {
        // Default options for the fetch request
        const options: RequestInit = {
          method: 'GET',
          credentials: 'include',
        }

        // Fetch the article content from the API
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
          options,
        )

        // Process the data received from the API
        const raw_data = await response.json()

        // Process the data
        processData(raw_data)
      } catch (error) {
        console.error('Error fetching article content:', error)
      }
    }
  }

  /**
   * Process the data received from the API
   *
   * @param {any} articleData - The data received from the API
   */
  const processData = (articleData: any) => {
    // Get the language from the URL or the provided language
    const language = checkOverrideLanguage()

    // Get the default language from the environment
    const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE as string

    // Check if articleData or its contents are undefined
    if (!articleData || !articleData.contents) {
      console.error(
        'Error fetching article content: Invalid articleData or missing contents',
        articleData,
      )
      return
    }

    // Get the content for the specified language
    let contentLanguageData = articleData.contents?.[language]

    // Fallback to default language if user language is not available
    if (!contentLanguageData) {
      console.warn(
        `Content for language ${language} not found. Falling back to default language ${defaultLanguage}.`,
      )
      contentLanguageData = articleData.contents?.[defaultLanguage]
    }

    // Check if content is available in any language
    if (!contentLanguageData) {
      console.error(
        `Content not available in language: ${language} or default language: ${defaultLanguage}`,
      )
      return
    }

    // Get the article title, teaser, content, image URL, channel name, and published date
    const title =
      contentLanguageData?.title ??
      articleData.contents[defaultLanguage]?.title ??
      ''

    const teaser =
      contentLanguageData?.teaser ??
      articleData.contents[defaultLanguage]?.teaser ??
      ''

    const content =
      contentLanguageData?.content ??
      articleData.contents[defaultLanguage]?.content ??
      ''

    const imageUrl =
      contentLanguageData.image?.original?.url ??
      articleData.contents[defaultLanguage]?.image?.original?.url ??
      ''

    // Determine the publication status based on the presence of the 'published' field
    const publicationStatus = articleData?.published
      ? 'Published'
      : 'Unpublished'

    const channelName =
      articleData.channel?.config?.localization?.[language]?.title ??
      articleData.channel?.config?.localization?.[defaultLanguage]?.title ??
      ''

    // Set the article data state
    setArticleData({
      title,
      teaser,
      content,
      imageUrl,
      channelName,
      publicationStatus,
    })
  }

  return articleData
}
