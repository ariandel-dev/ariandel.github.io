import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'
 
export async function getPosts() {
  const { directories } = normalizePages({
    list: await getPageMap(),
    route: '/content'
  });
  return directories
    .filter(post => post.name !== 'index' && post.name !== 'posts')
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
}

export async function getFlatPosts() {
  const posts = await getPosts();
  const flatPosts = posts.flatMap(post => post.children ? post.children : post);
  return flatPosts;
}
 
export async function getTags() {
  const flatPosts = await getFlatPosts();
  const tags = flatPosts.flatMap(post => post.frontMatter.tags)
  return tags
}