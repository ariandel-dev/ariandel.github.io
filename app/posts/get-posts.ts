import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'

function flatten(directories: ReturnType<typeof normalizePages>['directories']) {
  return directories
    .flatMap(post => post.children ? post.children : post);
}
 
export async function getPosts() {
  const { flatDocsDirectories } = normalizePages({
    list: await getPageMap(),
    route: ''
  }) as {
    flatDocsDirectories: ReturnType<typeof normalizePages>['directories']
  };

  return flatDocsDirectories
    .filter(post => post.name !== 'index' && post.name !== 'posts')
    .sort((a, b) => b.frontMatter.date.localeCompare(a.frontMatter.date))
}
 
export async function getTags() {
  const flatPosts = await getPosts();
  const tags = flatPosts.flatMap(post => post.frontMatter.tags)
  return tags
}