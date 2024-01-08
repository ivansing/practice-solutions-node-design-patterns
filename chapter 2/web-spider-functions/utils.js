import path from 'path'
import {URL} from 'url'
import slug from 'slug'
import cheerio from 'cheerio'

function getLinkUrl (currentUrl, element) {
  const parseLink = new URL(element.attribs.href || '', currentUrl)
  const currentParsedUrl = new URL(currentUrl)
  if(parseLink.hostname !== currentParsedUrl.hostname || 
    !parseLink.pathname) {
      return null;
    }
    return parseLink.toString()
}

export function urlToFileName (url) {
    const parseUrl = new URL(url)
    const urlPath = parseUrl.pathname.split('/')
      .filter(function (component) {
        return component !== ''
      })
      .map(function (component) {
        return slug(component, {remove: null})
      })
      .join('/')
    let filename = path.join(parseUrl.hostname, urlPath)
    if(!path.extname(filename).match('/htm/')) {
        filename += '.html'
    }
    
    return filename
}

export function getPageLinks(currentUrl, body) {
  return Array.from(cheerio.load(body)('a'))
    .map(function (element) {
      return getLinkUrl(currentUrl, element)
    })
    .filter(Boolean)
}