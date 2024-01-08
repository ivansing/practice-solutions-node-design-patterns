import path from 'path'
import {URL} from 'url'
import slug from 'slug'

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