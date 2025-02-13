import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'
 
export async function getPosts() {
  const { directories } = normalizePages({
    list: await getPageMap(),
    route: '/content'
  });

  return directories
    .flatMap(post => post.children ? post.children : post)
    .filter(post => post.name !== 'index' && post.name !== 'posts')
    .sort((a, b) => b.frontMatter.date.localeCompare(a.frontMatter.date)) 
}
 
export async function getTags() {
  const flatPosts = await getPosts();
  const tags = flatPosts.flatMap(post => post.frontMatter.tags)
  return tags
}